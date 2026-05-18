import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";
import TeacherProfileCard from "./components/TeacherProfileCard";
import TeacherProfileError from "./components/TeacherProfileError";
import TeacherProfileLoader from "./components/TeacherProfileLoader";

const TeacherProfile = () => {
  const [profile, setProfile] = useState(null);
  const [profileError, setProfileError] = useState("");
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const { user } = useAuth();
  const authUserId = user?.id ?? user?._id;
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const requestUrl = id
    ? `${apiUrl}/api/teacher/${id}`
    : authUserId
    ? `${apiUrl}/api/teacher/user/${authUserId}`
    : null;

  useEffect(() => {
    if (!requestUrl) return;

    let cancelled = false;
    Promise.resolve().then(() => {
      if (cancelled) return;
      setLoading(true);

      axios
        .get(requestUrl)
        .then((res) => {
          if (cancelled) return;
          const teacher = res.data?.data ?? res.data;
          setProfile(teacher || null);
          setProfileError("");
        })
        .catch((err) => {
          if (cancelled) return;
          if (err?.response?.status === 404) {
            setProfileError("No teacher profile is linked to this login yet.");
          } else {
            setProfileError("Unable to load teacher profile.");
          }
          setProfile(null);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    });

    return () => {
      cancelled = true;
    };
  }, [requestUrl]);

  if (!requestUrl) {
    // UI 
    return (
      <TeacherProfileError
        title="Teacher Profile Unavailable"
        message="No teacher profile is linked to this login."
      />
    );
  }

  if (loading) {
    return <TeacherProfileLoader />;
  }

  if (!profile) {
    return (
      <TeacherProfileError
        title="Teacher Profile Unavailable"
        message={profileError}
      />
    );
  }

  return (
    <TeacherProfileCard
      profile={profile}
      teacherId={id || profile?._id}

    />
  );
};

export default TeacherProfile;
