import axios from "axios";

export const CURRICULUM_UPDATED_EVENT = "curriculum-updated";

const getApiUrl = () => import.meta.env.VITE_API_URL || "http://localhost:5000";
const getCurriculumUrl = () => `${getApiUrl()}/api/curriculum`;

export const readCurriculumData = async () => {
  try {
    const response = await axios.get(getCurriculumUrl());
    return response.data?.data ?? [];
  } catch (error) {
    console.warn("Failed to load curriculum data", error);
    throw error;
  }
};

export const saveCurriculumData = async (data) => {
  try {
    const response = await axios.put(getCurriculumUrl(), {
      curriculum: data,
    });

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(CURRICULUM_UPDATED_EVENT));
    }

    return response.data?.data ?? [];
  } catch (error) {
    console.warn("Failed to save curriculum data", error);
    throw error;
  }
};
