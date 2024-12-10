import { z } from "zod";

import {
  CONTROL_EVENT,
  CONTROL_TYPE,
  PLANT_TEMPLATE,
  SENSOR_TYPE,
} from "@/constants";

export const SignUpSchema = z.object({
  email: z
    .string()
    .email({
      message: "有効な形式で入力してください",
    })
    .min(1, { message: "メールアドレスを入力してください" }),
  password: z
    .string()
    .regex(/^[0-9a-zA-Z]+$/, {
      message: "半角英数字で入力してください",
    })
    .min(8, {
      message: "8文字以上で入力してください",
    }),
});

export const LogInSchema = z.object({
  email: z
    .string()
    .email({
      message: "有効な形式で入力してください",
    })
    .min(1, { message: "メールアドレスを入力してください" }),
  password: z
    .string()
    .regex(/^[0-9a-zA-Z]+$/, {
      message: "半角英数字で入力してください",
    })
    .min(8, {
      message: "8文字以上で入力してください",
    }),
});

export const CreatePlantSchema = z.object({
  name: z
    .string()
    .min(1, { message: "プラント名を入力してください" })
    .max(20, { message: "20文字以下で入力してください" }),
  deviceId: z
    .string()
    .min(1, { message: "デバイス番号を入力してください" })
    .length(8, { message: "8文字で入力してください" })
    .regex(/^\d+$/, { message: "数字のみで入力してください" }),
  template: z.enum(PLANT_TEMPLATE),
});

export const CreateNodeSchema = z
  .object({
    name: z.string().min(1, { message: "ノード名を入力してください" }),
    type: z
      .enum(SENSOR_TYPE)
      .array()
      .min(1, { message: "少なくとも1つのセンサーを選択してください" }),
    command: z.object({
      temperature: z.string().optional(),
      humidity: z.string().optional(),
      pressure: z.string().optional(),
      volume: z.string().optional(),
    }),
  })
  .superRefine((data, ctx) => {
    data.type.forEach((type) => {
      if (!data.command[type]) {
        ctx.addIssue({
          code: "custom",
          path: ["command", type],
          message: "コマンドを入力してください",
        });
      }
    });
  });

export const CreateControlSchema = z.object({
  name: z
    .string()
    .min(1, { message: "タイトルを入力してください" })
    .max(20, { message: "20文字以下で入力してください" }),
  type: z.enum(CONTROL_TYPE),
  event: z.enum(CONTROL_EVENT),
  command: z.string().min(1, { message: "コマンドを入力してください" }),
});

export const UpdatePlantSchema = z.object({
  name: z
    .string()
    .min(1, { message: "プラント名を入力してください" })
    .max(20, { message: "20文字以下で入力してください" }),
  deviceId: z
    .string()
    .min(1, { message: "デバイス番号を入力してください" })
    .length(8, { message: "8文字で入力してください" })
    .regex(/^\d+$/, { message: "数字のみで入力してください" }),
});
