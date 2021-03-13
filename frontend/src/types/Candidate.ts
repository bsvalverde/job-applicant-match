interface Technology {
  name: string;
  isMainTech: boolean;
}

export default interface Candidate {
  _id: string;
  city: string;
  experience: number;
  technologies: Technology[];
}
