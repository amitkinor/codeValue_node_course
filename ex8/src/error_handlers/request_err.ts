import { NextFunction, Request, Response } from 'express';
import { ID_VALIDATION_ERROR, NAME_VALIDATION_ERROR } from '../constants/constants';

export function id_err(err: undefined, req: Request, res: Response, next: NextFunction): void {
  err === ID_VALIDATION_ERROR && res.status(400).send(ID_VALIDATION_ERROR);
  next(err);
}

export function name_err(err: undefined, req: Request, res: Response, next: NextFunction): void {
  err === NAME_VALIDATION_ERROR && res.status(400).send(NAME_VALIDATION_ERROR);
  next(err);
}
