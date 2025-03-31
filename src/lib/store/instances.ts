import { create } from 'zustand';
import { api } from '../api/endpoints';
import type { Instance } from '../api/endpoints';

interface InstancesState {
  instances: Instance[];
  isLoading: boolean;
  error: string | null;
  fetchInstances: () => Promise<void>;
  createInstance: (name: string, instanceType: string) => Promise<void>;
  startInstance: (id: number) => Promise<void>;
  stopInstance: (id: number) => Promise<void>;
  deleteInstance: (id: number) => Promise<void>;
}

export const useInstancesStore = create<InstancesState>((set) => ({
  instances: [],
  isLoading: false,
  error: null,

  fetchInstances: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.instances.list();
      set({ instances: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch instances',
        isLoading: false,
      });
    }
  },

  createInstance: async (name: string, instanceType: string) => {
    try {
      set({ isLoading: true, error: null });
      await api.instances.create({ name, instance_type: instanceType });
      const response = await api.instances.list();
      set({ instances: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create instance',
        isLoading: false,
      });
      throw error;
    }
  },

  startInstance: async (id: number) => {
    try {
      set({ isLoading: true, error: null });
      await api.instances.start(id);
      const response = await api.instances.list();
      set({ instances: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to start instance',
        isLoading: false,
      });
      throw error;
    }
  },

  stopInstance: async (id: number) => {
    try {
      set({ isLoading: true, error: null });
      await api.instances.stop(id);
      const response = await api.instances.list();
      set({ instances: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to stop instance',
        isLoading: false,
      });
      throw error;
    }
  },

  deleteInstance: async (id: number) => {
    try {
      set({ isLoading: true, error: null });
      await api.instances.delete(id);
      const response = await api.instances.list();
      set({ instances: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete instance',
        isLoading: false,
      });
      throw error;
    }
  },
}));