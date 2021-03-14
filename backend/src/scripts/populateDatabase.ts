import { camelizeKeys } from 'humps';
import data from '../dummyData';
import MongoCandidate from '../mongo/models/Candidate';
import MongoJob from '../mongo/models/Job';

export default async () => {
  await MongoCandidate.deleteMany({});
  await MongoJob.deleteMany({});

  const { candidates, jobs } = data;

  for (const { id, city, experience, technologies } of candidates) {
    await MongoCandidate.create({
      id,
      city,
      experience: parseInt(experience.split('-')[0]),
      technologies: technologies.map((technology) => camelizeKeys(technology)),
    });
  }

  for (const { id, city, technologies, experience } of jobs) {
    const [minExperience, maxExperience] = experience.split(' ')[0].split('-');
    await MongoJob.create({
      id,
      city: city !== 'Remote' ? city : '',
      isRemote: city === 'Remote',
      minExperience,
      maxExperience,
      technologies,
    });
  }
};
