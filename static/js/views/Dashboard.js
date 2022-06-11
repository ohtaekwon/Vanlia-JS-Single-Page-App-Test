import AbstractView from "./AbstractView.js";
export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Dashboard");
  }
  async getHtml() {
    return `
      <h1>Welcome back, Oh</h1>
      <p>
        안녕하세요 이것은 SPA TEST입니다.
      </p>
      <p>
        <a href="/posts" data-link>View recent Posts</a>
      </p>
    `;
  }
}
