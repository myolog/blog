---
title: "Astro로 블로그를 만들어 보자 #1"
description: ""
pubDate: "Jun 01 2024"
heroImage: "/blog-placeholder-3.jpg"
tags: ["astro"]
---

최근 공부하면서 공부한 내용을 적리한 기술 블로그를 하나 만들면 좋겠다고 생각하였다.  
여러가지 블로그 사이트들이 있지만 `Astro`를 사용하여 직접 블로그를 만들어 보기로 하였다.

# :face-with-monocle: 왜 Astro?

> Astro를 선택한 이유는 뭘까?

Astro를 선택한 것에 있어 여러가지가 있지만, 내가 선택한 이유는 다음과 같은 이유가 있다:

1. react가 아니다.
   - But, 컴포넌트 구현이 쉽다.
2. 문법이 기본 html과 다르지 않다.
3. 정적 사이트에 특화 되어 있다.

더욱 자세한 내용은 다음 [여기][why-astro]서 확인해 보자.

## Set-up

> Astro 개발환경을 준비해 보자

[여기][setup-astro]에서는 3가지 astro 설치 가이드가 있다. 궁금하면 확인해보도록 하자.  
하지만 이 블로그는 cloudflare pages에 배포 될 거기 때문에 처음 시작하는 프로젝트를 `create astro`로 하면 처음 구성이 복잡해 질 수도 있다.
`npm create astro@latest` 대신 아래의 명령어를 사용하여 cloudflare와 통합을 진행한다.

```bash
npm create cloudflare@latest -- my-astro-app --framework=astro
```

`my-astro-app`을 자신이 원하는 블로그 이름으로 바꾸어 주자.

그럼 순서대로 무엇을 만들지 물어본다.

Q. What would you like to start with?  
A. framework Starter

우리는 astro 프레임 워크를 사용할거기 때문에 Framework Starter를 선택해 주면 된다.

Q. Which development **framework** do you want to use?  
A. **Astro**

Astro 선택후, template을 선택할 수 있다.  
처음 해 보는 사람이라면 blog template도 나쁘지 않은 선택이 될 수 있다.  
각자의 취향에 맞춰서 선택해주자.

Git을 사용할거란 질문에 당연히 **Yes**로 선택해주고
Cloudflare Pages에 Deploy할거냐는 질문에는 **no**를 선택해 준다.

:::tip
[여기][setup-astro]에서 전체 내용을 확인 할 수 있다.
:::

[why-astro]: https://docs.astro.build/ko/concepts/why-astro/
[setup-astro]: https://docs.astro.build/ko/install-and-setup/
