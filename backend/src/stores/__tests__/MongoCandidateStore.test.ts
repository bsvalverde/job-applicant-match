import { normalizeString } from '../../utils/stringUtils';
import MongoCandidateStore from '../MongoCandidateStore';

describe('stores.MongoCandidateStore', () => {
  const store = new MongoCandidateStore();

  describe('MongoCandidateStore.mapQueryToFilter', () => {
    const city = 'city   ';
    const minExperience = 0;
    const maxExperience = 5;
    const technology1 = ' tECh1 ';
    const technology2 = '  teCh2';

    it('Returns a filter with the normalized city in a regex', () => {
      const filter = store.mapQueryToFilter({ city });
      expect(filter).toEqual({
        city: new RegExp(`^${normalizeString(city)}$`, 'i'),
      });
    });

    it('Returns a filter that requires experience to be at least the minimum', () => {
      const filter = store.mapQueryToFilter({ minExperience });
      expect(filter).toEqual({ experience: { $gte: minExperience } });
    });

    it('Returns a filter that requires experience to be no more than the maximum', () => {
      const filter = store.mapQueryToFilter({ maxExperience });
      expect(filter).toEqual({ experience: { $lte: maxExperience } });
    });

    it('Returns a filter with the normalized technologies in a regex array', () => {
      const filter = store.mapQueryToFilter({
        technologies: [technology1, technology2],
      });
      expect(filter).toEqual({
        'technologies.name': {
          $in: [
            new RegExp(`^${normalizeString(technology1)}$`, 'i'),
            new RegExp(`^${normalizeString(technology2)}$`, 'i'),
          ],
        },
      });
    });

    it('Returns an empty filter if no params are sent', () => {
      const filter = store.mapQueryToFilter({});
      expect(filter).toEqual({});
    });
  });
});
