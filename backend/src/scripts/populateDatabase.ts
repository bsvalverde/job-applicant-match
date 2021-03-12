import data from '../dummyData';
import MongoCandidate from '../mongo/models/Candidate';

export default () => {
  MongoCandidate.deleteMany({});

  const { candidates } = data;

  candidates.forEach(({ id, city, experience, technologies }) => {
    const mappedExperience = parseInt(experience.split('-')[0]);
    MongoCandidate.create({
      id,
      city,
      experience: mappedExperience,
      technologies,
    });
  });
};
