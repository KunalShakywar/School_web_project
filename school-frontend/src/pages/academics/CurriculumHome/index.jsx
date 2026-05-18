import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import CurriculumLevelDetails from "./components/CurriculumLevelDetails";
import CurriculumLevelSidebar from "./components/CurriculumLevelSidebar";
import CurriculumMobileLevelSelect from "./components/CurriculumMobileLevelSelect";
import { showAppToast } from "../../../utils/appToast";

const Curriculum = () => {
  const [levels, setLevels] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const socket = io(import.meta.env.VITE_API_URL, {
      transports: ["websocket"],
    });

    const loadCurriculum = async () => {
      try {
        const [levelResponse, classResponse, subjectResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/curriculum/getlevel`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/classes/getclass`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/curriculum/subjects/all`),
        ]);

        const levelList = Array.isArray(levelResponse.data?.data)
          ? levelResponse.data.data
          : [];
        const classList = Array.isArray(classResponse.data?.data)
          ? classResponse.data.data
          : [];
        const subjectList = Array.isArray(subjectResponse.data?.data)
          ? subjectResponse.data.data
          : [];

        if (!isMounted) return;

        setLevels(levelList);
        setClasses(classList);
        setSubjects(subjectList);
        setSelectedLevel((currentLevel) => {
          if (!levelList.length) return null;

          if (!currentLevel) {
            return levelList[0] || null;
          }

          const refreshedLevel = levelList.find(
            (item) => String(item._id) === String(currentLevel._id),
          );

          return refreshedLevel || levelList[0] || null;
        });
      } catch (error) {
        console.log(error);
      }
    };

    loadCurriculum();

    socket.on("curriculum-updated", () => {
      loadCurriculum();
      showAppToast({
        title: "Curriculum updated",
        message: "Class, subject, or level data changed.",
        variant: "success",
      });
    });

    return () => {
      isMounted = false;
      socket.off("curriculum-updated");
      socket.disconnect();
    };
  }, []);

  const selectedLevelClasses = useMemo(() => {
    if (!selectedLevel) return [];

    const levelClasses = classes.filter((item) => {
      const itemLevelId = item?.levelId?._id || item?.levelId;
      return String(itemLevelId) === String(selectedLevel._id);
    });

    return levelClasses.map((item) => {
      const classSubjects = subjects.filter((subject) => {
        const subjectClassId = subject?.classId?._id || subject?.classId;
        return String(subjectClassId) === String(item._id);
      });

      return {
        ...item,
        subjects: classSubjects.sort((a, b) => Number(a?.order ?? 0) - Number(b?.order ?? 0)),
      };
    });
  }, [classes, selectedLevel, subjects]);

  return (
    <>
      {/* Mobile UI */}
      <CurriculumMobileLevelSelect
        levels={levels}
        selectedLevel={selectedLevel}
        classes={selectedLevelClasses}
        onSelectLevel={setSelectedLevel}
      />

      {/* Desktop UI */}
      <div className="hidden md:block mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl font-bold">Curriculum</h1>

        <div className="flex items-start gap-6">
          <CurriculumLevelSidebar
            levels={levels}
            selectedLevel={selectedLevel}
            onSelectLevel={setSelectedLevel}
          />

          <div className="min-h-[400px] flex-1">
            <CurriculumLevelDetails
              selectedLevel={selectedLevel}
              classes={selectedLevelClasses}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Curriculum;
