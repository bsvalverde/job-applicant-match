const formats = {
  date: {
    full: {
      en: {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      },
      es: {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      },
      pt: {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      },
    },
    short: {
      pt: { day: '2-digit', month: '2-digit', year: '2-digit' },
      en: { day: '2-digit', month: '2-digit', year: '2-digit' },
      es: { day: '2-digit', month: '2-digit', year: '2-digit' },
    },
    dayAndMonth: {
      pt: { day: 'numeric', month: 'numeric' },
      en: { day: 'numeric', month: 'numeric' },
      es: { day: 'numeric', month: 'numeric' },
    },
  },
  time: {
    hour: {
      pt: { hour: 'numeric' },
      en: { hour: 'numeric' },
      es: { hour: 'numeric' },
    },
  },
};

export default formats;
