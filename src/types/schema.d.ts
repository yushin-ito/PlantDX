export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      control: {
        Row: {
          command: string
          controlId: number
          count: number
          createdAt: string
          event: string
          name: string
          plantId: number
          status: string
          type: string
          updatedAt: string
        }
        Insert: {
          command: string
          controlId?: number
          count?: number
          createdAt?: string
          event: string
          name: string
          plantId: number
          status: string
          type: string
          updatedAt?: string
        }
        Update: {
          command?: string
          controlId?: number
          count?: number
          createdAt?: string
          event?: string
          name?: string
          plantId?: number
          status?: string
          type?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "control_plantId_fkey"
            columns: ["plantId"]
            isOneToOne: false
            referencedRelation: "plant"
            referencedColumns: ["plantId"]
          },
        ]
      }
      device: {
        Row: {
          active: boolean
          createdAt: string
          deviceId: string
          updatedAt: string
        }
        Insert: {
          active?: boolean
          createdAt?: string
          deviceId: string
          updatedAt?: string
        }
        Update: {
          active?: boolean
          createdAt?: string
          deviceId?: string
          updatedAt?: string
        }
        Relationships: []
      }
      edge: {
        Row: {
          createdAt: string
          edgeId: number
          plantId: number
          sourceHandle: string
          sourceId: number
          targetHandle: string
          targetId: number
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          edgeId?: number
          plantId: number
          sourceHandle: string
          sourceId: number
          targetHandle: string
          targetId: number
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          edgeId?: number
          plantId?: number
          sourceHandle?: string
          sourceId?: number
          targetHandle?: string
          targetId?: number
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "edge_plantId_fkey"
            columns: ["plantId"]
            isOneToOne: false
            referencedRelation: "plant"
            referencedColumns: ["plantId"]
          },
          {
            foreignKeyName: "edge_sourceId_fkey"
            columns: ["sourceId"]
            isOneToOne: false
            referencedRelation: "node"
            referencedColumns: ["nodeId"]
          },
          {
            foreignKeyName: "edge_targetId_fkey"
            columns: ["targetId"]
            isOneToOne: false
            referencedRelation: "node"
            referencedColumns: ["nodeId"]
          },
        ]
      }
      history: {
        Row: {
          command: string
          content: string
          createdAt: string
          historyId: number
          plantId: number
          status: string
          updatedAt: string
          userId: string
        }
        Insert: {
          command: string
          content: string
          createdAt?: string
          historyId?: number
          plantId: number
          status: string
          updatedAt?: string
          userId?: string
        }
        Update: {
          command?: string
          content?: string
          createdAt?: string
          historyId?: number
          plantId?: number
          status?: string
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "action_plantId_fkey"
            columns: ["plantId"]
            isOneToOne: false
            referencedRelation: "plant"
            referencedColumns: ["plantId"]
          },
          {
            foreignKeyName: "history_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["userId"]
          },
        ]
      }
      member: {
        Row: {
          createdAt: string
          memberId: number
          plantId: number
          role: string
          updatedAt: string
          userId: string
        }
        Insert: {
          createdAt?: string
          memberId?: number
          plantId: number
          role: string
          updatedAt?: string
          userId: string
        }
        Update: {
          createdAt?: string
          memberId?: number
          plantId?: number
          role?: string
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "member_plantId_fkey"
            columns: ["plantId"]
            isOneToOne: false
            referencedRelation: "plant"
            referencedColumns: ["plantId"]
          },
          {
            foreignKeyName: "member_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["userId"]
          },
        ]
      }
      node: {
        Row: {
          createdAt: string
          name: string
          nodeId: number
          plantId: number
          type: string[]
          updatedAt: string
          x: number
          y: number
        }
        Insert: {
          createdAt?: string
          name: string
          nodeId?: number
          plantId: number
          type: string[]
          updatedAt?: string
          x: number
          y: number
        }
        Update: {
          createdAt?: string
          name?: string
          nodeId?: number
          plantId?: number
          type?: string[]
          updatedAt?: string
          x?: number
          y?: number
        }
        Relationships: [
          {
            foreignKeyName: "sensor_plantId_fkey"
            columns: ["plantId"]
            isOneToOne: false
            referencedRelation: "plant"
            referencedColumns: ["plantId"]
          },
        ]
      }
      plant: {
        Row: {
          count: number
          createdAt: string
          deviceId: string
          name: string
          plantId: number
          updatedAt: string
        }
        Insert: {
          count?: number
          createdAt?: string
          deviceId: string
          name: string
          plantId?: number
          updatedAt?: string
        }
        Update: {
          count?: number
          createdAt?: string
          deviceId?: string
          name?: string
          plantId?: number
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "plant_deviceId_fkey"
            columns: ["deviceId"]
            isOneToOne: false
            referencedRelation: "device"
            referencedColumns: ["deviceId"]
          },
        ]
      }
      record: {
        Row: {
          createdAt: string
          plantId: number
          recordId: number
          sensorId: number
          value: number
        }
        Insert: {
          createdAt?: string
          plantId: number
          recordId?: number
          sensorId: number
          value: number
        }
        Update: {
          createdAt?: string
          plantId?: number
          recordId?: number
          sensorId?: number
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "data_plantId_fkey"
            columns: ["plantId"]
            isOneToOne: false
            referencedRelation: "plant"
            referencedColumns: ["plantId"]
          },
          {
            foreignKeyName: "data_sensorId_fkey"
            columns: ["sensorId"]
            isOneToOne: false
            referencedRelation: "sensor"
            referencedColumns: ["sensorId"]
          },
        ]
      }
      sensor: {
        Row: {
          createdAt: string
          nodeId: number | null
          plantId: number
          sensorId: number
          type: string
          unit: string
          updatedAt: string
          value: number | null
        }
        Insert: {
          createdAt?: string
          nodeId?: number | null
          plantId: number
          sensorId?: number
          type: string
          unit: string
          updatedAt?: string
          value?: number | null
        }
        Update: {
          createdAt?: string
          nodeId?: number | null
          plantId?: number
          sensorId?: number
          type?: string
          unit?: string
          updatedAt?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sensor_plantId_fkey1"
            columns: ["plantId"]
            isOneToOne: false
            referencedRelation: "plant"
            referencedColumns: ["plantId"]
          },
          {
            foreignKeyName: "sensorId_nodeId_fkey"
            columns: ["nodeId"]
            isOneToOne: false
            referencedRelation: "node"
            referencedColumns: ["nodeId"]
          },
        ]
      }
      user: {
        Row: {
          avatarUrl: string | null
          color: string
          createdAt: string
          name: string
          updatedAt: string
          userId: string
        }
        Insert: {
          avatarUrl?: string | null
          color: string
          createdAt?: string
          name: string
          updatedAt?: string
          userId: string
        }
        Update: {
          avatarUrl?: string | null
          color?: string
          createdAt?: string
          name?: string
          updatedAt?: string
          userId?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
