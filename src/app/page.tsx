'use client';

import { useChat } from 'ai/react';
import { ChatMessage } from '@/components/ChatMessage/ChatMessage';
import { Button } from '@/components/Button/Button';
import { useEffect, useRef } from 'react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, error } = useChat({
    maxSteps: 10,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col w-full">
      <div
        id="chat-container"
        style={{
          boxShadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)',
        }}
        className="flex flex-col mx-10 my-5 bg-white p-6 rounded-lg border border-[#e5e7eb] "
      >
        <div className="flex flex-col space-y-1.5 pb-6 ">
          <h2 className="font-semibold text-lg tracking-tight text-zinc-800">
            ReactJS Documents Assistant
          </h2>
          <p className="text-sm text-[#6b7280] leading-3">
            Powered by react.dev and Vercel ai
          </p>
        </div>
        <div className="h-[600px] overflow-y-auto">
          <div
            className="pr-4 h-[600px] overflow-y-auto"
            id="chat-messages"
            style={{ display: 'table' }}
            scroll-behavior="smooth"
          >
            {messages.map(({content, id, role, toolInvocations}) => (
              <div key={id}>
                {
                  content.length > 0 && (
                    <ChatMessage
                      key={id}
                      role={role}
                      message={content}
                    />
                  )
                }
                {
                  toolInvocations?.map((toolInvocation) => {
                    const { toolName, toolCallId, state } = toolInvocation;
                    if (state !== 'result') {
                      return (
                        <div key={toolCallId}>
                          {toolName === 'getInformation' ? (
                            <div className='text-gray-600 text-sm'>Loading answers...</div>
                          ) : null}
                        </div>
                      );
                    }
                  })
                }
              </div>
            ))}
            <div id="anchor" ref={messagesEndRef}></div>
          </div>
        </div>
        {error && (
          <div className="text-red-500 text-sm mt-2">{error?.message}</div>
        )}
        <div className="flex items-center min-w-full pt-5">
          <form
            onSubmit={handleSubmit}
            className="flex w-full justify-center space-x-2"
          >
            <input
              className="flex w-full h-10 rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
              placeholder="Ask any question related to react js"
              value={input}
              onChange={handleInputChange}
            />
            <Button label="Send" type="submit" onClick={handleSubmit} />
          </form>
        </div>
      </div>
    </div>
  );
}
