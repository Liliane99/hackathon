import { z } from "zod";
import { contractorSchema } from "./contractor";
import { formSchema } from "./formBuilder";

const baseServiceSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  contractor: contractorSchema.optional(),
});

export const agentAiSchema = z.object({
  id: z.string(),
  endpointUrl: z.string().url(),
  modelName: z.string(),
  token: z.string(),
});

export const serviceSchema = z.discriminatedUnion(
  "type", [
    baseServiceSchema.extend({
      type: z.literal("ai"),
      agentAi: agentAiSchema,
      price: z.number().positive(),
      form: formSchema.array(),
    }),
    baseServiceSchema.extend({
      type: z.literal("human"),
      pricePerDays: z.number().positive(),
    }),
  ]);

export type Service = z.infer<typeof serviceSchema>;

export const createServiceIaSchema = z.object({
  name: z.string(),
  description: z.string(),
  endpointUrl: z.string().url(),
  modelName: z.string(),
  price: z.number().positive(),
  token: z.string(),
  form: formSchema.array(),
});

export const createServiceHumanSchema = z.object({
  name: z.string(),
  description: z.string(),
  pricePerDays: z.number().positive(),
});
