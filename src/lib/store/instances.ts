import { create } from 'zustand';
import { api } from '../api/endpoints';
import type { Instance } from '../api/endpoints';

interface InstancesState {
  instances: Instance[];
  isLoading: boolean;
  error: string | null;
  fetchInstances: () => Promise<void>;
  createInstance: (data: Partial<Instance>) => Promise<void>;
  updateInstance: (id: number, data: Partial<Instance>) => Promise<void>;
  deleteInstance: (id: number) => Promise<void>;
  startInstance: (id: number) => Promise<void>;
  stopInstance: (id: number) => Promise<void>;
}

export const useInstancesStore = create<InstancesState>((set) => ({
  instances: [],
  isLoading: false,
  error: null,

  fetchInstances: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.instances.list();
      set({ instances: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch instances',
        isLoading: false,
      });
    }
  },

  createInstance: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.instances.create(data);
      set((state) => ({
        instances: [...state.instances, response.data],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create instance',
        isLoading: false,
      });
    }
  },

  updateInstance: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.instances.update(id, data);
      set((state) => ({
        instances: state.instances.map((instance) =>
          instance.id === id ? response.data : instance
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update instance',
        isLoading: false,
      });
    }
  },

  deleteInstance: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.instances.delete(id);
      set((state) => ({
        instances: state.instances.filter((instance) => instance.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete instance',
        isLoading: false,
      });
    }
  },

  startInstance: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.instances.start(id);
      set((state) => ({
        instances: state.instances.map((instance) =>
          instance.id === id ? { ...instance, status: 'running' } : instance
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to start instance',
        isLoading: false,
      });
    }
  },

  stopInstance: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.instances.stop(id);
      set((state) => ({
        instances: state.instances.map((instance) =>
          instance.id === id ? { ...instance, status: 'stopped' } : instance
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to stop instance',
        isLoading: false,
      });
    }
  },
}));