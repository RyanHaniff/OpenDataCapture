import type { FormFieldKind } from '@douglasneuroinformatics/form-types';
import type Types from '@open-data-capture/types';
import { type ZodType, type ZodTypeAny, z } from 'zod';

const languageSchema: ZodType<Types.Language> = z.enum(['en', 'fr']);

const instrumentUIOption = <T extends ZodTypeAny>(schema: T) => {
  return z.union([
    schema,
    z.object({
      en: schema,
      fr: schema
    })
  ]);
};

const formFieldKindSchema: ZodType<FormFieldKind> = z.enum(['options', 'date', 'array', 'binary', 'numeric', 'text']);

const formInstrumentBaseFieldSchema = z.object({
  description: instrumentUIOption(z.string()),
  isRequired: z.boolean().optional(),
  kind: formFieldKindSchema,
  label: instrumentUIOption(z.string())
});

const formInstrumentTextFieldSchema: ZodType<Types.FormInstrumentTextField> = formInstrumentBaseFieldSchema.extend({
  kind: z.literal('text'),
  variant: z.enum(['long', 'password', 'short'])
});

const formInstrumentOptionsFieldSchema: ZodType<Types.FormInstrumentOptionsField> =
  formInstrumentBaseFieldSchema.extend({
    kind: z.literal('options'),
    options: instrumentUIOption(z.record(z.string()))
  });

const formInstrumentDateFieldSchema: ZodType<Types.FormInstrumentDateField> = formInstrumentBaseFieldSchema.extend({
  kind: z.literal('date')
});

const formInstrumentNumericFieldSchema: ZodType<Types.FormInstrumentNumericField> =
  formInstrumentBaseFieldSchema.extend({
    kind: z.literal('numeric'),
    max: z.number(),
    min: z.number(),
    variant: z.enum(['default', 'slider'])
  });

const formInstrumentBinaryFieldSchema: ZodType<Types.FormInstrumentBinaryField> = formInstrumentBaseFieldSchema.extend({
  kind: z.literal('binary'),
  options: z
    .object({
      f: z.string(),
      t: z.string()
    })
    .optional(),
  variant: z.enum(['checkbox', 'radio'])
});

const formInstrumentPrimitiveFieldSchema: ZodType<Types.FormInstrumentPrimitiveField> = z.union([
  formInstrumentTextFieldSchema,
  formInstrumentOptionsFieldSchema,
  formInstrumentDateFieldSchema,
  formInstrumentNumericFieldSchema,
  formInstrumentBinaryFieldSchema
]);

const formInstrumentArrayFieldSchema: ZodType<Types.FormInstrumentArrayField> = formInstrumentBaseFieldSchema.extend({
  // Dynamic fieldset is not permitted here
  fieldset: z.record(formInstrumentPrimitiveFieldSchema),
  kind: z.literal('array')
});

const formInstrumentStaticFieldsSchema: ZodType<Types.FormInstrumentStaticFields> = z.record(
  z.union([formInstrumentPrimitiveFieldSchema, formInstrumentArrayFieldSchema])
);

const formInstrumentFieldsGroupSchema: ZodType<Types.FormInstrumentFieldsGroup> = z.object({
  description: instrumentUIOption(z.string()),
  fields: formInstrumentStaticFieldsSchema,
  title: instrumentUIOption(z.string())
});

const formInstrumentContentSchema: ZodType<Types.FormInstrumentContent> = z.union([
  formInstrumentStaticFieldsSchema,
  formInstrumentFieldsGroupSchema.array()
]);

export const formInstrumentSchema: ZodType<Types.FormInstrument> = z.object({
  content: formInstrumentContentSchema,
  details: z.object({
    description: instrumentUIOption(z.string()),
    estimatedDuration: z.number(),
    instructions: instrumentUIOption(z.union([z.string(), z.string().array()])),
    title: instrumentUIOption(z.string())
  }),
  kind: z.literal('form'),
  language: z.union([languageSchema, z.array(languageSchema)]),
  name: z.string(),
  tags: instrumentUIOption(z.string().array()),
  validationSchema: z.object({
    properties: z.record(z.any()),
    required: z.string().array(),
    type: z.literal('object')
  }),
  version: z.number()
});
