import express, { type Request, type Response } from "express";
import patientService from "../services/patientService.ts";
import {
  type NewPatient,
  type NonSensitivePatient,
  type Patient,
} from "../types.ts";
import { validateNewPatient, errorHandler } from "../middleware.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(patientService.getNonSensitivePatients());
});

router.post(
  "/",
  validateNewPatient,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const newPatient = patientService.addPatient(req.body);
    res.json(newPatient);
  },
);

router.use(errorHandler);

export default router;
