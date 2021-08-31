/**
 * Model definition for LeadFormSubmissions
 */
export interface LeadFormSubmissions {
  id: string
  email?: string
  status?: "seen" | "contacted" | "ignored"
  location?: string
}
