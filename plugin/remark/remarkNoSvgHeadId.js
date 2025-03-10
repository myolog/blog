import { visit } from 'unist-util-visit';

// 텍스트만 추출하는 함수: svg 요소는 빈 문자열을 반환하여 무시합니다.
function extractText(node) {
  if (node.type === 'text') {
    return node.value;
  }
  // 현재 노드가 svg 요소이면 무시
  if (node.type === 'element' && node.tagName === 'svg') {
    return '';
  }
  // 자식 노드가 있다면 재귀적으로 텍스트 추출
  if (node.children && node.children.length > 0) {
    return node.children.map(extractText).join('');
  }
  return '';
}

// custom remark 플러그인: heading 노드를 순회하며 id를 설정합니다.
export default function remarkCustomSlug() {
  return (tree) => {
    visit(tree, 'heading', (node) => {
      // svg 아이콘은 무시하고 텍스트만 추출합니다.
      const text = extractText(node);
      
      // mySlugFunction 없이 추출한 텍스트 그대로 id로 사용
      node.data = node.data || {};
      node.data.hProperties = node.data.hProperties || {};
      node.data.hProperties.id = text.replace(/:[^:\s]+:/g, '').trim();
    });
  };
}
