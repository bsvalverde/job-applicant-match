import MongoCandidateStore from '../../stores/MongoCandidateStore';
import CandidateService from '../CandidateService';

jest.mock('../../stores/MongoCandidateStore');

describe('services.CandidateService', () => {
  const store = new MongoCandidateStore();
  const service = new CandidateService({ store });

  describe('CandidateService.list', () => {
    const query = {
      city: 'city',
      minExperience: 11,
      technologies: ['tech'],
      limit: 3,
    };

    beforeEach(() => {
      jest.clearAllMocks();
      (store.list as jest.Mock).mockReturnValueOnce([]);
    });

    it('Calls store.list with the correct parameters', () => {
      service.list(query);
      expect(store.list).toHaveBeenCalledWith(query);
    });
  });

  describe('CandidateStore.match', () => {
    const candidate1 = {
      city: 'city1',
      experience: 2,
      technologies: [
        { name: 'tech1', isMainTech: true },
        { name: 'tech2', isMainTech: true },
        { name: 'tech3', isMainTech: false },
      ],
    };
    const candidate2 = {
      city: 'city2',
      experience: 4,
      technologies: [
        { name: 'tech1', isMainTech: false },
        { name: 'tech2', isMainTech: false },
        { name: 'tech3', isMainTech: true },
      ],
    };
    const candidate3 = {
      city: 'city3',
      experience: 6,
      technologies: [
        { name: 'tech1', isMainTech: false },
        { name: 'tech2', isMainTech: true },
      ],
    };
    const query = {
      city: '',
      minExperience: 3,
      maxExperience: 4,
      technologies: ['tech2', 'tech3'],
    };

    beforeEach(() => {
      jest.clearAllMocks();
      (store.list as jest.Mock).mockReturnValueOnce([
        candidate1,
        candidate2,
        candidate3,
      ]);
    });

    it('Calls store.list with no parameters', async () => {
      await service.match(query);
      expect(store.list).toHaveBeenCalledWith({});
    });

    it('Calls service.getScore once for each candidate', async () => {
      const getScoreSpy = jest.spyOn(service, 'getScore');
      await service.match(query);
      expect(getScoreSpy).toHaveBeenCalled();
      getScoreSpy.mockRestore();
    });

    it('Returns the candidates in the correct order', async () => {
      const candidates = await service.match(query);
      expect(candidates).toEqual([candidate2, candidate1, candidate3]);
    });
  });

  describe('CandidateStore.getScore', () => {
    const candidate = {
      city: 'city',
      experience: 4,
      technologies: [
        { name: 'tech1', isMainTech: true },
        { name: 'tech2', isMainTech: true },
        { name: 'tech3', isMainTech: false },
      ],
    };

    it('Gives two points if the city is the same', () => {
      const score = service.getScore({
        candidate,
        query: { city: '  cITy' },
      });
      expect(score).toBe(2);
    });

    it('Gives no points if the city is different', () => {
      const score = service.getScore({
        candidate,
        query: { city: 'anotherCity' },
      });
      expect(score).toBe(0);
    });

    it("Gives a point if the minExperience is lower than or equal to the candidate's experience", () => {
      const score = service.getScore({
        candidate,
        query: { minExperience: 4 },
      });
      expect(score).toBe(1);
    });

    it("Gives no points if minExperience is higher than the candidate's experience", () => {
      const score = service.getScore({
        candidate,
        query: { minExperience: 6 },
      });
      expect(score).toBe(0);
    });

    it("Gives a point if the maxExperience is highet than or equal to the candidate's experience", () => {
      const score = service.getScore({
        candidate,
        query: { maxExperience: 4 },
      });
      expect(score).toBe(1);
    });

    it("Gives no points if maxExperience is lower than the candidate's experience", () => {
      const score = service.getScore({
        candidate,
        query: { maxExperience: 2 },
      });
      expect(score).toBe(0);
    });

    it('Gives a point for each non main technology the candidate knows', () => {
      const score = service.getScore({
        candidate,
        query: { technologies: ['tech3 '] },
      });
      expect(score).toBe(1);
    });

    it('Gives two points for each main technology the candidate knows', () => {
      const score = service.getScore({
        candidate,
        query: { technologies: ['  tech1', 'TECH2'] },
      });
      expect(score).toBe(4);
    });

    it("Gives no points if the candidate doesn't know any of the desired technologies", () => {
      const score = service.getScore({
        candidate,
        query: { technologies: ['someOtherTech', 'andEvenOneMore'] },
      });
      expect(score).toBe(0);
    });
  });
});
