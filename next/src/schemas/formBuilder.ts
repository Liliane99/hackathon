<<<<<<< HEAD
import { z } from "zod";
=======
import { z } from "zod"
>>>>>>> cf228cd (fix)

const baseField = z.object({
  label: z.string(),
  name: z.string(),
<<<<<<< HEAD
  placeholder: z.string().optional(),
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
=======
  required: z.boolean().default(false),
})

const textField = baseField.extend({
  type: z.literal("text")
})

const emailField = baseField.extend({
  type: z.literal("email")
})

const selectField = baseField.extend({
  type: z.literal("select"),
  options: z.string().array()
})
>>>>>>> cf228cd (fix)

const numberField = baseField.extend({
  type: z.literal("number"),
  min: z.number().optional(),
  max: z.number().optional(),
<<<<<<< HEAD
});

const textAreaField = baseField.extend({
  type: z.literal("textarea"),
  rows: z.number().optional(),
  cols: z.number().optional(),
});
=======
})
>>>>>>> cf228cd (fix)

export const formSchema = z.discriminatedUnion("type", [
  textField,
  emailField,
  selectField,
<<<<<<< HEAD
  numberField,
  textAreaField,
]);

export type FormField = z.infer<typeof formSchema>;
=======
  numberField
])

export type FormField = z.infer<typeof formSchema>
>>>>>>> cf228cd (fix)
