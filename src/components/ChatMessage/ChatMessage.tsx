import { Message } from 'ai';
import { AssistantIcon } from '../Icons/AssistantIcon';
import { UserIcon } from '../Icons/UserIcon';

export const ChatMessage = ({
  role,
  message,
}: {
  role: Message['role'];
  message: string;
}) => {
  return (
    <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
      <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
        {role === 'user' ? <UserIcon /> : <AssistantIcon />}
      </span>
      <p className="leading-relaxed">
        <span className="block font-bold text-gray-700">{role} </span>
        {message}
      </p>
    </div>
  );
};
