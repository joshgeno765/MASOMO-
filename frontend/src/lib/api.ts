import axios from 'axios'
import { ApiResponse, Lead, LeadStatus, Appointment, AppointmentStatus, AppointmentWithLead, ConsultationFormData, PathwayFinderSubmission } from '../types'

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

export async function healthCheck(): Promise<{ status: string }> {
  const res = await api.get('/health')
  return res.data
}

export async function bookConsultation(data: ConsultationFormData): Promise<ApiResponse<Appointment>> {
  const res = await api.post<ApiResponse<Appointment>>('/api/appointments', data)
  return res.data
}

export async function submitPathwayResult(data: PathwayFinderSubmission): Promise<ApiResponse<Lead>> {
  const res = await api.post<ApiResponse<Lead>>('/api/pathway-finder', data)
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

// ── Admin — Users ─────────────────────────────────────────────────────────────

export interface StaffUser {
  id: number
  email: string
  role: 'ADMIN' | 'COUNSELOR'
  isActive: boolean
  createdAt: string
}

export async function getUsers(): Promise<ApiResponse<StaffUser[]>> {
  const res = await api.get<ApiResponse<StaffUser[]>>('/api/users')
  return res.data
}

export async function createUser(email: string, password: string, role: 'ADMIN' | 'COUNSELOR'): Promise<ApiResponse<StaffUser>> {
  const res = await api.post<ApiResponse<StaffUser>>('/api/users', { email, password, role })
  return res.data
}

export async function toggleUserActive(id: number, isActive: boolean): Promise<ApiResponse<StaffUser>> {
  const res = await api.patch<ApiResponse<StaffUser>>(`/api/users/${id}`, { isActive })
  return res.data
}

// ── Admin — Consultations ─────────────────────────────────────────────────────

export async function getAppointments(params?: { status?: AppointmentStatus; page?: number }) {
  const res = await api.get<ApiResponse<AppointmentWithLead[]>>('/api/appointments', { params })
  return res.data
}

export async function updateAppointment(id: number, data: Partial<Pick<Appointment, 'status' | 'notes' | 'scheduledAt'>>) {
  const res = await api.patch<ApiResponse<Appointment>>(`/api/appointments/${id}`, data)
  return res.data
}

export default api
