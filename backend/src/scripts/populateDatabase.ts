import { camelizeKeys } from 'humps';
import data from '../dummyData';
import MongoCandidate from '../mongo/models/Candidate';

export default async () => {
  await MongoCandidate.deleteMany({});

  const { candidates } = data;

  candidates.forEach(({ id, city, experience, technologies }) => {
    const mappedExperience = parseInt(experience.split('-')[0]);
    MongoCandidate.create({
      id,
      city,
      experience: mappedExperience,
      technologies: technologies.map((technology) => camelizeKeys(technology)),
    });
  });
};
