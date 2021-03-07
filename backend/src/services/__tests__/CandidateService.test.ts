import S3CandidateStore from '../../stores/S3CandidateStore';
import Experience from '../../types/experience';
import CandidateService from '../CandidateService';

jest.mock('../../stores/S3CandidateStore');

describe('services.CandidateService', () => {
  const store = new S3CandidateStore();
  const service = new CandidateService({ store });

  describe('CandidateService.getExperienceFilter', () => {
    it('Returns all the experience values above the minimum experience provided', () => {
      const experience = service.getExperienceFilter(7);
      expect(experience).toEqual([
        Experience.sevenToEight,
        Experience.eightToNine,
        Experience.nineToTen,
        Experience.tenToEleven,
        Experience.elevenToTwelve,
        Experience.twelvePlus,
      ]);
    });

    it('Returns all the experience values below the maximum experience provided', () => {
      const experience = service.getExperienceFilter(undefined, 3);
      expect(experience).toEqual([
        Experience.zeroToOne,
        Experience.oneToTwo,
        Experience.twoToThree,
      ]);
    });

    it('Returns all the experience values between the minimum and maximum experience provided', () => {
      const experience = service.getExperienceFilter(8, 11);
      expect(experience).toEqual([
        Experience.eightToNine,
        Experience.nineToTen,
        Experience.tenToEleven,
      ]);
    });

    it('Returns at least one value if minimum and maximum experience are the same number', () => {
      const experience = service.getExperienceFilter(4, 4);
      expect(experience).toEqual([Experience.fourToFive]);
    });

    it('Returns nothing if maximum experience is lower than the minimum', () => {
      const experience = service.getExperienceFilter(5, 3);
      expect(experience).toEqual([]);
    });

    it('Disregards negative values', () => {
      const experience = service.getExperienceFilter(-1, -1);
      expect(experience).toEqual(Object.values(Experience));
    });
  });

  describe('CandidateService.list', () => {
    let getExperienceFilterSpy: jest.SpyInstance;

    beforeAll(() => {
      getExperienceFilterSpy = jest.spyOn(service, 'getExperienceFilter');
    });

    beforeEach(() => {
      jest.clearAllMocks();
      (store.list as jest.Mock).mockReturnValueOnce([]);
    });

    it('Calls getExperienceFilter if there is either a minimum or maximum experience', () => {
      service.list({ minExperience: 3 });
      expect(getExperienceFilterSpy).toHaveBeenCalled();
    });

    it('Does not call getExperienceFilter if there is neither a minimum nor maximum experience', () => {
      service.list({});
      expect(getExperienceFilterSpy).not.toHaveBeenCalled();
    });

    it('Calls store.list with the correct parameters', () => {
      const minExperience = 11;
      const limit = 3;
      service.list({
        minExperience,
        limit,
      });
      expect(store.list).toHaveBeenCalledWith({
        experience: [Experience.elevenToTwelve, Experience.twelvePlus],
        limit,
      });
    });
  });
});
