import Level from "../curriculum/Level.js";

const defaultLevels = [
  { name: "Nursery" },
  { name: "Primary" },
  { name: "Middle" },
  { name: "Secondary" },
  { name: "Senior Secondary" },
];

export const seedLevels = async () => {
  const existingCount = await Level.countDocuments();

  if (existingCount > 0) {
    return;
  }

  await Level.insertMany(defaultLevels);
  console.log("Default levels seeded");
};
