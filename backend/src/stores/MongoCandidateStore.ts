import { FilterQuery } from 'mongoose';
import MongoCandidate from '../mongo/models/Candidate';
import Candidate, { CandidateQuery, CandidateStore } from '../types/candidates';

export default class MongoCandidateStore implements CandidateStore {
  async list({ limit, ...query }: CandidateQuery): Promise<Candidate[]> {
    return MongoCandidate.find({
      active: true,
      ...this.mapQueryToFilter(query),
    }).limit(limit || Infinity);
  }

  mapQueryToFilter({
    city,
    technology,
    minExperience,
    maxExperience,
  }: CandidateQuery): FilterQuery<Candidate> {
    const filter: FilterQuery<Candidate> = {};

    if (city) {
      filter.city = new RegExp(`^${city.trim()}$`, 'i');
    }

    if (technology) {
      filter['technologies.name'] = new RegExp(`^${technology.trim()}$`, 'i');
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

    return filter;
  }
}
