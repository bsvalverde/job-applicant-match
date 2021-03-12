import S3CandidateStore from '../../stores/S3CandidateStore';
import Experience from '../../types/experience';
import CandidateService from '../CandidateService';

jest.mock('../../stores/S3CandidateStore');

describe('services.CandidateService', () => {
  const store = new S3CandidateStore();
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
        experience: [Experience.elevenToTwelve, Experience.twelvePlus],
        limit,
      });
    });
  });
});
