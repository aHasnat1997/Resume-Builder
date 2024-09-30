import { Details, Users } from "@prisma/client";

export type TUserUpdate = {
  user: Partial<Users>,
  details: Partial<Details>
};