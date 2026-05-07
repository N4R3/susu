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
      study_progress: {
        Row: {
          id: string
          user_id: string
          scope: string
          item_id: string
          status: string
          metadata: Json
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          scope: string
          item_id: string
          status: string
          metadata?: Json
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          scope?: string
          item_id?: string
          status?: string
          metadata?: Json
          updated_at?: string
        }
      }
      practice_exam_attempts: {
        Row: {
          id: string
          user_id: string
          exam_id: string
          score_percent: number | null
          achieved_points: number | null
          total_points: number | null
          answers: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          exam_id: string
          score_percent?: number | null
          achieved_points?: number | null
          total_points?: number | null
          answers?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          exam_id?: string
          score_percent?: number | null
          achieved_points?: number | null
          total_points?: number | null
          answers?: Json
          created_at?: string
        }
      }
      material_notes: {
        Row: {
          id: string
          user_id: string
          subject_id: string | null
          material_id: string | null
          title: string | null
          content: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subject_id?: string | null
          material_id?: string | null
          title?: string | null
          content?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subject_id?: string | null
          material_id?: string | null
          title?: string | null
          content?: string | null
          updated_at?: string
        }
      }
    }
  }
}
