import React, { useEffect, useState } from 'react';
import Candidate from '../../types/candidates';
// import api from '../../api';
import Job from '../../types/jobs';
import JobCard from '../components/JobCard';

interface Props {
  job: Job;
}

const JobContainer = ({ job }: Props) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [showCandidates, setShowCandidates] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      // setLoading(true);
      // setError('');
      // try {
      //   const { data: jobs } = await api.get('/jobs');
      //   setJobs(jobs);
      // } catch (e) {
      //   setJobs([]);
      //   setError('genericError');
      // } finally {
      //   setLoading(false);
      // }
    };
    fetchJobs();
  }, []);

  return <JobCard job={job} />;
};

export default JobContainer;
