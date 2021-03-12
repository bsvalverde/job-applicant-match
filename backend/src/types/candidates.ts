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
  technology?: string;
  minExperience?: number;
  maxExperience?: number;
  limit?: number;
}

export interface CandidateStore {
  list: (filter: CandidateQuery) => Promise<Candidate[]>;
}
