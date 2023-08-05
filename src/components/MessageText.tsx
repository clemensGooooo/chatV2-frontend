import React from 'react';
import { Marked } from '@ts-stack/markdown';
import DOMPurify from 'dompurify';

interface MarkdownProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownProps> = ({ content }) => {
  const html = Marked.parse(content);
    const sanitizedHtml = DOMPurify.sanitize(html);

    return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

export default MarkdownRenderer;