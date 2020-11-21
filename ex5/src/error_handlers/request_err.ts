import { NextFunction, Request, Response } from 'express';
import { INPUT_VALIDATION_ERROR } from '../constants/constants';

export function request_err(err: undefined, req: Request, res: Response, next: NextFunction): void {
  err === INPUT_VALIDATION_ERROR && res.status(400).send(INPUT_VALIDATION_ERROR);
  next(err);
}
