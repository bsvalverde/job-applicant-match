import Candidate, { CandidateStore } from '../types/candidates';

interface CandidateServiceConstructor {
  store: CandidateStore;
}

export default class CandidateService {
  private store: CandidateStore;

  constructor({ store }: CandidateServiceConstructor) {
    this.store = store;
  }

  async list(): Promise<Candidate[]> {
    return this.store.list();
  }
}
