import { memo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";

const CodeBlock = ({
  language,
  value,
}: {
  language: string;
  value: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-gray-200 text-sm">
        <span>{language}</span>
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-gray-300 transition-colors"
        >
          {copied ? (
            <CheckIcon className="h-5 w-5" />
          ) : (
            <ClipboardIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{ margin: 0, borderRadius: 0 }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export const MemoizedMarkdown = memo(
  ({ content, id }: { content: string; id: string }) => {
    return (
      <ReactMarkdown
        components={{
          code({
            node,
            inline,
            className,
            children,
            ...props
          }: {
            node?: any;
            inline?: boolean;
            className?: string;
            children?: React.ReactNode;
          } & React.HTMLAttributes<HTMLElement>) {
            console.log("Code block details:", {
              inline,
              className,
              children: String(children),
              node,
              props,
            });

            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "text";

            // If it's single backticks (no className) or explicitly marked as inline
            if (!className || inline) {
              return (
                <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-md text-sm">
                  {children}
                </code>
              );
            }

            // Triple backticks with language
            return (
              <CodeBlock
                language={language as string}
                value={String(children).replace(/\n$/, "")}
              />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    );
  }
);

MemoizedMarkdown.displayName = "MemoizedMarkdown";
