## 에러 이슈 1

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

## 에러 이슈 2

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
