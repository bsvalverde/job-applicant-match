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
      const candidates = await this.service.list();

      res.json(candidates);
    } catch (error) {
      next(error);
    }
  }
}
