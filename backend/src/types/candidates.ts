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
  limit?: number;
  minExperience?: number;
  maxExperience?: number;
}

export interface CandidateFilter {
  experience?: Experience[];
  limit?: number;
}

export interface CandidateStore {
  list: (filter: CandidateFilter) => Promise<Candidate[]>;
}
