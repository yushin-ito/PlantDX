import { z } from "zod";

export const SignUpSchema = z.object({
  email: z.string().email({
    message: "メールアドレスを入力してください",
  }),
  password: z.string().min(8, {
    message: "英数字8文字以上で入力してください",
  }),
});

export const SignInSchema = z.object({
  email: z.string().email({
    message: "メールアドレスを入力してください",
  }),
  password: z.string().min(8, {
    message: "英数字8文字以上で入力してください",
  }),
});

export const PlantSchema = z.object({
  name: z.string().min(1, { message: "プラント名を入力してください" }),
  deviceId: z.string().min(1, { message: "デバイスIDを入力してください" }),
  template: z.enum(["none", "bdf"]),
});

export const SensorSchema = z.object({
  name: z.string().min(1, { message: "センサー名を入力してください" }),
  type: z
    .enum(["temperature", "humidity", "pressure", "volume"])
    .array()
    .min(1, { message: "少なくとも1つのセンサータイプを選択してください" }),
});
