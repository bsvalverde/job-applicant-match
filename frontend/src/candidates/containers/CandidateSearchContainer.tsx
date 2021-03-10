import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import api from '../../api';
import Candidate from '../../types/Candidate';
import CandidateList from '../components/CandidateList';
import CandidateSearchForm from '../components/RHFCandidateSearchForm';

const CandidateSearchContainer = () => {
  const [candidates, setCandidates] = useState<Candidate[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: { minExperience: 0, maxExperience: 12 },
  });
  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    setLoading(true);
    setError('');
    const params = {
      ...formData,
      limit: 5,
    };
    try {
      const { data: candidates } = await api.get('/candidates', { params });
      setCandidates(candidates);
    } catch (e) {
      setCandidates(null);
      setError('genericError');
    } finally {
      setLoading(false);
    }
  });

  return (
    <>
      <FormProvider {...methods}>
        <CandidateSearchForm
          error={error}
          loading={loading}
          onSubmit={onSubmit}
        />
        {candidates && <CandidateList candidates={candidates} />}
      </FormProvider>
    </>
  );
};

export default CandidateSearchContainer;
