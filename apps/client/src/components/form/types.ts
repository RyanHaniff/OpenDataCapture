import { DateFieldProps } from './DateField';
import { SelectFieldProps } from './SelectField';
import { TextFieldProps } from './TextField';

type FormFieldType<T extends string> =
  | Omit<TextFieldProps, 'name'>
  | Omit<SelectFieldProps<T>, 'name'>
  | Omit<DateFieldProps, 'name'>;

export interface BaseFieldProps {
  name: string;
  label: string;
}

export type FormFieldValue = string;

export interface FormDataType {
  [key: string]: FormFieldValue;
}

export type FormFields<T extends FormDataType> = {
  [K in keyof T]?: FormFieldType<T[K]>;
};

export type FormStructure<T extends FormDataType = FormDataType> = Array<{
  title?: string;
  fields: FormFields<T>;
}>;
