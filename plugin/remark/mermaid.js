import { visit } from "unist-util-visit";

export function remarkMermaid() {
  return transformer;

  function transformer(tree) {
    visit(tree, "code", (node, index, parent) => {
      if (node.lang === "mermaid") {
        parent.children.splice(index, 1, {
          type: "html",
          value: `
            <pre class="astro-code github-dark" style="background-color:#24292e;color:#e1e4e8;overflow-x:auto;" tabindex="0">
              <code>
                  <div class="mermaid">${node.value}</div>
              </code>
            </pre>`,
        });
      }
    });
  }
}
