import { NextFunction, Request, Response } from 'express';
import CandidateService from '../services/CandidateService';
import { CandidateQuery } from '../types/candidates';
import { BadRequestError } from '../types/errors';

interface CandidateControllerConstructor {
  service: CandidateService;
}

export default class CandidateController {
  private service: CandidateService;

  constructor({ service }: CandidateControllerConstructor) {
    this.service = service;
  }

  getQuery(req: Request): CandidateQuery {
    const {
      query: { city, minExperience, maxExperience, technologies, limit },
    } = req;

    const query: CandidateQuery = {};

    if (city) {
      query.city = city as string;
    }

    if (minExperience) {
      const parsedMinExperience = parseInt(minExperience as string);
      if (!Number.isInteger(parsedMinExperience) || parsedMinExperience < 0 || parsedMinExperience > 12) {
        throw new BadRequestError('minExperience');
      }
      query.minExperience = parsedMinExperience;
    }

    if (maxExperience) {
      const parsedMaxExperience = parseInt(maxExperience as string);
      if (!Number.isInteger(parsedMaxExperience) || parsedMaxExperience < 0 || parsedMaxExperience > 12) {
        throw new BadRequestError('maxExperience');
      }
      query.maxExperience = parsedMaxExperience;
    }

    if (technologies) {
      if(!Array.isArray(technologies)) {
        throw new BadRequestError('technologies');
      }
      query.technologies = technologies as string[];
    }

    if (limit) {
      const parsedLimit = parseInt(limit as string);
      if (!Number.isInteger(parsedLimit) || parsedLimit < 1) {
        throw new BadRequestError('limit');
      }
      query.limit = parsedLimit;
    }

    return query;
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const candidates = await this.service.list(this.getQuery(req));

      res.json(candidates);
    } catch (error) {
      next(error);
    }
  }

  async match(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const candidates = await this.service.match(this.getQuery(req));

      res.json(candidates);
    } catch (error) {
      next(error);
    }
  }
}
