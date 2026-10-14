import type { NewPatient } from './types.ts';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (param: unknown, paramName: string): string => {
  if (!param || !isString(param)) {
    throw new Error(`Incorrect or missing ${paramName}`);
  }
  return param;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  const newPatient = object as Record<string, unknown>;
  const gender = parseString(newPatient.gender, 'gender');

  if (gender !== 'male' && gender !== 'female' && gender !== 'other') {
    throw new Error('Incorrect gender');
  }

  return {
    name: parseString(newPatient.name, 'name'),
    dateOfBirth: parseString(newPatient.dateOfBirth, 'dateOfBirth'),
    ssn: parseString(newPatient.ssn, 'ssn'),
    gender,
    occupation: parseString(newPatient.occupation, 'occupation'),
  };
};

export default toNewPatient;