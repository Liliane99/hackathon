import { z } from "zod";

export const envs = z
  .object({
    ENVIROMENT: z.enum(["DEV", "PROD"]),
    HOST: z.string().url().default("0.0.0.0"),
    PORT: z.coerce.number().default(3000),
    ME_CONFIG_MONGODB_URL: z.string().url(),
    MONGO_DB_NAME: z.string(),
  })
  .readonly()
  .parse(process.env);
