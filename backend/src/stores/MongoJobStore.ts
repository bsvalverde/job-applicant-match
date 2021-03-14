import { FilterQuery } from 'mongoose';
import MongoJob from '../mongo/models/Job';
import Job, { JobQuery, JobStore } from '../types/jobs';
import { normalizeString } from '../utils/stringUtils';

export default class MongoJobStore implements JobStore {
  async list({ limit, ...query }: JobQuery): Promise<Job[]> {
    return MongoJob.find({
      active: true,
      ...this.mapQueryToFilter(query),
    }).limit(limit || 0);
  }

  mapQueryToFilter({
    city,
    remote,
    experience,
    technologies,
  }: JobQuery): FilterQuery<Job> {
    const filter: FilterQuery<Job> = {};

    if (city) {
      filter.city = new RegExp(`^${normalizeString(city)}$`, 'i');
    }

    if (typeof remote === 'boolean') {
      filter.remote = remote;
    }

    if (Number.isInteger(experience)) {
      filter.minExperience = { $lte: experience };
      filter.maxExperience = { $gte: experience };
    }

    if (technologies) {
      filter.technologies = {
        $in: technologies.map(
          (technology) => new RegExp(`^${normalizeString(technology)}$`, 'i'),
        ),
      };
    }

    return filter;
  }
}
