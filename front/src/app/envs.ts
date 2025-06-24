import { z } from "zod";

export const envs = z
	.object({
		PORT: z.coerce.number().default(3000),
	})
	.readonly()
	.parse(process.env);