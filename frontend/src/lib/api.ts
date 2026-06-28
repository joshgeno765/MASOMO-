import axios from 'axios'
import { InquiryFormData, ApiResponse, Lead, LeadStatus } from '../types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' },
})

// Attach stored token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('masomo_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── Public ────────────────────────────────────────────────────────────────────

export async function submitInquiry(data: InquiryFormData): Promise<ApiResponse<Lead>> {
  const res = await api.post<ApiResponse<Lead>>('/api/leads', data)
  return res.data
}

export async function healthCheck(): Promise<{ status: string }> {
  const res = await api.get('/health')
  return res.data
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function login(email: string, password: string) {
  const res = await api.post<ApiResponse<{ token: string; user: { id: number; email: string; role: string } }>>('/api/auth/login', { email, password })
  return res.data
}

export async function getMe() {
  const res = await api.get<ApiResponse<{ id: number; email: string; role: string }>>('/api/auth/me')
  return res.data
}

// ── Admin — Leads ─────────────────────────────────────────────────────────────

export async function getLeads(params?: { status?: LeadStatus; search?: string; page?: number }) {
  const res = await api.get<ApiResponse<Lead[]>>('/api/leads', { params })
  return res.data
}

export async function getLead(id: number) {
  const res = await api.get<ApiResponse<Lead>>(`/api/leads/${id}`)
  return res.data
}

export async function updateLead(id: number, data: Partial<Pick<Lead, 'status' | 'notes' | 'assignedCounselorId'>>) {
  const res = await api.patch<ApiResponse<Lead>>(`/api/leads/${id}`, data)
  return res.data
}

export async function closeLead(id: number) {
  const res = await api.delete<ApiResponse<null>>(`/api/leads/${id}`)
  return res.data
}

export default api
