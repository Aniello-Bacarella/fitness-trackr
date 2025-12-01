export default function ActivityList({ activities, token, onDelete }) {
  return (
    <ul>
      {activities.map((activity) => (
        <li key={activity.id}>
          {activity.name}
          {token && (
            <button onClick={() => onDelete(activity.id)}>Delete</button>
          )}
        </li>
      ))}
    </ul>
  );
}
