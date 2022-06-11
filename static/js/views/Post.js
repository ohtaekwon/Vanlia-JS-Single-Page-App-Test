import AbstractView from "./AbstractView.js";
export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Post");
  }
  async getHtml() {
    return `
      <h1>POST PAGE</h1>
      <p>
        안녕하세요 여기는 Post페이지 입니다.
      </p>
      <p>
        <a href="/posts" data-link>View recent Posts</a>
      </p>
    `;
  }
}
