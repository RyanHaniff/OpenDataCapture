/* eslint-disable perfectionist/sort-objects */
import { Form } from '@douglasneuroinformatics/ui';
import type { SubjectIdentificationData } from '@open-data-capture/types';
import { useTranslation } from 'react-i18next';

import { useActiveSubjectStore } from '@/stores/active-subject-store';

export type IdentificationFormProps = {
  /** Whether to prefill the form with the active subject, if one exists  */
  fillActiveSubject?: boolean;

  /** Callback function invoked when validation is successful */
  onSubmit: (data: SubjectIdentificationData) => void;

  /** Optional override for the default submit button label */
  submitBtnLabel?: string;
};

export const IdentificationForm = ({ fillActiveSubject, onSubmit, submitBtnLabel }: IdentificationFormProps) => {
  const { activeSubject } = useActiveSubjectStore();
  const { t } = useTranslation(['common', 'translations']);

  return (
    <Form<SubjectIdentificationData>
      content={{
        firstName: {
          description: t('common:identificationData.firstName.description'),
          kind: 'text',
          label: t('common:identificationData.firstName.label'),
          variant: 'short'
        },
        lastName: {
          description: t('common:identificationData.lastName.description'),
          kind: 'text',
          label: t('common:identificationData.lastName.label'),
          variant: 'short'
        },
        dateOfBirth: {
          kind: 'date',
          label: t('common:identificationData.dateOfBirth.label')
        },
        sex: {
          description: t('common:identificationData.sex.description'),
          kind: 'options',
          label: t('common:identificationData.sex.label'),
          options: {
            female: t('sex.female'),
            male: t('sex.male')
          }
        }
      }}
      initialValues={fillActiveSubject ? activeSubject : undefined}
      resetBtn={fillActiveSubject}
      submitBtnLabel={submitBtnLabel ?? t('submit')}
      validationSchema={{
        additionalProperties: false,
        errorMessage: {
          properties: {
            dateOfBirth: t('form.errors.required'),
            firstName: t('form.errors.required'),
            lastName: t('form.errors.required'),
            sex: t('form.errors.required')
          }
        },
        properties: {
          dateOfBirth: {
            format: 'date',
            type: 'string'
          },
          firstName: {
            minLength: 1,
            type: 'string'
          },
          lastName: {
            minLength: 1,
            type: 'string'
          },
          sex: {
            enum: ['male', 'female'],
            type: 'string'
          }
        },
        required: ['firstName', 'lastName', 'sex', 'dateOfBirth'],
        type: 'object'
      }}
      onSubmit={onSubmit}
    />
  );
};

export type { IdentificationFormData };
