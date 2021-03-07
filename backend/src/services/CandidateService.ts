import Candidate, { CandidateQuery, CandidateStore } from '../types/candidates';
import Experience from '../types/experience';

interface CandidateServiceConstructor {
  store: CandidateStore;
}

export default class CandidateService {
  private store: CandidateStore;

  constructor({ store }: CandidateServiceConstructor) {
    this.store = store;
  }

  getExperienceFilter(
    minExperience?: number,
    maxExperience?: number,
  ): Experience[] {
    const experience = Object.values(Experience);

    let minExperienceIndex = 0;
    if (minExperience && minExperience > 0) {
      minExperienceIndex = Math.min(minExperience, experience.length - 1);
    }
    let maxExperienceIndex;
    if (maxExperience && maxExperience > 0) {
      maxExperienceIndex =
        minExperienceIndex === maxExperience
          ? minExperienceIndex + 1
          : maxExperience;
    }

    return experience.slice(minExperienceIndex, maxExperienceIndex);
  }

  async list({
    limit,
    maxExperience,
    minExperience,
  }: CandidateQuery): Promise<Candidate[]> {
    let experience;
    if (maxExperience || minExperience) {
      experience = this.getExperienceFilter(minExperience, maxExperience);
    }
    return this.store.list({ experience, limit });
  }
}
