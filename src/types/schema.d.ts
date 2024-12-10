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
      action: {
        Row: {
          actionId: number
          command: string
          createdAt: string
          plantId: number
          status: string
          title: string
          type: string
          updatedAt: string
        }
        Insert: {
          actionId?: number
          command: string
          createdAt?: string
          plantId: number
          status: string
          title: string
          type: string
          updatedAt?: string
        }
        Update: {
          actionId?: number
          command?: string
          createdAt?: string
          plantId?: number
          status?: string
          title?: string
          type?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "action_plantId_fkey"
            columns: ["plantId"]
            isOneToOne: false
            referencedRelation: "plant"
            referencedColumns: ["plantId"]
          },
        ]
      }
      control: {
        Row: {
          commad: string
          controlId: number
          createdAt: string
          event: string
          name: string
          plantId: number
          status: string
          type: string
          updatedAt: string
        }
        Insert: {
          commad: string
          controlId?: number
          createdAt?: string
          event: string
          name: string
          plantId: number
          status: string
          type: string
          updatedAt?: string
        }
        Update: {
          commad?: string
          controlId?: number
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
          createdAt: string
          deviceId: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          deviceId: string
          updatedAt?: string
        }
        Update: {
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
          createdAt: string
          deviceId: string
          name: string
          plantId: number
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          deviceId: string
          name: string
          plantId?: number
          updatedAt?: string
        }
        Update: {
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
      sensor: {
        Row: {
          command: string
          createdAt: string
          deviceId: string
          nodeId: number
          sensorId: number
          updatedAt: string
          value: number | null
        }
        Insert: {
          command: string
          createdAt?: string
          deviceId: string
          nodeId: number
          sensorId?: number
          updatedAt?: string
          value?: number | null
        }
        Update: {
          command?: string
          createdAt?: string
          deviceId?: string
          nodeId?: number
          sensorId?: number
          updatedAt?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sensor_deviceId_fkey"
            columns: ["deviceId"]
            isOneToOne: false
            referencedRelation: "device"
            referencedColumns: ["deviceId"]
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
