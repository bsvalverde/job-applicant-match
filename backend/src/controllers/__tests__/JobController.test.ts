import { Request } from 'express';
import JobService from '../../services/JobService';
import MongoJobStore from '../../stores/MongoJobStore';
import { BadRequestError } from '../../types/errors';
import JobController from '../JobController';

jest.mock('../../stores/MongoJobStore');

describe('controllers.JobController', () => {
  const store = new MongoJobStore();
  const service = new JobService({ store });
  const controller = new JobController({ service });

  describe('JobController.getQuery', () => {
    const query = {
      city: 'city',
      experience: '12',
      technologies: ['tech'],
      limit: '3',
    };

    const createRequestWithQuery = (query: any) => {
      return { query } as Request;
    };

    it('Throws an error if experience is not a number', () => {
      const request = createRequestWithQuery({ ...query, experience: 'jewel' });
      expect(() => controller.getQuery(request)).toThrow(BadRequestError);
    });

    it('Throws an error if experience is lesser than 0', () => {
      const request = createRequestWithQuery({ ...query, experience: '-2' });
      expect(() => controller.getQuery(request)).toThrow(BadRequestError);
    });

    it('Throws an error if experience is bigger than 12', () => {
      const request = createRequestWithQuery({ ...query, experience: '13' });
      expect(() => controller.getQuery(request)).toThrow(BadRequestError);
    });

    it('Throws an error if technologies is not an array', () => {
      const request = createRequestWithQuery({
        ...query,
        technologies: 'tech2',
      });
      expect(() => controller.getQuery(request)).toThrow(BadRequestError);
    });

    it('Throws an error if limit is not a number', () => {
      const request = createRequestWithQuery({ ...query, limit: 'three' });
      expect(() => controller.getQuery(request)).toThrow(BadRequestError);
    });

    it('Throws an error if limit is 0 or less', () => {
      const request = createRequestWithQuery({ ...query, limit: '0' });
      expect(() => controller.getQuery(request)).toThrow(BadRequestError);
    });

    it('Correctly maps the values to the query object', () => {
      const mappedQuery = controller.getQuery(createRequestWithQuery(query));
      expect(mappedQuery).toEqual({ ...query, experience: 12, limit: 3 });
    });

    it('Returns an empty query if no values are provided', () => {
      const mappedQuery = controller.getQuery(createRequestWithQuery({}));
      expect(mappedQuery).toEqual({});
    });
  });
});
