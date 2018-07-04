import i18next from 'i18next';

i18next
  .init({
    interpolation: {
      // React already does escaping
      escapeValue: false,
    },
    lng: 'pt',
    // Using simple hardcoded resources for simple example
    resources: {
      en: {
        translation: {
          SUBMIT: "Submit"
        },
      },
      pt: {
        translation: {
          SUBMIT: "Enviar"
        },
      },
    },
  })

export default i18next