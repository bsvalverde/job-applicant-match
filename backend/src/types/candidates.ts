import Experience from './experience';

interface Technology {
  name: string;
  isMainTech: boolean;
}

export default interface Candidate {
  id: string;
  city: string;
  experience: Experience;
  technologies: Technology[];
}

export interface CandidateQuery {
  city?: string;
  technology?: string;
  minExperience?: number;
  maxExperience?: number;
  limit?: number;
}

export interface CandidateFilter {
  city?: string;
  technology?: string;
  experience?: Experience[];
  limit?: number;
}

export interface CandidateStore {
  list: (filter: CandidateFilter) => Promise<Candidate[]>;
}
