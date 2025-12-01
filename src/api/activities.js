const API = import.meta.env.VITE_API;

/** Fetches an array of activities from the API. */
export async function getActivities() {
  try {
    const response = await fetch(API + "/activities");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

/**
 * Sends a new activity to the API to be created.
 * A valid token is required.
 */
export async function createActivity(token, activity) {
  if (!token) {
    throw new Error("You must be signed in to create an activity.");
  }

  const response = await fetch(API + "/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(activity),
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message);
  }
}

export async function deleteActivity(activityId, token) {
  if (!token) {
    throw new Error("You must be signed in to delete an activity.");
  }

  const response = await fetch(`${API}/activities/${activityId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (response.status === 204) {
    return { success: true };
  }

  let result = {};
  try {
    result = await response.json();
  } catch {
    return { success: true };
  }

  if (!response.ok) {
    throw new Error(
      result.error || result.message || "Unable to delete activity"
    );
  }
  return { success: true, ...result };
}
