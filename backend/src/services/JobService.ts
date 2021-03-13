import Job, { JobQuery, JobStore } from '../types/Jobs';

interface JobServiceConstructor {
  store: JobStore;
}

export default class JobService {
  private store: JobStore;

  constructor({ store }: JobServiceConstructor) {
    this.store = store;
  }

  async list(query: JobQuery): Promise<Job[]> {
    return this.store.list(query);
  }
}
