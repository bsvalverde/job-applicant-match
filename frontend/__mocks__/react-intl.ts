export const FormattedMessage = jest.requireActual('react-intl').FormattedMessage;

const intl = {
  formatMessage: jest.fn(({ id }) => id),
};

export const useIntl = jest.fn(() => intl);
