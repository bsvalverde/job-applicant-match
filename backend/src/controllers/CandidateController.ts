import { NextFunction, Request, Response } from 'express';
import CandidateService from '../services/CandidateService';

interface CandidateControllerConstructor {
  service: CandidateService;
}

export default class CandidateController {
  private service: CandidateService;

  constructor({ service }: CandidateControllerConstructor) {
    this.service = service;
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        query: { city, technologies, minExperience, maxExperience, limit },
      } = req;

      const candidates = await this.service.list({
        city: city as string,
        technologies: technologies as string | string[],
        minExperience: parseInt(minExperience as string),
        maxExperience: parseInt(maxExperience as string),
        limit: parseInt(limit as string),
      });

      res.json(candidates);
    } catch (error) {
      next(error);
    }
  }
}
