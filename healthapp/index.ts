import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  const heightNum = Number(height);
  const weightNum = Number(weight);

  if (
    !height ||
    !weight ||
    isNaN(heightNum) ||
    isNaN(weightNum) ||
    heightNum <= 0 ||
    weightNum <= 0
  ) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const bmi = calculateBmi(heightNum, weightNum);

  res.json({
    height: heightNum,
    weight: weightNum,
    bmi,
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || target === undefined) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }

  const targetNum = Number(target);

  if (
    !Array.isArray(daily_exercises) ||
    isNaN(targetNum) ||
    daily_exercises.length === 0 ||
    daily_exercises.some((item) => isNaN(Number(item)))
  ) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const exercises = daily_exercises.map(Number);
  const result = calculateExercises(targetNum, exercises);

  res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
