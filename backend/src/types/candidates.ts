enum Experience {
  zeroToOne = '0-1 years',
  oneToTwo = '1-2 years',
  twoToThree = '2-3 years',
  threeToFour = '3-4 years',
  fourToFive = '4-5 years',
  fiveToSix = '5-6 years',
  sixToSeven = '6-7 years',
  sevenToEight = '7-8 years',
  eightToNine = '8-9 years',
  nineToTen = '9-10 years',
  tenToEleven = '10-11 years',
  elevenToTwelve = '11-12 years',
  twelvePlus = '12+ years',
}

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

export interface CandidateStore {
  list: () => Promise<Candidate[]>;
}
