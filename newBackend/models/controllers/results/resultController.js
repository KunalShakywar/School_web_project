import Result from "../../results/results.js"

// CREATE RESULT
export const createResult = async (req, res) => {
  try {
    const result = await Result.create(req.body);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL RESULTS
export const getResults = async (req, res) => {
  try {
    const results = await Result.find();

    res.json(results);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};