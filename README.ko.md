<h1 align="center">nuxt-articles</h1>
<p align="center">
	소규모 사이트를 위한 간단한 헤드리스 CMS
</p>

<p align="center">
	<b>Language</b><br>
	<a href="./README.md">English</a> | 한국어
</p>


## 기능
- 간단한 사용법

## TODO
- remark 및 rehype 플러그인 커스터마이징
- 코드 블록에서 코드 하이라이팅

## `@nuxt/content`와 다른점
- 마크다운만 지원
- HTTP API만 생성
- (아직은) Nuxt v3 지원!!

## 설치
```bash
npm install -D @dungsil/nuxt-articles
```
```javascript
// nuxt.config.ts

export default {
  buildModules: ['@dungsil/nuxt-articles']
}
```

## 라이선스 및 크레딧
MIT License &copy; 2022 [Kim Younggeon](https://younggeon.kim)

[`@nuxt/content`](https://content.nuxtjs.org/) 에서 영감을 받았습니다. \
[`@unocss/nuxt`](https://github.com/antfu/unocss/tree/main/packages/nuxt) 의 소스코드를 참고하였습니다.
