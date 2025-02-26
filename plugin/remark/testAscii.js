import {visit} from 'unist-util-visit'

export function remarkAscii() {
  return transformer;

  function transformer(tree) {
    visit(tree, 'text', (node, index, parent) => {
      if (typeof node.value === 'string') {
        // ::문자:: 패턴을 찾기 위한 정규식
        const regex = /::(.+?)::/g;
        let match;
        let lastIndex = 0;
        const newNodes = [];

        while ((match = regex.exec(node.value)) !== null) {
          // 매치 전의 일반 텍스트 추가
          if (match.index > lastIndex) {
            newNodes.push({
              type: 'text',
              value: node.value.slice(lastIndex, match.index)
            });
          }
          // 매치된 그룹(여기서는 예시로 첫 문자만 사용)
          const target = match[1];
          const asciiCode = target.charCodeAt(0); // 첫 번째 문자의 아스키 코드
          newNodes.push({
            type: 'text',
            value: asciiCode.toString()
          });
          lastIndex = regex.lastIndex;
        }

        // 마지막 매치 이후의 텍스트 추가
        if (lastIndex < node.value.length) {
          newNodes.push({
            type: 'text',
            value: node.value.slice(lastIndex)
          });
        }

        // 매치된 경우 부모 노드의 자식 리스트에 새로운 노드들을 대체
        if (newNodes.length > 0) {
          parent.children.splice(index, 1, ...newNodes);
          return [visit.SKIP, index + newNodes.length];
        }
      }
    });
  }
}
