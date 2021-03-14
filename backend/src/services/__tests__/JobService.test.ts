import MongoJobStore from '../../stores/MongoJobStore';
import JobService from '../JobService';

jest.mock('../../stores/MongoJobStore');

describe('services.JobService', () => {
  const store = new MongoJobStore();
  const service = new JobService({ store });

  describe('JobService.list', () => {
    const query = {
      city: 'city',
      experience: 11,
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
});
