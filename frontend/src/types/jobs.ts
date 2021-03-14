export default interface Job {
  _id: string;
  city: string;
  isRemote: boolean;
  minExperience: number;
  maxExperience: number;
  technologies: string[];
}
