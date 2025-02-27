import { visit } from "unist-util-visit";
import mermaid from "mermaid";
export default function () {
  return (tree) => {
    visit(tree, "code", (node, index, parent) => {
      if (node.lang === "mermaid") {
        parent.children.splice(index, 1, {
          type: "html",
          value: `
            <pre class="astro-code github-dark" style="background-color:#24292e;color:#e1e4e8;overflow-x:auto;" tabindex="0">
                <div class="mermaid">${node.value}</div>
            </pre>`,
        });
      }
    });
  };
}
