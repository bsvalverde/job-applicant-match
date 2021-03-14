import { normalizeString } from '../../utils/stringUtils';
import MongoJobStore from '../MongoJobStore';

describe('stores.MongoJobStore', () => {
  const store = new MongoJobStore();

  describe('MongoJobStore.mapQueryToFilter', () => {
    const city = 'city   ';
    const isRemote = false;
    const experience = 0;
    const technology1 = ' tech1 ';
    const technology2 = '  tech2';

    it('Returns a filter with the normalized city in a regex', () => {
      const filter = store.mapQueryToFilter({ city });
      expect(filter).toEqual({
        city: new RegExp(`^${normalizeString(city)}$`, 'i'),
      });
    });

    it('Returns a filter with the correct isRemote requirement', () => {
      const filter = store.mapQueryToFilter({ isRemote });
      expect(filter).toEqual({
        isRemote,
      });
    });

    it('Returns a filter that requires minExperience to be at least the provided experiente', () => {
      const filter = store.mapQueryToFilter({ experience });
      expect(filter).toHaveProperty('minExperience', { $lte: experience });
    });

    it('Returns a filter that requires experience to be no more than the maximum', () => {
      const filter = store.mapQueryToFilter({ experience });
      expect(filter).toHaveProperty('maxExperience', { $gte: experience });
    });

    it('Returns a filter with the normalized technologies in a regex array', () => {
      const filter = store.mapQueryToFilter({
        technologies: [technology1, technology2],
      });
      expect(filter).toEqual({
        technologies: {
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
