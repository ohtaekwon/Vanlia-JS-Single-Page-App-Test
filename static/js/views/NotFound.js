export default class {
  constructor() {
    document.title = "404 Not Found";
  }

  async getHtml() {
    return `
      <div class="NotFound">
        <h1>페이지를 찾을 수 없습니다.</h1>
      </div>
    `;
  }
}
