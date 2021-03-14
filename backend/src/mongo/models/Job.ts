import mongoose, { Document } from 'mongoose';
import Job from '../../types/jobs';
import BaseSchema from './BaseSchema';
import { experience, trimmedString } from './commonSchemas';

interface JobModel extends Job, Document {}

const jobSchema = new BaseSchema({
  city: {
    ...trimmedString,
    required: true,
  },
  isRemote: {
    type: Boolean,
    required: true,
  },
  minExperience: {
    ...experience,
    required: true,
  },
  maxExperience: {
    ...experience,
    required: true,
  },
  technologies: {
    type: [String],
    required: true,
  },
});

export default mongoose.model<JobModel>('Job', jobSchema);
