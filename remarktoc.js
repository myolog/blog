import { visit } from 'unist-util-visit';

export default function() {
  return (tree) => {
    const headers = [];
    visit(tree, 'heading', (node) => {
      const title = (node.children || [])
        .filter(n => n.type === 'text')
        .map(n => n.value)
        .join('');
      headers.push({ level: node.depth, title });
    });

    return headers
      .map(header => {
        const indent = '  '.repeat(header.level - 1);
        const slug = header.title
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '');
        return `${indent}- [${header.title}](#${slug})`;
      })
      .join('\n');
  };
}