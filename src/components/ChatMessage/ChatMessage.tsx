import { Message } from 'ai';
import Markdown from 'react-markdown';
import { AssistantIcon } from '../Icons/AssistantIcon';
import { UserIcon } from '../Icons/UserIcon';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'

export const ChatMessage = ({
  role,
  message,
}: {
  role: Message['role'];
  message: string;
}) => {
  return (
    <div
      className="flex gap-3 my-4 text-gray-600 text-sm flex-1"
      style={{ overflowAnchor: 'none' }}
    >
      <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
        {role === 'user' ? <UserIcon /> : <AssistantIcon />}
      </span>

      <div className="leading-relaxed">
        <span className="block font-bold text-gray-700">{role} </span>
        {role === 'user' ? (
          <span>{message}</span>
        ) : (
          <Markdown
            components={{
              code(props) {
                const { children, className, ...rest } = props;
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    >
                      {String(children).replace(/\n$/, '')}
                    language={match[1]}
                    style={dark}
                  </SyntaxHighlighter>
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >{message}</Markdown>
        )}
      </div>
    </div>
  );
};
