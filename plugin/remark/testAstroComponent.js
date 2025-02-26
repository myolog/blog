import { visit } from "unist-util-visit";

export function remarkAstroIcon() {
  return transformer;

  function transformer(tree) {
    visit(tree, "text", (node, index, parent) => {
      if (typeof node.value !== 'string') return;
      
      // Match pattern like :icon-name:
      const regex = /:([a-z0-9-]+):/g;
      const matches = [...node.value.matchAll(regex)];
      
      if (matches.length === 0) return;
      
      // Split text on matches and create new nodes
      const result = [];
      let lastIndex = 0;
      
      for (const match of matches) {
        const [fullMatch, iconName] = match;
        const startIndex = match.index;
        
        // Add text before the match
        if (startIndex > lastIndex) {
          result.push({
            type: "text",
            value: node.value.slice(lastIndex, startIndex)
          });
        }
        
        // Add the icon component
        result.push({
          type: "html",
          value: `<FluentEmoji emoji="${iconName}" />`
        });
        
        lastIndex = startIndex + fullMatch.length;
      }
      
      // Add any remaining text
      if (lastIndex < node.value.length) {
        result.push({
          type: "text",
          value: node.value.slice(lastIndex)
        });
      }
      
      // Replace the current node with our result nodes
      parent.children.splice(index, 1, ...result);
    });
  }
}