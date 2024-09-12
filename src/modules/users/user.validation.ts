import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  image: z.string(),
  account: z.object({}).optional(),
  profile: z.object({}).optional()
});

const detailsSchema = z.object({
  professionalEmail: z.string(),
  skills: z.array(z.string()),
  phone: z.string(),
  github: z.string(),
  linkedin: z.string(),
  address: z.string(),
});

export const UserValidation = {
  loginSchema,
  detailsSchema
};
