import { z } from "zod";

const baseField = z.object({
  label: z.string(),
  name: z.string(),
  required: z.boolean().optional(),
});

const textField = baseField.extend({
  type: z.literal("text"),
});

const emailField = baseField.extend({
  type: z.literal("email"),
});

const selectField = baseField.extend({
  type: z.literal("select"),
  options: z.string().array(),
});

const numberField = baseField.extend({
  type: z.literal("number"),
  min: z.number().optional(),
  max: z.number().optional(),
});

export const formSchema = z.discriminatedUnion("type", [
  textField,
  emailField,
  selectField,
  numberField,
]);

export type FormField = z.infer<typeof formSchema>;
