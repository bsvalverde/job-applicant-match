import { NextFunction, Request, Response } from 'express';
import JobService from '../services/JobService';
import { BadRequestError } from '../types/errors';
import { JobQuery } from '../types/jobs';

interface JobControllerConstructor {
  service: JobService;
}

export default class JobController {
  private service: JobService;

  constructor({ service }: JobControllerConstructor) {
    this.service = service;
  }

  getQuery(req: Request): JobQuery {
    const {
      query: { city, experience, technologies, limit },
    } = req;

    const query: JobQuery = {};

    if (city) {
      query.city = city as string;
    }

    if (experience) {
      const parsedExperience = parseInt(experience as string);
      if (!Number.isInteger(parsedExperience) || parsedExperience < 0 || parsedExperience > 12) {
        throw new BadRequestError('experience');
      }
      query.experience = parsedExperience;
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
      const jobs = await this.service.list(this.getQuery(req));

      res.json(jobs);
    } catch (error) {
      next(error);
    }
  }
}
