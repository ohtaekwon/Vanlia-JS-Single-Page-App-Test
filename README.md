# 바닐라 자바스크립트로 SPA 구현해보기

> 본 포스트는 dcode - YOUTUBE 를 참고하였습니다.

- React, Angular, Vue와 같은 프레임워크의 사용 없이 JavaScript만으로 SPA(Single Page Application)을 구현해보고자 한다.
- vanilla javascript, history API를 이용합니다
- SPA를 위한 라우팅을 구현합니다 (동적 라우팅 포함)
  습니다

## 1. index.html

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Single Page App</title>
    <link rel="stylesheet" href="/static/css/index.css" />
  </head>
  <body>
    <nav class="nav">
      <a href="/" class="nav__link" data-link>Home</a>
      <a href="/posts" class="nav__link" data-link>Posts</a>
      <a href="/settings" class="nav__link" data-link>Settings</a>
    </nav>
    <script type="module" src="/static/js/index.js" defer></script>
    <div id="app"></div>
  </body>
</html>
```

- 페이지 이동을 하기위해 3개의 a태그로 구성된 메뉴를 `nav`태그의 하위 태그로 로 감싸주었다.

- 그리고 ES6의 module을 사용하기 위해서 script 태그에 type=module을 추가했다.

```js
<script type="module" src="/static/js/index.js" defer></script>
```

## 2. express 서버 구축하기

- npm init 을 통해서 node module를 관리하고
- node 개발환경에서 express를 설치한다.

```shell
npm install express
```

- 설치가 완료됐으면 폴더 최상위 파일로 `server.js`를 생성해서 서버를 만들어준다.

```js
// server.js
// express server
// express 모듈 불러오기
const express = require("express");
const path = require("path");

// express 사용
const app = express();

app.use("/static", express.static(path.resolve(__dirname, "static")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.listen(process.env.PORT || 5000, () => console.log("Server running....."));
// run server by node server.js
```

### 2-1. express에서 정적 파일 제공

- 이미지, CSS 파일, JavaScript 파일과 같은 정적 파일을 제공하기 위해서 express의 기본 미들웨어 함수인 express.static을 사용한다.

```js
// server.js 의 실행경로 + "/static"을 localhost:port/static으로 마운트
app.use("/static", express.static(path.resolve(__dirname, "static")));
```

- `path.resolve` 를 사용해서 인자로 받은 값들을 하나의 문자열로 만들어 주고 정적 디렉토리에 대한 마운트 경로를 지정해 주면 `/static` 경로를 통해 디렉토리에 포함된 파일을 로드할 수 있게된다.

### 2-2. app.get으로 응답하기

- get요청이 오면 `index.html` 파일을 읽고 내용을 클라이언트로 전송한다.

```js
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});
```

### 2-3. app.listen 포트 번호 지정하고 서버 실행하기

- 포트번호 5000에서 서버를 실행한다.

```js
// port 생성 서버 실행
app.listen(process.env.PORT || 5000, () => console.log("Server running....."));
```

- 터미널에서 다음과 같이 입력하여 서버를 실행한다.

```shell
node server.js
```

## 에러 이슈

### 에러 이슈 1

- 원인 : /posts/:id로 접속하게 되면 아래와 같은 에러 메시지 발생

### 에러 이슈 1 - 에러 메시지

```
Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "text/html". Strict MIME type checking is enforced for module scripts per HTML spec.

```

### 에러 이슈 1 - 에러 해결

경로 설정 문제로 수정 후 페이지 나타남

```html
<body>
  -
  <script type="module" src="./static/js/index.js" defer><script>
  +
  <script type="module" src="/static/js/index.js" defer><script>
</body>
```

- 같은 경로 방식으로 css파일도 수정

```html
<link rel="stylesheet" href="/static/css/index.css" />
```

<br/>

### 에러 이슈 2

- 원인 : slice()값 에 대해 메서드를 호출 할 때 "정의되지 않은 속성 '슬라이스'를 읽을 수 없습니다" 오류가 발생한다.

- 해결 방법 : undefined. 오류를 해결하려면 이를 slice구현하는 데이터 형식(배열 또는 문자열)에서만 메서드를 호출해야 한다.

### 에러 이슈 2 - 에러 이슈 메시지

```
Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'slice')

```

### 에러 이슈 2 - 에러 해결

- slice 메서드 사용시, undefined 조건을 걸어준다.

```js
  -
  const values = match.result.slice(1);
  +
  const values = match.result?.slice(1);
```
