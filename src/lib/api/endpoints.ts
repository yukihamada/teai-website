import apiClient from './client';

// 型定義
export interface User {
  id: number;
  email: string;
  full_name: string;
  subscription_plan: string;
}

export interface Instance {
  id: number;
  name: string;
  status: string;
  instance_type: string;
}

export interface UsageCosts {
  ai_usage: number;
  instances: number;
  storage: number;
  total: number;
  margin_percentage: number;
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// API関数
export const api = {
  // 認証
  auth: {
    login: (email: string, password: string) =>
      apiClient.post('/auth/login', { email, password }),
    register: (email: string, password: string, full_name: string) =>
      apiClient.post('/auth/register', { email, password, full_name }),
    me: () => apiClient.get<User>('/auth/me'),
  },

  // インスタンス管理
  instances: {
    list: () => apiClient.get<Instance[]>('/instances'),
    create: (data: Partial<Instance>) =>
      apiClient.post<Instance>('/instances', data),
    get: (id: number) => apiClient.get<Instance>(`/instances/${id}`),
    update: (id: number, data: Partial<Instance>) =>
      apiClient.patch<Instance>(`/instances/${id}`, data),
    delete: (id: number) => apiClient.delete(`/instances/${id}`),
    start: (id: number) =>
      apiClient.post(`/instances/${id}/start`),
    stop: (id: number) =>
      apiClient.post(`/instances/${id}/stop`),
  },

  // AI
  ai: {
    completion: (messages: Message[]) =>
      apiClient.post('/ai/completion', { messages }),
  },

  // 課金
  billing: {
    getUsageCosts: () =>
      apiClient.get<UsageCosts>('/billing/usage-costs'),
    createCheckoutSession: (data: {
      planId: string;
      successUrl: string;
      cancelUrl: string;
    }) =>
      apiClient.post<{ sessionId: string }>('/billing/create-checkout-session', data),
    createSubscription: (planId: string, paymentMethodId: string) =>
      apiClient.post('/billing/subscribe', {
        plan_id: planId,
        payment_method_id: paymentMethodId,
      }),
    updateSubscription: (subscriptionId: string, planId: string) =>
      apiClient.patch(`/billing/subscriptions/${subscriptionId}`, {
        plan_id: planId,
      }),
    getPortalSession: () =>
      apiClient.post<{ url: string }>('/billing/create-portal-session'),
  },

  // 監視
  monitoring: {
    getMetrics: (instanceId: number) =>
      apiClient.get<{
        cpu: number;
        memory: number;
        disk: number;
        network: { in: number; out: number };
      }>(`/monitoring/metrics/${instanceId}`),
    getLogs: (instanceId: number) =>
      apiClient.get<{
        logs: Array<{
          timestamp: string;
          level: string;
          message: string;
        }>;
      }>(`/monitoring/logs/${instanceId}`),
  },
};