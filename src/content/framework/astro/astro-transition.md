---
title: "Astro Transition! #3"
description: "Astro Transition을 활용하여 블로그를 더 꾸며 보자!"
pubDate: "2025-02-24"
heroImage: "/blog-placeholder-2.jpg"
tags: ["astro"]
---

# Astro Transition 이란?

> 그런거다~ 이말이야

```mermaid
erDiagram
          CUSTOMER }|..|{ DELIVERY-ADDRESS : has
          CUSTOMER ||--o{ ORDER : places
          CUSTOMER ||--o{ INVOICE : "liable for"
          DELIVERY-ADDRESS ||--o{ ORDER : receives
          INVOICE ||--|{ ORDER : covers
          ORDER ||--|{ ORDER-ITEM : includes
          PRODUCT-CATEGORY ||--|{ PRODUCT : contains
          PRODUCT ||--o{ ORDER-ITEM : "ordered in"

```
