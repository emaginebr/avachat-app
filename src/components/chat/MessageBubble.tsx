import Markdown from 'react-markdown'

interface MessageBubbleProps {
  role: 'user' | 'assistant'
  content: string
}

const MessageBubble = ({ role, content }: MessageBubbleProps) => {
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-[80%] px-4 py-2 rounded-lg ${
        isUser
          ? 'bg-blue-600 text-white rounded-br-none'
          : 'bg-gray-100 text-gray-800 rounded-bl-none'
      }`}>
        {isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          <div className="prose prose-sm max-w-none prose-p:my-1 prose-headings:my-2 prose-li:my-0">
            <Markdown
              components={{
                a: ({ ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline" />,
              }}
            >
              {content}
            </Markdown>
          </div>
        )}
      </div>
    </div>
  )
}

export default MessageBubble
