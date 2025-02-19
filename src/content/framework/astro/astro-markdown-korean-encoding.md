---
title: "Astro 마크다운 한글 깨짐 #2"
description: ""
pubDate: "Jun 01 2024"
heroImage: ""
---

> ㅁ

s

> [!TIP]
> hi

Astro를 통한 블로그 만들기를 작성하는 도중 한국에 인코딩 문제가 생겼다.
이 문제를 해결하기 위해 일단 구글에 검색하기로 하였다.

이와 관련된 문제로 [Github Issue](https://github.com/withastro/astro/issues/2187)가 하나 올라 와 있었다.

마지막 comment를 읽으니 `dev`에서만 이렇고 `build` + `preview`에서는 잘 동작한다 하였다.
실재로 preview를 진행해보니 한글이 깨지지 않고 잘 나왔다.  
하지만 마크 다운으로 블로그 글을 써야하는 입장으로 한글이 깨져 나온다는것은 엄청난 불편함을 야기한다.

일단 html에서 한글이 깨진느 이유부터 찾아보아햐 한다.  
내 생각으로는 2가지 경우의 수 가 있다.

1. 파일이 utf-8이 아닌 경우
2. html이 utf-8로 렌더링이 안될 경우

파일이 `utf-8`이 아니라면 ~~  
그래서 `euk-kr`로 설정하였지만 똑같이 글자가 깨져서 나왔다.

그러면 html에서 한글을 제대로 읽지 못하는 상황이 발생했다는거다

그럼 가장 간단한 설정부터 만저보자

`html`에는 `<meta charset="">`을 통하여 html을 어떻게 인코딩 할지 정하는 attribute가 있다.

## astro-seo

>이게 뭔데?

astro-seo는 astro에서 SEO(Search Engine Optimize) 관련하여 편한 설정을 도와주는 Tag를 제공하는 라이브러리다.
