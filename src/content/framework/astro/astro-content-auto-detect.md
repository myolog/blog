---
title: "Astro - content 폴더 자동 파싱"
description: ""
pubDate: "June 09 2025"
heroImage: "/blog-placeholder-1.jpg"
tags: ["astro"]
---

# 음 귀찮다!

현재 이 블로그는 astro의 [content.config.ts][collection-config] 파일로 마크다운 글이 관리되고 있다.
공식 사이트의 예시로는 다음과 같다

```js
import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const blog = defineCollection({ /* ... */ });
const dogs = defineCollection({ /* ... */ });

export const collections = { blog, dogs };
```

이렇게 겅의한 `blogs`나 `dogs`는 다음과 같이 사용 될 수 있다.

```js
//특정 collection의 전체 글 불러 오기
const posts = await getCollection('framework_astro');

const post = Astro.props;
const { Content } = await render(post);
```

지금 현재 내가 사용하는 블로그 폴더 구조는 다음과 같다.

```md
content
├─framework
│  ├─astro
│  └─minecraft
└─langauge
    └─css
```

그리고 실제 `content.config.ts`는 다음과 같다.

```ts
import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const framework_astro = defineCollection({
    loader: glob({ base: "./src/content/framework/astro", pattern: "**/*.{md,mdx}" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
        heroImage: z.string().optional(),
        pubDate: z.coerce.date()
    })
})

export const collections = { framework_astro };
```

즉 새로운 자식을 추가할 때마다 기존 코드라면, </br>`export const collections = { framework_astro, framework_react, ...etc }`를 적어줘야한다는 것이다. 이는 상당히 번거로운 작업이 될 것이다.

이제부터 이 번거로운 작업을 자동화를 해보자

## 어떻게?
> 여기 부분 content 부분 다시 확인해 봐야함

우리는 `getCollection(string)`를 사용하여 전체 특정 Collection의 글 전부를 가져올 수 있다.</br>
여기서 주목해야 할 점은 우린 `Collections`에 넣은 변수 이름 그대로 호출이 된다는것이다.

`content.config.ts`파일은 파일이 실행하기 전에 실행되는 파일이다. 즉, setup 파일이라고 생각하면된다.
여기서 설정된 Collection들은 빌드 되기전에 content.d.ts파일이 만들어 진다.</br>
content.d.ts파일을 보면 "framework_astro"로 타입이 설정 된것을 볼 수 있다. 즉, 변수 이름이 그대로 타입이 된다.

```ts
type DataEntryMap = {
        "framework_astro": Record<string, {
        id: string;
        body?: string;
        collection: "framework_astro";
        data: InferEntrySchema<"framework_astro">;
        rendered?: RenderedContent;
        filePath?: string;
        }>;
}
```

## 구현?

이제 이걸 응용해 볼거다.</br>
우리는 폴더를 기반으로 해서 알아서 코드가 작성 될 수 있도록 만들거다.

먼저 `collection`이라는 변수하나를 선언해 준다.</br>
변수가 `string`으로 파싱된다는 것을 알았으니 굳이 변수로 존재할 필요가 없다.</br>
dictionary를 써서 key-value형태로 기존 변수 명을 `key:string` 값으로 `defineCollection`부분을 value로 지정해 주었다.

```ts
var collection : {[id: string]: CollectionConfig<ZodObject<any>>} = {}
```

그다음 content/{folder1}/{folder2}/{...} 이런 형태의 폴더의 이름을 파싱할 것이다.</br>
파싱의 결과는 다음과 같이 되길 원한다.

```shell
folder1_folder2_...
```

:::tip
여기서 다시 생각해 볼만한 점은 우리는 setup과정이기 때문에 `fs`나 `path`를 소스기반으로하여 자유롭게 사용가능하다.
:::
`_`대신 `/` 을 사용하면 glob({base:})지정에 변할것 같다.

```ts
function getCollectionNames(rootPath: string, relPath: string): string[] {
    const fullPath = path.join(rootPath, relPath);
    const entries = fs.readdirSync(fullPath, { withFileTypes: true });
    const subdirs = entries.filter(e => e.isDirectory());
    const files  = entries.filter(e => !e.isDirectory());
  
    const me = files.length > 0 ? [relPath] : [];
  
    const children = subdirs.flatMap(d =>
      getCollectionNames(rootPath, `${relPath}/${d.name}`)
    );
  
    return [...me, ...children];
}
```

위 코드는 폴더를 탐색하고 md 파일 있을 경우 rootPath를 제외한 경로를 추출해서 리스트로 반환한다. 이를 응용하여 defineCollection을 다음과 같이 바꿀 수 있다.

```ts
getCollectionNames(`${process.cwd()}/src/content`,"").flatMap(collectionName => {
    collection[collectionName.replaceAll("/","_")] = defineCollection({
        loader: glob({ base: `./src/content/${collectionName}`, pattern: "**/*.md"}),
        schema: z.object({
            title: z.string(),
            description: z.string(),
            tags: z.array(z.string()),
            heroImage: z.string().optional(),
            pubDate: z.coerce.date()
        })
    })
})
```

## 생각해볼 점
> Schema는 어떻게 관리하지?

defineCollection에서 loader 다음으로 지정 할 수 있는 것은 `schema`다.</br>
이는 `zod`를 사용하여 이를 유연하게 관리할 수 있어댜한다. 모든 글 내용이 해당 내용을 따르지 않을 수도 있다. schema를 유연하게 관리하는 방법을 고민해봐야한다..

[collection-config]: https://docs.astro.build/en/guides/content-collections/#the-collection-config-file