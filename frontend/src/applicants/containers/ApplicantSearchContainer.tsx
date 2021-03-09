import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ApplicantSearchForm from '../components/RHFApplicantSearchForm';

const ApplicantSearchContainer = () => {
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: { minExperience: 0, maxExperience: 12 },
  });
  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
    console.log('formData', formData);
  });

  return (
    <>
      <FormProvider {...methods}>
        <ApplicantSearchForm error="" loading={loading} onSubmit={onSubmit} />
      </FormProvider>
    </>
  );
};

export default ApplicantSearchContainer;
