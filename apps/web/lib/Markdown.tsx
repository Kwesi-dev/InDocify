import { memo, useMemo, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";
import { marked } from "marked";

const CodeBlock = ({
  language,
  value,
  isLoading,
}: {
  language: string;
  value: string;
  isLoading: boolean;
}) => {
  const [copied, setCopied] = useState(false);
  const [SyntaxHighlighter, setSyntaxHighlighter] = useState<any>(null);
  const [highlighterStyle, setHighlighterStyle] = useState<any>(null);

  useEffect(() => {
    const loadHighlighter = async () => {
      const [{ Prism }, { oneDark }] = await Promise.all([
        import("react-syntax-highlighter"),
        import("react-syntax-highlighter/dist/cjs/styles/prism"),
      ]);
      setSyntaxHighlighter(() => Prism);
      setHighlighterStyle(oneDark);
    };

    loadHighlighter().catch(console.error);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg overflow-scroll">
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
      {!isLoading && SyntaxHighlighter ? (
        <SyntaxHighlighter
          language={language}
          style={highlighterStyle}
          customStyle={{ margin: 0, borderRadius: 0 }}
        >
          {value}
        </SyntaxHighlighter>
      ) : (
        <pre className="p-4 bg-gray-900 text-gray-100 text-xs overflow-x-auto">
          <code>{value}</code>
        </pre>
      )}
    </div>
  );
};

function parseMarkdownIntoBlocks(
  markdown: string,
  isLoading: boolean
): string[] {
  const tokens = marked.lexer(markdown);
  return tokens.map((token) => token.raw);
}

const MemoizedMarkdownBlock = memo(
  ({ content, isLoading }: { content: string; isLoading: boolean }) => {
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
                isLoading={isLoading}
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
  },
  (prevProps, nextProps) => {
    if (prevProps.content !== nextProps.content) return false;
    return true;
  }
);

MemoizedMarkdownBlock.displayName = "MemoizedMarkdownBlock";

export const MemoizedMarkdown = memo(
  ({
    content,
    id,
    isLoading,
  }: {
    content: string;
    id: string;
    isLoading: boolean;
  }) => {
    const blocks = useMemo(
      () => parseMarkdownIntoBlocks(content, isLoading),
      [content]
    );

    return blocks.map((block, index) => (
      <MemoizedMarkdownBlock
        content={block}
        key={`${id}-block_${index}`}
        isLoading={isLoading}
      />
    ));
  }
);

MemoizedMarkdown.displayName = "MemoizedMarkdown";
