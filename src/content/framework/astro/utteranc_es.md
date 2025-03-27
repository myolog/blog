---
title: "utterances를 사용하요 블로그에 댓글 기능을 추가해보자 #7"
description: "가장 간단하게 만들 수 있는 댓글 기능??"
pubDate: "2025-03-23"
heroImage: "/blog-placeholder-4.jpg"
tags: ["astro","utterances"]
---

블로그를 봤으면 잘못된 것을 지적하거나 의견을 다는듯 소통을 하고싶을 수가 있을 것이다.

이럴때 간단하게 사용할 수 있는게 `utterances` 되겠다.

## Utterances란?

혹시 infinity storage라고 들어봤는가? 유튜브를 활용하여 문서를 저장하거나 여러 사이트의 꼼수를 사용해서 파일저장을 하는 것이다. `utterances` 같은 경우 `github`의 `issue`를 활용하여 댓글 기능을 구현하는 것이다. `issue`같은 경우 무료로 이용이 가능하고 봇으로 생성이 가능하며, 대댓글도 달 수있는 기능이 제공된다. `utterances`는 이 기능의 허점을 사용하여 블로그나 사이트에 댓글기능을 추가할 수 있도록 하였다.

## Setup
> 설치를 해보자

설치 자체는 엄청 간단하다. [이곳](https://utteranc.es/)에서 하나 하나씩 천천히 따라해 보자.

1. github public 레포지토리를 준비한다.
2. [uttrances앱](https://github.com/apps/utterances)을 준비한 레포에 설치한다.
    - 필자는 블로그에 직접 이슈를 여는 것을 방지하기 위해 **myolog-reply**라는 레포를 만들어 두었다.
3. `소유자(또는 조직)/레포 이름`을 사이트에 기입해 주고 ~~https주소가 아니다~~
4. 어떤 형식으로 issue를 만들지 선택한다.
   - 위에서 부터 예시를 들자면
   1. pathname으로(/blog/post)이슈 만들기
   2. url(https://blog/post)로 이슈 만들기
   3. title로 이유 만들기 `<title>` 태그를 활용한다.
   4. og\:title로 만들기
   5. 특정 숫자로 만들기
   6. 특정 키워드를 통해 만들기
   - `pathname`과 `url`을 많이 사용하는 듯 하다.
5. issue Label 설정 (선택)
   - 이슈에 같이 달릴 Label을 설정할 수있다. 하지만 Label을 만들어 주진 않는다.
6. theme 설정
    - 기본적으론 github 테마를 사용할 수있고 추가적으로 사용자 테마를 선택할 수 있다.

위 가정을 마쳤으면 다음과 같이 스크립트를 페이지 맨 아래에 만들어 준다.

```html
<script src="https://utteranc.es/client.js"
        repo="myolog/myolog-reply"
        issue-term="pathname"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
```

이것을 활용하여 이제 astro에 적용 시켜 보자

## Astro에 적용시켜 보자

Astro는 정적 사이트기 때문에 원하는 위치에 위 스크립드를 넣어주면 된다.

위 스크립트를 넣어주게 되면 해당 스크립트 위치에 `iframe`으로 댓글 칸이 생긴다.

//나중에 이미지 넣기

## 타입에러?

정상적으로 작동은 하는데 ide에서 빨간 줄이 끄였다.

//이미지 넣기

오류를 살펴보면 script태그에 `repo`와 `theme`이 없어서 뜨는 에러다.

이는 astro와 관련 없는 `typescript`에러다 이는 아주 간단하게 오류를 해결 할 수 있다.
d.ts 파일을 추가하면 되는데 필자는 최상위 폴더에다 `type/uttrancesScript.d.ts`파일을 만들어 주었다.

`uttrancesScript.d.ts`에 다음 코드를 넣어 보자

```ts 
declare namespace astroHTML.JSX {
    interface ScriptHTMLAttributes {
        repo?: string,
        theme?: "github-light" | "github-dark" | "preferred-color-scheme" | "github-dark-orange" | "icy-dark" | "dark-blue" | "photon-dark" | "boxy-light" | "gruvbox-dark"
        'issue-term'?: string | "pathname" | "url" | "title" | "og:title"
        'issue-number'?: string
    }
}
```

이는 간단하게 타입을 추가해주는 코드이다.
astro에서 script는 다음 큰 두가지 타입을 가진다.
- `ScriptHTMLAttributes`
- `AstroScriptAttributes`

사실 이 둘중 아무거나 선택해서 타입을 확장해도 되지만 `uttrances`는 astro와 관련이 없으니 `ScriptHTMLAttributes`를 확장하여 타입을 추가하였다.

위 코드를 추가하고 다시 ide를 확인해 보면 theme관련해서 자동완성까지 지원하는걸 볼 수 있다.

// 자동완성 이미지 추가

## 결론

Uttrances를 통해 간단하고 익숙한 블로그 댓글창을 손쉽게 구현할 수 있었다.  
계속해서 블로그를 만들어 나가보자