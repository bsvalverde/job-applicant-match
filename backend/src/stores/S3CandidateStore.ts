import { camelizeKeys } from 'humps';
import s3 from '../s3';
import Candidate, {
  CandidateFilter,
  CandidateStore
} from '../types/candidates';

export default class S3CandidateStore implements CandidateStore {
  async list({ experience, limit }: CandidateFilter): Promise<Candidate[]> {
    try {
      let {
        data: { candidates },
      } = await s3.get('');

      if (experience) {
        candidates = candidates.filter((candidate: Candidate) =>
          experience.includes(candidate.experience),
        );
      }

      if (limit) {
        candidates = candidates.slice(0, limit);
      }

      return candidates.map((candidate: Candidate) => camelizeKeys(candidate));
    } catch (e) {
      throw e;
    }
  }
}
