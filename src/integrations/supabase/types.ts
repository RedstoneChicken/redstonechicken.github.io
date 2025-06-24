export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      channel_stats: {
        Row: {
          id: string
          subscribers: number
          total_views: number
          updated_at: string
          video_count: number
        }
        Insert: {
          id?: string
          subscribers?: number
          total_views?: number
          updated_at?: string
          video_count?: number
        }
        Update: {
          id?: string
          subscribers?: number
          total_views?: number
          updated_at?: string
          video_count?: number
        }
        Relationships: []
      }
      download_tracking: {
        Row: {
          addon_id: string | null
          created_at: string
          downloaded_at: string
          file_id: string | null
          id: string
          project_id: string
          user_agent: string | null
          user_ip: unknown | null
        }
        Insert: {
          addon_id?: string | null
          created_at?: string
          downloaded_at?: string
          file_id?: string | null
          id?: string
          project_id: string
          user_agent?: string | null
          user_ip?: unknown | null
        }
        Update: {
          addon_id?: string | null
          created_at?: string
          downloaded_at?: string
          file_id?: string | null
          id?: string
          project_id?: string
          user_agent?: string | null
          user_ip?: unknown | null
        }
        Relationships: [
          {
            foreignKeyName: "download_tracking_addon_id_fkey"
            columns: ["addon_id"]
            isOneToOne: false
            referencedRelation: "project_addons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "download_tracking_file_id_fkey"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "project_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "download_tracking_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      function_logs: {
        Row: {
          created_at: string | null
          id: number
          log_message: string | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          log_message?: string | null
        }
        Update: {
          created_at?: string | null
          id?: never
          log_message?: string | null
        }
        Relationships: []
      }
      project_addons: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          download_count: number | null
          file_type: string | null
          file_url: string
          id: string
          mc_versions: string[]
          name: string
          project_id: string
          storage_path: string | null
          updated_at: string
          version_number: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          download_count?: number | null
          file_type?: string | null
          file_url: string
          id?: string
          mc_versions?: string[]
          name: string
          project_id: string
          storage_path?: string | null
          updated_at?: string
          version_number: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          download_count?: number | null
          file_type?: string | null
          file_url?: string
          id?: string
          mc_versions?: string[]
          name?: string
          project_id?: string
          storage_path?: string | null
          updated_at?: string
          version_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_addons_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_files: {
        Row: {
          changelog: string | null
          created_at: string
          download_count: number | null
          file_name: string | null
          file_type: string | null
          file_url: string
          id: string
          is_primary: boolean | null
          mc_versions: string[]
          project_id: string
          storage_path: string | null
          updated_at: string
          version_number: string
        }
        Insert: {
          changelog?: string | null
          created_at?: string
          download_count?: number | null
          file_name?: string | null
          file_type?: string | null
          file_url: string
          id?: string
          is_primary?: boolean | null
          mc_versions?: string[]
          project_id: string
          storage_path?: string | null
          updated_at?: string
          version_number: string
        }
        Update: {
          changelog?: string | null
          created_at?: string
          download_count?: number | null
          file_name?: string | null
          file_type?: string | null
          file_url?: string
          id?: string
          is_primary?: boolean | null
          mc_versions?: string[]
          project_id?: string
          storage_path?: string | null
          updated_at?: string
          version_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_files_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_gallery: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string
          order_index: number | null
          project_id: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url: string
          order_index?: number | null
          project_id: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string
          order_index?: number | null
          project_id?: string
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_gallery_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_videos: {
        Row: {
          created_at: string
          description: string | null
          featured: boolean | null
          id: string
          order_index: number | null
          project_id: string
          thumbnail_url: string | null
          title: string
          type: string | null
          updated_at: string
          video_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          order_index?: number | null
          project_id: string
          thumbnail_url?: string | null
          title: string
          type?: string | null
          updated_at?: string
          video_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          order_index?: number | null
          project_id?: string
          thumbnail_url?: string | null
          title?: string
          type?: string | null
          updated_at?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_videos_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          cover_image_url: string | null
          created_at: string
          description: string
          description_images: string[] | null
          description_rich: string | null
          featured: boolean | null
          file_count: number | null
          gallery_image_count: number | null
          gallery_image_paths: string[] | null
          id: string
          image_url: string | null
          mc_versions: string[]
          name: string
          short_description: string
          slug: string
          total_download_count: number | null
          type: string
          updated_at: string
          version: string
          video_count: number | null
        }
        Insert: {
          cover_image_url?: string | null
          created_at?: string
          description: string
          description_images?: string[] | null
          description_rich?: string | null
          featured?: boolean | null
          file_count?: number | null
          gallery_image_count?: number | null
          gallery_image_paths?: string[] | null
          id?: string
          image_url?: string | null
          mc_versions?: string[]
          name: string
          short_description: string
          slug: string
          total_download_count?: number | null
          type: string
          updated_at?: string
          version: string
          video_count?: number | null
        }
        Update: {
          cover_image_url?: string | null
          created_at?: string
          description?: string
          description_images?: string[] | null
          description_rich?: string | null
          featured?: boolean | null
          file_count?: number | null
          gallery_image_count?: number | null
          gallery_image_paths?: string[] | null
          id?: string
          image_url?: string | null
          mc_versions?: string[]
          name?: string
          short_description?: string
          slug?: string
          total_download_count?: number | null
          type?: string
          updated_at?: string
          version?: string
          video_count?: number | null
        }
        Relationships: []
      }
      youtube_videos: {
        Row: {
          created_at: string
          description: string | null
          featured: boolean | null
          id: string
          published_at: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          video_id: string
          view_count: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          published_at?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          video_id: string
          view_count?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          published_at?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          video_id?: string
          view_count?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_service_role_key: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      my_hourly_function: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      sync_download_counts: {
        Args: { target_project_id?: string }
        Returns: {
          project_id: string
          old_count: number
          new_count: number
          tracking_count: number
        }[]
      }
      update_youtube_stats: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
