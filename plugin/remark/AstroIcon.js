import { visit } from 'unist-util-visit';
import Icon from '../Icon/FluentEmojiFlatIcon';


export default function() {
  return async (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      const ICON_SYNTAX = /:([A-Za-z0-9_-]+):/g;
      let match;
      let lastIndex = 0;
      const newNodes = [];
      
      // 텍스트 노드 내의 모든 :iconName: 패턴을 찾음
      while ((match = ICON_SYNTAX.exec(node.value)) !== null) {
        const iconName = match[1];
        const start = match.index;
        const end = start + match[0].length;
        
        // 매치 전의 텍스트를 보존
        if (start > lastIndex) {
          newNodes.push({
            type: 'text',
            value: node.value.slice(lastIndex, start)
          });
        }
        
        newNodes.push({
          type: 'html',
          value: Icon(iconName)
        });
        lastIndex = end;
      }
      // 매치 후 남은 텍스트를 보존
      if (newNodes.length && lastIndex < node.value.length) {
        newNodes.push({
          type: 'text',
          value: node.value.slice(lastIndex)
        });
      }
      
      // 아이콘 문법이 없으면 건너뜀
      if (!newNodes.length) return;
      
      // 원래 텍스트 노드를 새로운 노드들로 대체
      parent.children.splice(index, 1, ...newNodes);
      return index + newNodes.length;
    });
  };
}

