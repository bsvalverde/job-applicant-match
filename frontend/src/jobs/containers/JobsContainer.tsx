import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../api';
import Job from '../../types/jobs';
import JobList from '../components/JobList';

const JobsContainer = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const history = useHistory();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError('');
      try {
        const { data: jobs } = await api.get('/jobs');
        setJobs(jobs);
      } catch (e) {
        setJobs([]);
        setError('genericError');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const seeJobMatches = ({
    city,
    minExperience,
    maxExperience,
    technologies,
  }: Job) => {
    history.push(
      `/candidates?city=${city}&minExperience=${minExperience}&maxExperience=${maxExperience}&technologies=${technologies.join(
        ',',
      )}`,
    );
  };

  return (
    <JobList
      jobs={jobs}
      loading={loading}
      error={error}
      onJobClick={seeJobMatches}
    />
  );
};

export default JobsContainer;
