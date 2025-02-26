---
title: "Custom Markdown을 추가해 보자 #6"
description: "remark를 활용하여 astro에 커스텀 마크다운 문법을 추가하는 방법에 대해 알아보자"
pubDate: "2025-02-26"
heroImage: "/blog-placeholder-3.jpg"
---

# 뭔가 부족해
>
>기존 마크다운 문법으로 만족되지 않는다.

Astro는 기본적으로 Markdown(.md)렌더링을 지원한다. 하지만 가장 기본적인 문법을 지원한 뿐 github의 `callout`같은 문법을 지원 하지 않는다.

즉 `Callout` 같은 문법은 직접 만들어야 한다

## 그럼 어떻게?
>
> 만든다는건 알겠어. 하지만 어떻게?

astro는 `astro.config.mjs`파일 안에 [defineConfig](https://docs.astro.build/en/reference/configuration-reference/) 함수는 markdown에 대한 옵션을 제공한다
remark와 remarkRehype를 제공하는데 확장해서 만드는 것은 remark를 사용하면된다.

```js
export default defineConfig({
    /* 기존 옵션 */
    remarkPlugins: [],
    remarkRehype: {}
})
```
