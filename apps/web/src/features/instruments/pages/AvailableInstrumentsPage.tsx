import { useEffect, useState } from 'react';

import {
  SearchBar,
  SelectDropdown,
  type SelectOption,
  Spinner,
  useNotificationsStore
} from '@douglasneuroinformatics/ui';
import type { Language } from '@open-data-capture/common/core';
import type { FormInstrument, InstrumentSummary } from '@open-data-capture/common/instrument';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { PageHeader } from '@/components/PageHeader';
import { useAvailableForms } from '@/hooks/useAvailableForms';
import { useActiveVisitStore } from '@/stores/active-visit-store';

import { InstrumentCard } from '../components/InstrumentCard';

export const AvailableInstrumentsPage = () => {
  const forms = useAvailableForms();
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'instruments']);
  const [filteredInstruments, setFilteredInstruments] = useState<InstrumentSummary<FormInstrument, Language>[]>([]);
  const [tagOptions, setTagOptions] = useState<SelectOption[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<SelectOption[]>([]);
  const [selectedTags, setSelectedTags] = useState<SelectOption[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { activeVisit } = useActiveVisitStore();
  const notifications = useNotificationsStore();

  const languageOptions = [
    {
      key: 'en',
      label: t('languages.english')
    },
    {
      key: 'fr',
      label: t('languages.french')
    }
  ];

  useEffect(() => {
    if (forms.data) {
      setFilteredInstruments(
        forms.data.filter((instrument) => {
          const matchesSearch = instrument.details.title.toUpperCase().includes(searchTerm.toUpperCase());
          const matchesLanguages =
            selectedLanguages.length === 0 || selectedLanguages.find(({ key }) => key === instrument.language);
          const matchesTags =
            selectedTags.length === 0 || instrument.tags.some((tag) => selectedTags.find(({ key }) => key === tag));
          return matchesSearch && matchesLanguages && matchesTags;
        })
      );
    }
  }, [forms.data, searchTerm, selectedLanguages, selectedTags]);

  useEffect(() => {
    setTagOptions(
      Array.from(new Set(filteredInstruments.flatMap((item) => item.tags))).map((item) => ({
        key: item,
        label: item
      }))
    );
  }, [filteredInstruments]);

  if (!forms.data) {
    return <Spinner />;
  }

  return (
    <div>
      <PageHeader title={t('instruments:available.title')} />
      <div>
        <div className="my-5 flex flex-col justify-between gap-5 lg:flex-row">
          <SearchBar
            size="md"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <div className="flex flex-grow gap-2 lg:flex-shrink">
            <div className="flex flex-grow" data-cy="tags-btn-dropdown">
              <SelectDropdown
                options={tagOptions}
                selected={selectedTags}
                setSelected={setSelectedTags}
                title={t('tags')}
              />
            </div>
            <div className="flex flex-grow" data-cy="language-btn-dropdown">
              <SelectDropdown
                options={languageOptions}
                selected={selectedLanguages}
                setSelected={setSelectedLanguages}
                title={t('language')}
              />
            </div>
          </div>
        </div>
        <div className="relative grid grid-cols-1 gap-5">
          {filteredInstruments.map((instrument, i) => {
            return (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 80 }}
                initial={{ opacity: 0, y: 80 }}
                key={instrument.id}
                transition={{ bounce: 0.2, delay: 0.15 * i, duration: 1.2, type: 'spring' }}
              >
                <InstrumentCard
                  instrument={instrument}
                  onClick={() => {
                    if (activeVisit) {
                      navigate(`/instruments/forms/${instrument.id!}`);
                    } else {
                      notifications.addNotification({
                        message: t('instruments:available.nullActiveVisitError'),
                        type: 'info'
                      });
                    }
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
