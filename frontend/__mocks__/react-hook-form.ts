export const Controller = jest.requireActual('react-hook-form').Controller;

export const useFormContext = jest.fn(() => ({
  register: jest.fn(),
  watch: jest.fn(),
  errors: {},
}));
