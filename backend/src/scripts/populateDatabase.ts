import { camelizeKeys } from 'humps';
import data from '../dummyData';
import MongoCandidate from '../mongo/models/Candidate';
import MongoJob from '../mongo/models/Job';

export default async () => {
  await MongoCandidate.deleteMany({});
  await MongoJob.deleteMany({});

  const { candidates, jobs } = data;

  candidates.forEach(({ id, city, experience, technologies }) => {
    MongoCandidate.create({
      id,
      city,
      experience: parseInt(experience.split('-')[0]),
      technologies: technologies.map((technology) => camelizeKeys(technology)),
    });
  });

  jobs.forEach(({ id, city, technologies, experience }) => {
    const [minExperience, maxExperience] = experience.split(' ')[0].split('-');
    MongoJob.create({
      id,
      city,
      minExperience,
      maxExperience,
      technologies,
    });
  });
};
