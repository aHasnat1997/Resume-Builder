import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  image: z.string(),
  account: z.object({}).optional(),
  profile: z.object({}).optional()
});

export const UserValidation = {
  loginSchema
};