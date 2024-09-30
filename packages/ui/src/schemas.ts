import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string(),
});

export const registerSchema = z
  .object({
    code: z.string().length(8),
    display_name: z.string().max(100),
    username: z.string().min(2).max(100),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    email: z.string().email(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });

export const verifySchema = z.object({
  otp: z.string().length(6),
});
