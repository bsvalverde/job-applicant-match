import { camelizeKeys } from 'humps';
import data from '../dummyData';
import MongoCandidate from '../mongo/models/Candidate';

export default async () => {
  await MongoCandidate.deleteMany({});

  const { candidates } = data;

  candidates.forEach(({ id, city, experience, technologies }) => {
    MongoCandidate.create({
      id,
      city,
      experience: parseInt(experience.split('-')[0]),
      technologies: technologies.map((technology) => camelizeKeys(technology)),
    });
  });
};
