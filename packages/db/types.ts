export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            categories: {
                Row: {
                    id: number
                    name: string
                    slug: string
                    icon_name: string | null
                    created_at: string
                }
                Insert: Omit<Database['public']['Tables']['categories']['Row'], 'id' | 'created_at'>
                Update: Partial<Database['public']['Tables']['categories']['Insert']>
            }
            sub_categories: {
                Row: {
                    id: number
                    category_id: number
                    name: string
                    slug: string
                    created_at: string
                }
                Insert: Omit<Database['public']['Tables']['sub_categories']['Row'], 'id' | 'created_at'>
                Update: Partial<Database['public']['Tables']['sub_categories']['Insert']>
            }
            tools: {
                Row: {
                    id: number
                    name: string
                    slug: string
                    category_id: number | null
                    sub_category_id: number | null
                    description_en: string | null
                    description_hi: string | null
                    pricing_model: 'Free' | 'Freemium' | 'Paid'
                    price_inr_monthly: number | null
                    free_tier_details: string | null
                    website_url: string | null
                    youtube_hindi_url: string | null
                    logo_url: string | null
                    rating: number | null
                    is_featured: boolean
                    is_sponsored: boolean
                    status: 'draft' | 'published' | 'disabled'
                    best_for_india: string | null
                    alternatives: string[] | null
                    screenshots: string[] | null
                    integrations: string[] | null
                    detailed_description_en: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['tools']['Row'], 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['tools']['Insert']>
            }
            users: { Row: any, Insert: any, Update: any }
            user_preferences: { Row: any, Insert: any, Update: any }
            reviews: { Row: any, Insert: any, Update: any }
            bookmarks: { Row: any, Insert: any, Update: any }
            tool_clicks: { Row: any, Insert: any, Update: any }
            notifications: { Row: any, Insert: any, Update: any }
            bookings: { Row: any, Insert: any, Update: any }
            tool_comparisons: { Read: any, Insert: any, Update: any }
            sponsored_listings: { Row: any, Insert: any, Update: any }
            data_sources: { Row: any, Insert: any, Update: any }
            admin_audit_log: { Row: any, Insert: any, Update: any }
        }
    }
}
