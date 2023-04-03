import React from 'react';

import { Subject } from '@ddcp/common';
import { useTranslation } from 'react-i18next';

import { SubjectsTable } from '../components/SubjectsTable';

import { PageHeader, Spinner } from '@/components';
import { useFetch } from '@/hooks/useFetch';

export const ViewSubjectsPage = () => {
  const { data } = useFetch<Subject[]>('/subjects');
  const { t } = useTranslation('subjects');
  
  if (!data) {
    return <Spinner />;
  }

  return data ? (
    <div>
      <PageHeader title={t('viewSubjects.pageTitle')} />
      <SubjectsTable data={data} />
    </div>
  ) : null;
};
