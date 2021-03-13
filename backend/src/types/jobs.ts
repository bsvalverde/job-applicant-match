export default interface Job {
  city: string;
  minExperience: number;
  maxExperience: number;
  technologies: string[];
}

export interface JobQuery {
  city?: string;
  experience?: number;
  technologies?: string[];
  limit?: number;
}

export interface JobStore {
  list: (filter: JobQuery) => Promise<Job[]>;
}
