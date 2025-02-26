// remark-icon.js
import { visit } from 'unist-util-visit';
import { u } from 'unist-builder';

export function remarkAstroIcon() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      const ICON_SYNTAX = /:([A-Za-z0-9_-]+):/g;  // pattern :iconName:
      let match; 
      let lastIndex = 0;
      const newNodes = [];
      // Find all :name: matches in this text node
      while ((match = ICON_SYNTAX.exec(node.value)) !== null) {
        const iconName = match[1];              // e.g. "name"
        const start = match.index;
        const end = start + match[0].length;
        // Preserve text before the `:name:` 
        if (start > lastIndex) {
          newNodes.push(u('text', node.value.slice(lastIndex, start)));
        }
        // Replace `:name:` with an HTML snippet for the icon
        newNodes.push(u('html', `<Icon name="${iconName}" />`));
        lastIndex = end;
      }
      if (!newNodes.length) return; // no icon syntax found in this node
      // Preserve any trailing text after the last match
      if (lastIndex < node.value.length) {
        newNodes.push(u('text', node.value.slice(lastIndex)));
      }
      // Replace the original text node with our new nodes
      parent.children.splice(index, 1, ...newNodes);
      return index + newNodes.length; // skip over inserted nodes
    });
  };
}
