import mongoose, { Document, Schema } from 'mongoose';
import Candidate from '../../types/candidates';
import BaseSchema from './BaseSchema';
import { experience, trimmedString } from './commonSchemas';

interface CandidateModel extends Candidate, Document {}

const technologySchema = new Schema(
  {
    name: {
      ...trimmedString,
      required: true,
    },
    isMainTech: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { _id: false },
);

const candidateSchema = new BaseSchema({
  city: {
    ...trimmedString,
    required: true,
  },
  experience: {
    ...experience,
    required: true,
  },
  technologies: {
    type: [technologySchema],
    required: true,
  },
});

export default mongoose.model<CandidateModel>('Candidate', candidateSchema);
