interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArgumentsExercises = (args: Array<string>): { target: number; exercises: number[] } => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = Number(args[2]);
  const exercises = args.slice(3).map(Number);

  if (isNaN(target) || exercises.some(isNaN)) {
    throw new Error("Provided values were not numbers!");
  }

  return {
    target,
    exercises,
  };
};

const calculateExercises = (target: number, exercises: number[]): Result => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter((day) => day > 0).length;
  const average = periodLength === 0 
    ? 0 
    : exercises.reduce((sum, day) => sum + day, 0) / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "great job, target achieved!";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "you need to improve your performance";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, exercises } = parseArgumentsExercises(process.argv);
  console.log(calculateExercises(target, exercises));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}