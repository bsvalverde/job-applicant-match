import { NextFunction, Request, Response } from 'express';
import CandidateService from '../services/CandidateService';
import { CandidateQuery } from '../types/candidates';

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

    return {
      city: city as string,
      minExperience: parseInt(minExperience as string),
      maxExperience: parseInt(maxExperience as string),
      technologies: technologies as string | string[],
      limit: parseInt(limit as string),
    };
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
