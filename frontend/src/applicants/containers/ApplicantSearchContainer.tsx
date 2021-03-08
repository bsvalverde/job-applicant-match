import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ApplicantSearchForm from '../components/RHFApplicantSearchForm';

const ApplicantSearchContainer = () => {
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: { minExperience: 0, maxExperience: 12 },
  });
  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    console.log('formData', formData);
  });

  return (
    <>
      <FormProvider {...methods}>
        <ApplicantSearchForm error="" loading={false} onSubmit={onSubmit} />
      </FormProvider>
    </>
  );
};

export default ApplicantSearchContainer;
