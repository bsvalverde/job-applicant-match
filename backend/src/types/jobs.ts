export default interface Job {
  city: string;
  remote: boolean;
  minExperience: number;
  maxExperience: number;
  technologies: string[];
}

export interface JobQuery {
  city?: string;
  remote?: boolean;
  experience?: number;
  technologies?: string[];
  limit?: number;
}

export interface JobStore {
  list: (filter: JobQuery) => Promise<Job[]>;
}
