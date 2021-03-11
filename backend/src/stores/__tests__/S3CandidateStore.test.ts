import s3 from '../../s3';
import Experience from '../../types/experience';
import S3CandidateStore from '../S3CandidateStore';

jest.mock('../../s3');

describe('stores.S3CandidateStore', () => {
  const store = new S3CandidateStore();

  describe('S3CandidateStore.list', () => {
    const candidate1 = {
      id: '1',
      city: 'city1   ',
      experience: Experience.oneToTwo,
      technologies: [
        {
          name: 'tech1',
          isMainTech: true,
        },
      ],
    };
    const candidate2 = {
      id: '2',
      city: 'city2',
      experience: Experience.sevenToEight,
      technologies: [
        {
          name: ' tech2',
          isMainTech: true,
        },
      ],
    };
    const candidate3 = {
      id: '3',
      city: '  city1',
      experience: Experience.twelvePlus,
      technologies: [
        {
          name: 'tech2',
          isMainTech: true,
        },
      ],
    };
    const dummyData = {
      data: {
        candidates: [candidate1, candidate2, candidate3],
        jobs: 'someJobs',
        somethingElse: 'some data',
        somethingRandom: 'some random info',
      },
    };

    beforeEach(() => {
      (s3.get as jest.Mock).mockReturnValueOnce(dummyData);
    });

    it('Returns only the candidates', async () => {
      const candidates = await store.list({});
      expect(candidates).toEqual(dummyData.data.candidates);
    });

    it('Returns only candidates from the desired city ignoring casing and extra spacings', async () => {
      const candidates = await store.list({
        city: 'cITy1   ',
      });
      expect(candidates).toEqual([candidate1, candidate3]);
    });

    it('Returns only candidates that have the desired technology ignoring casing and extra spacings', async () => {
      const candidates = await store.list({
        technology: '  teCH2  ',
      });
      expect(candidates).toEqual([candidate2, candidate3]);
    });

    it('Returns only candidates that have the desired experience', async () => {
      const candidates = await store.list({
        experience: [
          Experience.sevenToEight,
          Experience.eightToNine,
          Experience.nineToTen,
          Experience.tenToEleven,
          Experience.elevenToTwelve,
          Experience.twelvePlus,
        ],
      });
      expect(candidates).toEqual([candidate2, candidate3]);
    });

    it('Returns at most the number of candidates defined by the provided limit', async () => {
      const candidates = await store.list({ limit: 1 });
      expect(candidates).toEqual([candidate1]);
    });
  });
});
