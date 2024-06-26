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
      availability: {
        Row: {
          created_at: string
          end_date: string
          id: number
          min_stay: number | null
          price: number | null
          room_id: number
          start_date: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: number
          min_stay?: number | null
          price?: number | null
          room_id: number
          start_date: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: number
          min_stay?: number | null
          price?: number | null
          room_id?: number
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "availability_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "room"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_request: {
        Row: {
          created_at: string
          end_date: string
          id: number
          room_id: number
          start_date: string
          status: Database["public"]["Enums"]["booking_request_status"]
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: number
          room_id: number
          start_date: string
          status?: Database["public"]["Enums"]["booking_request_status"]
          user_id?: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: number
          room_id?: number
          start_date?: string
          status?: Database["public"]["Enums"]["booking_request_status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_booking_request_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "room"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_booking_request_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      room: {
        Row: {
          cover_photo: string | null
          created_at: string
          currency: Database["public"]["Enums"]["currency"] | null
          default_min_stay: number
          default_price: number | null
          id: number
          location: string
          name: string
          owner_id: string | null
          type: Database["public"]["Enums"]["room_type"] | null
        }
        Insert: {
          cover_photo?: string | null
          created_at?: string
          currency?: Database["public"]["Enums"]["currency"] | null
          default_min_stay?: number
          default_price?: number | null
          id?: number
          location?: string
          name: string
          owner_id?: string | null
          type?: Database["public"]["Enums"]["room_type"] | null
        }
        Update: {
          cover_photo?: string | null
          created_at?: string
          currency?: Database["public"]["Enums"]["currency"] | null
          default_min_stay?: number
          default_price?: number | null
          id?: number
          location?: string
          name?: string
          owner_id?: string | null
          type?: Database["public"]["Enums"]["room_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "public_room_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          about: string | null
          avatar: string | null
          birthday: string | null
          created_at: string
          gender: Database["public"]["Enums"]["gender"] | null
          id: string
          name: string | null
        }
        Insert: {
          about?: string | null
          avatar?: string | null
          birthday?: string | null
          created_at?: string
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: string
          name?: string | null
        }
        Update: {
          about?: string | null
          avatar?: string | null
          birthday?: string | null
          created_at?: string
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: string
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_user_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      booking_request_status: "pending" | "accepted" | "rejected" | "saved"
      currency: "EUR" | "USD"
      gender: "male" | "female" | "other"
      room_type: "room" | "flat"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
