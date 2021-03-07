import { camelizeKeys } from 'humps';
import s3 from '../s3';
import Candidate, { CandidateStore } from '../types/candidates';

export default class S3CandidateStore implements CandidateStore {
  async list(): Promise<Candidate[]> {
    try {
      const {
        data: { candidates },
      } = await s3.get('');

      return candidates.map((candidate: Candidate) => camelizeKeys(candidate));
    } catch (e) {
      throw e;
    }
  }
}
