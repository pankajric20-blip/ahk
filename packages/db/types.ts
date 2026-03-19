export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      ai_tools: {
        Row: {
          id: string;
          name_en: string;
          name_hi: string | null;
          name_hinglish: string | null;
          slug: string;
          tagline_en: string | null;
          tagline_hi: string | null;
          tagline_hinglish: string | null;
          description_en: string | null;
          description_hi: string | null;
          description_hinglish: string | null;
          website_url: string;
          logo_url: string | null;
          demo_video_url: string | null;
          pricing_model:
            | "free"
            | "freemium"
            | "free_trial"
            | "paid"
            | "contact_sales";
          price_inr_monthly: number | null;
          price_inr_yearly: number | null;
          price_usd_monthly: number | null;
          free_tier_details: string | null;
          trial_days: number | null;
          supports_hindi: boolean | null;
          supports_regional_languages: Json | null;
          made_in_india: boolean | null;
          mobile_friendly: boolean | null;
          works_offline: boolean | null;
          low_data_usage: boolean | null;
          upi_payment_accepted: boolean | null;
          gst_compliant: boolean | null;
          works_with_tally: boolean | null;
          works_on_jio_phone: boolean | null;
          whatsapp_integration: boolean | null;
          access_type:
            | "open"
            | "closed_beta"
            | "waitlist"
            | "api_only"
            | "invite_only"
            | null;
          platform: Json | null;
          api_available: boolean | null;
          rating_avg: number | null;
          rating_count: number | null;
          review_count: number | null;
          save_count: number | null;
          click_count: number | null;
          share_count: number | null;
          trending_score: number | null;
          submitted_by: string | null;
          verified_by: string | null;
          is_verified: boolean | null;
          is_featured: boolean | null;
          is_sponsored: boolean | null;
          status:
            | "pending"
            | "approved"
            | "rejected"
            | "archived"
            | "flagged"
            | null;
          rejection_reason: string | null;
          admin_notes: string | null;
          seo_keywords: Json | null;
          created_at: string | null;
          updated_at: string | null;
          approved_at: string | null;
          featured_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["ai_tools"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["ai_tools"]["Row"]>;
      };
      task_categories: {
        Row: {
          id: string;
          name_en: string;
          name_hi: string;
          name_hinglish: string | null;
          slug: string;
          description_en: string | null;
          description_hi: string | null;
          description_hinglish: string | null;
          icon: string | null;
          parent_id: string | null;
          level: number | null;
          is_india_specific: boolean | null;
          display_order: number | null;
          is_active: boolean | null;
          tool_count: number | null;
          search_count: number | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["task_categories"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["task_categories"]["Row"]>;
      };
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          avatar_url: string | null;
          bio: string | null;
          phone_verified: boolean | null;
          city: string | null;
          state: string | null;
          preferred_language:
            | "hi"
            | "en"
            | "hinglish"
            | "ta"
            | "te"
            | "bn"
            | "mr"
            | null;
          user_type:
            | "student"
            | "business_owner"
            | "creator"
            | "teacher"
            | "developer"
            | "freelancer"
            | "professional"
            | "other"
            | null;
          business_type: string | null;
          business_name: string | null;
          karma_score: number | null;
          is_ai_champion: boolean | null;
          champion_since: string | null;
          tools_reviewed: number | null;
          tools_saved: number | null;
          helpful_votes_received: number | null;
          email_notifications: boolean | null;
          whatsapp_notifications: boolean | null;
          weekly_digest: boolean | null;
          created_at: string | null;
          updated_at: string | null;
          last_active_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
      };
      reviews: {
        Row: {
          id: string;
          tool_id: string;
          user_id: string;
          rating: number;
          title: string | null;
          review_text: string;
          language: "hi" | "en" | "hinglish" | null;
          image_urls: Json | null;
          video_url: string | null;
          user_city: string | null;
          user_type: string | null;
          usage_duration: string | null;
          use_case: string | null;
          helpful_count: number | null;
          not_helpful_count: number | null;
          is_verified: boolean | null;
          is_featured: boolean | null;
          status: "published" | "pending" | "flagged" | "removed" | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["reviews"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["reviews"]["Row"]>;
      };
    };
  };
}
