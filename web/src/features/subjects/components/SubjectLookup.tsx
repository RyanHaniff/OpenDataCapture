import React from 'react';

import { Subject } from '@ddcp/types';
import { Modal } from '@douglasneuroinformatics/ui';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { IdentificationForm, IdentificationFormData } from '@/components';

type SubjectLookupProps = {
  show: boolean;
  onClose: () => void;
};

export const SubjectLookup = ({ show, onClose }: SubjectLookupProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const lookupSubject = (formData: IdentificationFormData) => {
    axios
      .post<Subject>('/v1/subjects/lookup', formData)
      .then(({ data: { identifier } }) => {
        navigate(identifier);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Modal open={show} title={t('viewSubjects.lookup.title')} onClose={onClose}>
      <div>
        <IdentificationForm fillActiveSubject onSubmit={lookupSubject} />
      </div>
    </Modal>
  );
};
