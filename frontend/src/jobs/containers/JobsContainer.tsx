import React, { useEffect, useState } from 'react';
import api from '../../api';
import Job from '../../types/jobs';
import JobList from '../components/JobList';

const JobsContainer = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  return <JobList jobs={jobs} loading={loading} error={error} />;
};

export default JobsContainer;
