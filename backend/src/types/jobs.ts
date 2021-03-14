export default interface Job {
  city: string;
  isRemote: boolean;
  minExperience: number;
  maxExperience: number;
  technologies: string[];
}

export interface JobQuery {
  city?: string;
  isRemote?: boolean;
  experience?: number;
  technologies?: string[];
  limit?: number;
}

export interface JobStore {
  list: (filter: JobQuery) => Promise<Job[]>;
}
