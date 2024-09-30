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

const projectSchema = z.object({
  projectName: z.string(),
  description: z.string(),
});

export const UserValidation = {
  loginSchema,
  detailsSchema,
  projectSchema
};
