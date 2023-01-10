import { useActionData } from 'react-router-dom';
import { ZodType } from 'zod';

export default function useFormData<T>(schema: ZodType<T>) {
  const actionData = useActionData();
  return actionData ? schema.safeParse(actionData) : null;
}
