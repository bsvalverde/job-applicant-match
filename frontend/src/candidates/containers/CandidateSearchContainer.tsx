import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import api from '../../api';
import CandidateSearchForm from '../components/RHFCandidateSearchForm';

const CandidateSearchContainer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: { minExperience: 0, maxExperience: 12 },
  });
  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    setLoading(true);
    const params = {
      ...formData,
      limit: 5,
    };
    console.log('formData', formData);
    try {
      const candidates = await api.get('/candidates', { params });
      console.log('candidates', candidates);
    } catch (e) {
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
      </FormProvider>
    </>
  );
};

export default CandidateSearchContainer;
