const BASE = `${import.meta.env.BASE_URL}api`.replace(/\/+/g, "/");

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  if (res.status === 204) return null as T;
  return res.json();
}

export const api = {
  rants: {
    latest: (params?: Record<string, string>) => {
      const qs = params ? "?" + new URLSearchParams(params).toString() : "";
      return request<{ rants: Rant[]; pagination: Pagination }>(`/rants/latest${qs}`);
    },
    trending: () => request<Rant[]>("/rants/trending"),
    featured: () => request<Rant | null>("/rants/featured"),
    byLine: () => request<Record<string, Rant[]>>("/rants/by-line"),
    topByLine: () => request<Record<string, Rant | null>>("/rants/top-by-line"),
    leaderboard: (period = "all", limit = 20) =>
      request<Rant[]>(`/rants/leaderboard?period=${period}&limit=${limit}`),
    get: (id: string) => request<Rant>(`/rants/${id}`),
    vote: (id: string) => request<{ id: string; votes: number }>(`/rants/${id}/vote`, { method: "POST" }),
    downvote: (id: string) => request<{ id: string; downvotes: number }>(`/rants/${id}/downvote`, { method: "POST" }),
    play: (id: string) => request<{ id: string; plays: number }>(`/rants/${id}/play`, { method: "POST" }),
  },
  stats: {
    calls: () => request<CallStats>("/stats/calls"),
    callsToday: () => request<CallStats>("/stats/calls/today"),
    global: () => request<GlobalStats>("/stats/global"),
    topics: () => request<{ topic: string; total: number }[]>("/stats/topics"),
    topRanters: (limit = 10) => request<TopRanter[]>(`/stats/top-ranters?limit=${limit}`),
    categoryBreakdown: () => request<{ topic: string; count: number; percentage: number }[]>("/stats/category-breakdown"),
  },
  callCodes: {
    generate: (plan: string, category?: string) =>
      request<{ code: string; expiresAt: string; plan: string }>("/call-codes/generate", {
        method: "POST",
        body: JSON.stringify({ plan, category }),
      }),
    lookup: (code: string) => request<CallCodeInfo>(`/call-codes/${code}`),
  },
  payments: {
    createSession: (product: string, category?: string) =>
      request<{ url: string; sessionId: string }>("/payments/create-session", {
        method: "POST",
        body: JSON.stringify({ product, category }),
      }),
  },
};

export interface Rant {
  id: string;
  rantNumber: number;
  category: string;
  title: string | null;
  topic: string | null;
  audioUrl: string;
  duration: number;
  votes: number;
  downvotes: number;
  plays: number;
  featured: boolean;
  createdAt: string;
  callerNickname: string | null;
  callerCity: string | null;
  callerState: string | null;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CallStats {
  maga_calls: number;
  blue_calls: number;
  neutral_calls: number;
  total_calls: number;
}

export interface GlobalStats {
  totalRants: number;
  totalPlays: number;
  totalVotes: number;
  approvedRants: number;
  featuredRants: number;
  totalCallers: number;
}

export interface TopRanter {
  rank: number;
  callerId: string;
  nickname: string;
  city: string | null;
  state: string | null;
  totalRants: number;
  totalVotes: number;
}

export interface CallCodeInfo {
  code: string;
  plan: string;
  category: string | null;
  used: boolean;
  expired: boolean;
  valid: boolean;
  expiresAt: string;
  createdAt: string;
}
