import { User } from '../types/userInterface';

interface UserCardProps {
  user: User;
}

function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white shadow-md dark:shadow-black rounded-lg p-6 m-4 max-w-sm w-full text-balance">
      <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-1"><strong>Email:</strong> {user.email}</p>
      <p className="text-gray-700 dark:text-gray-300"><strong>Username:</strong> {user.username}</p>
    </div>
  );
}

export default UserCard;
