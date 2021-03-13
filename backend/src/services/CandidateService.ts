import Candidate, { CandidateQuery, CandidateStore } from '../types/candidates';
import { normalizeString } from '../utils/stringUtils';

interface CandidateServiceConstructor {
  store: CandidateStore;
}

export default class CandidateService {
  private store: CandidateStore;

  constructor({ store }: CandidateServiceConstructor) {
    this.store = store;
  }

  async list(query: CandidateQuery): Promise<Candidate[]> {
    return this.store.list(query);
  }

  async match(query: CandidateQuery): Promise<Candidate[]> {
    const candidates = await this.store.list({});

    const candidatesWithScore = candidates.map((candidate) => ({
      candidate,
      score: this.getScore({ candidate, query }),
    }));
    candidatesWithScore.sort((a, b) => b.score - a.score);

    return candidatesWithScore
      .map(({ candidate }) => candidate)
      .slice(0, query.limit || Infinity);
  }

  getScore({
    candidate,
    query: { city, minExperience, maxExperience, technologies },
  }: {
    candidate: Candidate;
    query: CandidateQuery;
  }): number {
    let score = 0;

    if (city && normalizeString(city) === normalizeString(candidate.city)) {
      score += 2;
    }

    if (minExperience && minExperience <= candidate.experience) {
      score += 1;
    }

    if (maxExperience && maxExperience >= candidate.experience) {
      score += 1;
    }

    if (technologies) {
      const techArray = (Array.isArray(technologies)
        ? technologies
        : [technologies]
      ).map((technology) => normalizeString(technology));
      candidate.technologies.forEach(({ name, isMainTech }) => {
        if (techArray.includes(normalizeString(name))) {
          score += 1;
          if (isMainTech) {
            score += 1;
          }
        }
      });
    }

    return score;
  }
}
