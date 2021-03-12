import MongoCandidateStore from '../../stores/MongoCandidateStore';
import CandidateService from '../CandidateService';

jest.mock('../../stores/MongoCandidateStore');

describe('services.CandidateService', () => {
  const store = new MongoCandidateStore();
  const service = new CandidateService({ store });

  describe('CandidateService.list', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      (store.list as jest.Mock).mockReturnValueOnce([]);
    });

    it('Calls store.list with the correct parameters', () => {
      const city = 'city';
      const technology = 'tech';
      const minExperience = 11;
      const limit = 3;
      service.list({
        city,
        technology,
        minExperience,
        limit,
      });
      expect(store.list).toHaveBeenCalledWith({
        city,
        technology,
        minExperience,
        limit,
      });
    });
  });
});
