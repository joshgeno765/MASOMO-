export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'CONSULTATION_SCHEDULED'
  | 'APPLICATION_STARTED'
  | 'CONVERTED'
  | 'CLOSED'

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  NEW: 'New',
  CONTACTED: 'Contacted',
  CONSULTATION_SCHEDULED: 'Consultation Scheduled',
  APPLICATION_STARTED: 'Application Started',
  CONVERTED: 'Converted',
  CLOSED: 'Closed',
}

export const LEAD_STATUS_COLORS: Record<LeadStatus, string> = {
  NEW: 'text-blue-600',
  CONTACTED: 'text-yellow-600',
  CONSULTATION_SCHEDULED: 'text-purple-600',
  APPLICATION_STARTED: 'text-orange-600',
  CONVERTED: 'text-green-600',
  CLOSED: 'text-gray-400',
}

export const LEAD_STATUS_DOT: Record<LeadStatus, string> = {
  NEW: 'bg-blue-500',
  CONTACTED: 'bg-yellow-500',
  CONSULTATION_SCHEDULED: 'bg-purple-500',
  APPLICATION_STARTED: 'bg-orange-500',
  CONVERTED: 'bg-green-500',
  CLOSED: 'bg-gray-400',
}

export interface Lead {
  id: number
  name: string
  email: string
  phone: string
  country?: string
  destinationInterest: string
  message?: string
  status: LeadStatus
  notes?: string
  assignedCounselorId?: number
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
  meta?: {
    total: number
    page: number
    limit: number
    pages: number
    counts?: Array<{ status: string; _count: { id: number } }>
  }
}

export interface User {
  id: number
  email: string
  role: string
}

export type AppointmentStatus = 'SCHEDULED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'

export interface Appointment {
  id: number
  leadId?: number
  studentId?: number
  counselorId?: number
  scheduledAt: string
  duration: number
  type: string
  status: AppointmentStatus
  notes?: string
  destination?: string
  createdAt: string
  updatedAt: string
}

export interface AppointmentWithLead extends Appointment {
  lead?: Lead
}

export interface ConsultationFormData {
  name: string
  email: string
  phone: string
  country: string
  destinationInterest: string
  scheduledAt: string
  notes: string
}

export interface PathwayQuizAnswers {
  homeCountry: string
  languagePreference: 'French' | 'English' | 'Both / Not sure'
  fieldOfInterest: 'Technical / Trades' | 'Business & Management' | 'University / Academic' | 'Not sure yet'
  budget: 'Most affordable option' | 'Budget flexible' | 'Not sure'
  timeline: 'As soon as possible' | 'Within the next year' | 'Just exploring'
}

export interface PathwayMatchResultPayload {
  country: string
  schools: string[]
  isFmcPathway: boolean
}

export interface PathwayFinderSubmission {
  name: string
  email: string
  phone: string
  country?: string
  destinationInterest: string
  message?: string
  quizAnswers: PathwayQuizAnswers
  matchedResult: PathwayMatchResultPayload
}
