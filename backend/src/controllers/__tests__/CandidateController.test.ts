import { Request } from 'express';
import CandidateService from '../../services/CandidateService';
import MongoCandidateStore from '../../stores/MongoCandidateStore';
import { BadRequestError } from '../../types/errors';
import CandidateController from '../CandidateController';

jest.mock('../../stores/MongoCandidateStore');

describe('controllers.CandidateController', () => {
  const store = new MongoCandidateStore();
  const service = new CandidateService({ store });
  const controller = new CandidateController({ service });

  describe('CandidateController.getQuery', () => {
    const query = {
      city: 'city',
      minExperience: '0',
      maxExperience: '12',
      technologies: ['tech'],
      limit: '3',
    };

    const createRequestWithQuery = (query: any) => {
      return { query } as Request;
    };

    it('Throws an error if minExperience is not a number', () => {
      const request = createRequestWithQuery({
        ...query,
        minExperience: 'jewel',
      });
      expect(() => controller.getQuery(request)).toThrow(BadRequestError);
    });

    it('Throws an error if minExperience is lesser than 0', () => {
      const request = createRequestWithQuery({ ...query, minExperience: '-2' });
      expect(() => controller.getQuery(request)).toThrow(BadRequestError);
    });

    it('Throws an error if minExperience is bigger than 12', () => {
      const request = createRequestWithQuery({ ...query, minExperience: '13' });
      expect(() => controller.getQuery(request)).toThrow(BadRequestError);
    });

    it('Throws an error if maxExperience is not a number', () => {
      const request = createRequestWithQuery({
        ...query,
        maxExperience: 'jewel',
      });
      expect(() => controller.getQuery(request)).toThrow(BadRequestError);
    });

    it('Throws an error if maxExperience is lesser than 0', () => {
      const request = createRequestWithQuery({ ...query, maxExperience: '-2' });
      expect(() => controller.getQuery(request)).toThrow(BadRequestError);
    });

    it('Throws an error if maxExperience is bigger than 12', () => {
      const request = createRequestWithQuery({ ...query, maxExperience: '13' });
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
      expect(mappedQuery).toEqual({
        ...query,
        minExperience: 0,
        maxExperience: 12,
        limit: 3,
      });
    });

    it('Returns an empty query if no values are provided', () => {
      const mappedQuery = controller.getQuery(createRequestWithQuery({}));
      expect(mappedQuery).toEqual({});
    });
  });
});
