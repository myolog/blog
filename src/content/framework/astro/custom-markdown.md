---
title: "Custom Markdown을 추가해 보자 #6"
description: "remark를 활용하여 astro에 커스텀 마크다운 문법을 추가하는 방법에 대해 알아보자"
pubDate: "2025-02-26"
heroImage: "/blog-placeholder-3.jpg"
tags: ["astro"]

defineConfigURL: "https://docs.astro.build/en/reference/configuration-reference"
---

# :face-with-monocle: 뭔가 부족해
>
>기존 마크다운 문법으로 만족되지 않는다.

기존 마크다운 문법만으로 원하는 표현을 모두 구현하기 어렵다. 기본 문법에서는 GitHub의 `callout`처럼 특별한 형태의 블록을 지원하지 않으므로, 추가 기능을 위해 직접 커스텀 마크다운 문법을 만들어야 한다.

Astro는 기본적으로 Markdown(.md) 렌더링을 지원하지만, 기본 문법 외의 확장 기능은 제공하지 않는다. 따라서 이러한 기능들을 사용하기 위해 remark 플러그인을 직접 구현하는 방법을 선택한다.

## 그럼 어떻게?
>
> 만든다는건 알겠어. 하지만 어떻게?

astro는 `astro.config.mjs`파일 내에 [defineConfig][astro] 함수를 통해 마크다운 관련 설정을 제어한다. 설정 예시는 아래와 같다:

```js
export default defineConfig({
    ...options   // 기타 옵션들을 설정한다.
    markdown: {
        remarkPlugins: [],
        remarkRehypePlugins: [],
        remarkRehype: {}
    }
})
```

defineConfig는 markdown에 대해서 크기 3가지 옵션이 존재한다.

위 구성에는 총 3가지 옵션이 존재한다:

1. remarkPlugins  
  커스텀 remark 플러그인을 추가하여 기본 마크다운 문법에 새로운 기능을 덧붙인다.
2. remarkRehype  
  remark 트리를 rehype 트리로 변환하는 과정에서의 옵션을 지정한다.
3. remarkRehypePlugins  
  변환된 rehype 트리에 추가 플러그인을 적용한다.

예를 들어 `remark-emoji`를 사용하여 간단하게 플러그인을 추가해 보면 다음과 같다.

```js
import remarkEmoji from 'remark-emoji';

export default defineConfig({
    ...options
    markdown: {
        remarkPlugins: [
            remarkEmoji,
            [remarkEmoji, { ...remarkEmojiOptions }], //옵션은 다음과 같이 줄 수 있다.
        ]
    }
})
```

이 3가지 옵션 중에 `remarkPlugin`을 사용하여 직접 remarkPlugin을 구현을 해보자

## :bar-chart: remark를 활용하여 mermaid를 추가해 보자

> astro-mermaid가 있지만 굳이 직접??

현재 블로그는 [astro-transition](https://docs.astro.build/en/guides/view-transitions/)을 사용하고 있다.
간단하게 위의 `astro-transition`을 사용할 경우 기존에 있는 `<script/>`가 적용되지 않는 문제가 생긴다.
이 문제를 해결하기 위한 자세한 내용은 [Astro-Transition! #3][blog-astro-transition]을 한번 보도록 하자.
오늘은 이것이 주제가 아니니 간단하게 해결방안만 다루도록 하겠다.

### :writing-hand-light: remark plugin 파일 작성

기본적으로 astro는 typescript를 지원 하지만 remark에 사용될 핵심 Library의 `unist-util-visit`의 d.ts파일은 없는거나 마찬가지인 느낌이기 때문에  `javascript`로 코드를  작성하는게 편하다.
아래 코드는 `mermaid` 코드 블록을 찾아 HTML로 변환하는 플러그인을 예시로 구현한다:

```js
import { visit } from "unist-util-visit";

export default function () {
  return (tree) => {
    visit(tree, "code", (node, index, parent) => {
      if (node.lang === "mermaid") {
        parent.children.splice(index, 1, {
          type: "html",
          value: `
            <pre class="astro-code github-dark" style="background-color:#24292e;color:#e1e4e8;overflow-x:auto;">
                <div class="mermaid">${node.value}</div>
            </pre>`,
        });
      }
    });
  };
}
```

이 플러그인은 마크다운 트리에서 `code` 블록을 순회하여, 언어가 `mermaid`인 경우 이를 HTML 코드로 대체한다. 이렇게 변환된 HTML은 Astro가 렌더링하면서 mermaid 다이어그램으로 표현된다.

:::tip
`unist-builer`의 `u`를 사용하면 위에서 `splice`로 직접 객체를 구성하는 과정을 더 간단하게 처리가능하다.

```js
import { u } from 'unist-builder'
u('html',`<div>${node.value}</div>`)
```

:::

### :bullseye: 마크 다운 추가

위제서 만든 마크다운을 가지고 astro에 추가해보자:

```js
import remarkMermaid from './remarkMermaid'
export default defineConfig({
    ...options
    markdown: {
        remarkPlugins: [
          remarkMermaid
        ]
    }
})
```

짜잔~

다음 \`\`\`mermaid
graph TD;
  A --> B
\`\`\`
를 작성해주면 다음과 같이 적용된것이 보일 것이다:

```mermaid
graph TD;
  A --> B
```

#### 추가 - Astro Transition 사용시

Astro Transition을 사용할 경우 특별한 이벤트들이 작동한다.

```js
import mermaid from "mermaid";

document.addEventListener("DOMContentLoaded", () => {
  mermaid.initialize({
    theme: "dark",
  });
});

document.addEventListener("astro:after-swap", () => {
  mermaid.run();
});
```

transition이 될때마다 mermaid를 작동되도록 이벤트르 만들어 주면 해결된다.

[astro]: https://docs.astro.build/en/reference/configuration-reference
[blog-astro-transition]: ../astro/astro-transition
