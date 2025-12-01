import { useState, useEffect } from "react";
import { getActivities, deleteActivity } from "../api/activities";
import { useAuth } from "../auth/Authcontext";

import ActivityList from "./ActivityList";
import ActivityForm from "./ActivityForm";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const { token } = useAuth();
  const [error, setError] = useState("");

  const syncActivities = async () => {
    try {
      const data = await getActivities();
      setActivities(data);
    } catch (err) {
      console.error("Error fetching activities.", err);
    }
  };

  useEffect(() => {
    syncActivities();
  }, []);
  const handleDelete = async (activityId) => {
    SpeechSynthesisErrorEvent("");
    try {
      const result = await deleteActivity(activityId, token);

      if (result.success) {
        setActivities((prev) => prev.filter((act) => act.id !== activityId));
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <h1>Activities</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ActivityList
        activities={activities}
        token={token}
        onDelete={handleDelete}
      />
      <ActivityForm syncActivities={syncActivities} />
    </>
  );
}
