import MongoCandidateStore from '../MongoCandidateStore';

describe('stores.MongoCandidateStore', () => {
  const store = new MongoCandidateStore();

  describe('MongoCandidateStore.mapQueryToFilter', () => {
    const city = 'city   ';
    const technology = '  tech ';
    const minExperience = 0;
    const maxExperience = 5;

    it('Returns a filter with the trimmed city in a regex', () => {
      const filter = store.mapQueryToFilter({ city });
      expect(filter).toEqual({ city: new RegExp(`^${city.trim()}$`, 'i') });
    });

    it('Returns a filter with the trimmed technology in a regex', () => {
      const filter = store.mapQueryToFilter({ technology });
      expect(filter).toEqual({
        'technologies.name': new RegExp(`^${technology.trim()}$`, 'i'),
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

    it('Returns an empty filter if no params are sent', () => {
      const filter = store.mapQueryToFilter({});
      expect(filter).toEqual({});
    })
  });
});
