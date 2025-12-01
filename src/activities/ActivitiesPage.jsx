import { useState, useEffect } from "react";
import { getActivities, deleteActivity } from "../api/activities";
import {useAuth} from "../auth/Authcontext"

import ActivityList from "./ActivityList";
import ActivityForm from "./ActivityForm";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const {token} = useAuth();

  const syncActivities = async () => {
    const data = await getActivities();
    setActivities(data);
  };

  useEffect(() => {
    syncActivities();
  }, []);
const handleDelete = async (activityId) => {SpeechSynthesisErrorEvent('');
  try {
    const result = await deleteActivity (activityId, token);
    
    if (result.success)
  }
}
  return (
    <>
      <h1>Activities</h1>
      <ActivityList activities={activities} />
      <ActivityForm syncActivities={syncActivities} />
    </>
  );
}
