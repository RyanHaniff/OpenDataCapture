import { transformTranslations } from '@douglasneuroinformatics/ui';
import type { Language } from '@open-data-capture/common/core';
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import type { EmptyObject, ValueOf } from 'type-fest';

type TranslatedResource<T = EmptyObject> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? T[K] extends Record<Language, unknown>
      ? ValueOf<T[K]>
      : TranslatedResource<T[K]>
    : T[K];
};

const defaultNS = 'translations';

const translations = {
  anonymous: {
    en: 'Anonymous',
    fr: 'Anonyme'
  },
  begin: {
    en: 'Begin',
    fr: 'Commencer'
  },
  description: {
    en: 'Description',
    fr: 'Description'
  },
  details: {
    en: 'Details',
    fr: 'Détails'
  },
  estimatedDuration: {
    en: 'Estimated Duration',
    fr: 'Durée estimée'
  },
  fullName: {
    en: 'Full Name',
    fr: 'Nom et prénom'
  },
  identificationData: {
    dateOfBirth: {
      label: {
        en: 'Date of Birth',
        fr: 'Date de naissance'
      }
    },
    firstName: {
      description: {
        en: "The subject's first name, as provided by their birth certificate.",
        fr: "Le prénom du sujet, tel qu'il figure dans son acte de naissance."
      },
      label: {
        en: 'First Name',
        fr: 'Prénom'
      }
    },
    lastName: {
      description: {
        en: "The subject's last name, as provided by their birth certificate.",
        fr: "Le nom de famille du sujet, tel qu'il figure dans son acte de naissance."
      },
      label: {
        en: 'Last Name',
        fr: 'Nom de famille'
      }
    },
    sex: {
      description: {
        en: "The subject's biological sex, as assigned at birth.",
        fr: "Le sexe biologique du sujet, tel qu'il a été assigné à la naissance."
      },
      female: {
        en: 'Female',
        fr: 'Féminin'
      },
      label: {
        en: 'Sex at Birth',
        fr: 'Sexe à la naissance'
      },
      male: {
        en: 'Male',
        fr: 'Masculin'
      }
    }
  },
  instructions: {
    en: 'Instructions',
    fr: 'Instructions'
  },
  instrument: {
    en: 'Instrument',
    fr: 'Instrument'
  },
  instrumentName: {
    en: 'Instrument Name',
    fr: "Nom de l'instrument"
  },
  language: {
    en: 'Language',
    fr: 'Langue'
  },
  languages: {
    english: {
      en: 'English',
      fr: 'Anglais'
    },
    french: {
      en: 'French',
      fr: 'Français'
    }
  },
  responses: {
    en: 'Responses',
    fr: 'Réponses'
  },
  steps: {
    overview: {
      en: 'Overview',
      fr: 'Aperçu'
    },
    questions: {
      en: 'Questions',
      fr: 'Questions'
    },
    summary: {
      en: 'Summary',
      fr: 'Résumé'
    }
  },
  subject: {
    en: 'Subject',
    fr: 'Client'
  },
  summary: {
    subtitle: {
      en: 'Completed on {{ dateCompleted }}',
      fr: 'Remplie le {{ dateCompleted }}'
    },
    title: {
      en: 'Summary of Results for the {{title}}',
      fr: '{{title}} : résumé des résultats'
    }
  },
  tag: {
    en: 'Tag',
    fr: 'Tag'
  },
  tags: {
    en: 'Tags',
    fr: 'Tags'
  },
  title: {
    en: 'Title',
    fr: 'Titre'
  },
  version: {
    en: 'Version',
    fr: 'Version'
  }
};

const resources = {
  en: {
    translations: transformTranslations(translations, 'en') as TranslatedResource<typeof translations>
  },
  fr: {
    translations: transformTranslations(translations, 'fr') as TranslatedResource<typeof translations>
  }
} as const;

const i18n = createInstance({
  defaultNS,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  },
  resources,
  returnObjects: true,
  supportedLngs: ['en', 'fr']
});

void i18n.use(initReactI18next).init();

export { type TranslatedResource, defaultNS, i18n as default, resources };
