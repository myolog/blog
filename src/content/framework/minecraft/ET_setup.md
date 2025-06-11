---
title: "Minecraft Modding: AE2 애드온 만들기 #1 - 초기 설정"
description: "기본 개발환경 셋팅"
pubDate: "2025-06-10"
heroImage: "/blog-placeholder-4.jpg"
tags: ["java","minecraft","neoforge","1.21.1"]
version: "1.21.1"
---

# 왜?

> 그냥 이런 모드 있으면 괜찮지 않을까?

사실 모드의 아이디어는 하한창 기계 모드팩을 하던 1.12.2 버전을 열심히 할때 생각해넨 아이디어다.

하지만 그땐 언어에 미숙할때다. 그 때 만들었던 코드는 [MoreTerminal][ae2-mt]에서 확인이 가능하다.

좀더 언어에 공부한 지금 모드 2개를 엮어서 애드온을 만들어 보자.

## Setup

마인크래프트 모드 개발에 앞서 기본적으로 2가지 필수적 설정이 필요하다.

- ide setting
- gradle setting  

크게 보면 전부 gradle 설정이지만 모드의 애드온이기 때문에 추가적으로 설정할 것이 있어 2가지로 나뉘었다.  

### ide 셋팅

>intelliJ는 신인가?

intelliJ를 쓰고 있다면, 의외로 쉽게 마인크래프트 모드 준비를 할 수 있다.

//사진 첨부

### 모드 셋팅

> gradle setting

추가적인 `gradle.build`파일을 수정해 줘야한다.

각 모드의 github을 차아보면 왠만하면 maven설정이 있다. 그것을 잘 따라하면 된다.  
예시로 applied energistics2의 maven은 다음과 같다.

```java
repository { 
    mavenCentral()
}

dependencies {
    compileOnly "org.appliedenergistics:appliedenergistics2:${AE2_version}" 
}
```

`gradle.properties`에서 위에서 쓰인 `AE2_version`을 정의가능하다.

```java
AE2_version=19\.2\.9
```

이다음에 gradle sync를 진행해 주면 이제 내 코드에서 ae2 코드에 access 가능하다.

다음으 기본적인 registry를 다뤄볼 것이다.
[ae2-mt]: [https://github.com/N-Joy-Shadow/MoreTerminal]