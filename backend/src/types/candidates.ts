interface Technology {
  name: string;
  isMainTech: boolean;
}

export default interface Candidate {
  city: string;
  experience: number;
  technologies: Technology[];
}

export interface CandidateQuery {
  city?: string;
  minExperience?: number;
  maxExperience?: number;
  technologies?: string | string[];
  limit?: number;
}

export interface CandidateStore {
  list: (filter: CandidateQuery) => Promise<Candidate[]>;
}
