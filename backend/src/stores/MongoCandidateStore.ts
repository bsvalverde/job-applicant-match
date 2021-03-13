import { FilterQuery } from 'mongoose';
import MongoCandidate from '../mongo/models/Candidate';
import Candidate, { CandidateQuery, CandidateStore } from '../types/candidates';

export default class MongoCandidateStore implements CandidateStore {
  async list({ limit, ...query }: CandidateQuery): Promise<Candidate[]> {
    return MongoCandidate.find({
      active: true,
      ...this.mapQueryToFilter(query),
    }).limit(limit || 0);
  }

  mapQueryToFilter({
    city,
    minExperience,
    maxExperience,
    technologies,
  }: CandidateQuery): FilterQuery<Candidate> {
    const filter: FilterQuery<Candidate> = {};

    if (city) {
      filter.city = new RegExp(`^${city.trim()}$`, 'i');
    }

    if (Number.isInteger(minExperience) || Number.isInteger(maxExperience)) {
      filter.experience = {};
      if (Number.isInteger(minExperience)) {
        filter.experience.$gte = minExperience;
      }
      if (Number.isInteger(maxExperience)) {
        filter.experience.$lte = maxExperience;
      }
    }

    if (technologies) {
      const techArray = Array.isArray(technologies)
        ? technologies
        : [technologies];
      filter['technologies.name'] = {
        $in: techArray.map(
          (technology) => new RegExp(`^${technology.trim()}$`, 'i'),
        ),
      };
    }

    return filter;
  }
}
