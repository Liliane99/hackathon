import {z} from "zod";
import {contractorSchema} from "./contractor";

const baseServiceSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  contractor: contractorSchema,
});

export const agentAiSchema = z.object({
	id: z.string(),
	endpointUrl: z.string().url(),
	modelName: z.string(),
	inputParameters: z.string().array(),
	outputParameters: z.string().array(),
});

export const serviceSchema = z.discriminatedUnion("type", [
  baseServiceSchema.extend({
    type: z.literal("ai"),
    agentAi: agentAiSchema,
	price: z.number().positive(),
  }),
  baseServiceSchema.extend({
    type: z.literal("human"),
	pricePerDays: z.number().positive(),
  }),
]);

export type Service = z.infer<typeof serviceSchema>;