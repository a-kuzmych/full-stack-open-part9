import express, { type Response } from 'express';
import patientService from '../services/patientService.ts';
import type { NonSensitivePatient } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(patientService.getNonSensitivePatients());
});

export default router;