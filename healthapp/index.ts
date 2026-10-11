import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";

const app = express();

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
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
