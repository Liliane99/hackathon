import {z} from "zod";

export const contractorSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	email: z.string().email(),
	phoneNumber: z.string(),
})