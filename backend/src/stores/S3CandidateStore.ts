import { camelizeKeys } from 'humps';
import s3 from '../s3';
import Candidate, {
  CandidateFilter,
  CandidateStore
} from '../types/candidates';

export default class S3CandidateStore implements CandidateStore {
  async list({
    city,
    technology,
    experience,
    limit,
  }: CandidateFilter): Promise<Candidate[]> {
    try {
      let {
        data: { candidates },
      } = await s3.get('');

      if (city || technology || experience) {
        candidates = candidates.filter((candidate: Candidate) => {
          if (
            city &&
            city.toLowerCase().trim() !== candidate.city.toLowerCase().trim()
          ) {
            return false;
          }
          if (
            technology &&
            !candidate.technologies
              .map(({ name }) => name.toLowerCase().trim())
              .includes(technology.toLowerCase().trim())
          ) {
            return false;
          }
          if (experience && !experience.includes(candidate.experience)) {
            return false;
          }
          return true;
        });
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
