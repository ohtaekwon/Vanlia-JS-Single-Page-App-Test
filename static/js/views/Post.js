import AbstractView from "./AbstractView.js";

// const pageName = "Post Page";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Post");
  }
  async getHtml() {
    return `
      <h1>Post Page</h1>
      <p>
        안녕하세요 여기는 Post페이지 입니다.
      </p>
      <p>
        <a href="/posts" data-link>View recent Posts</a>
      </p>
    `;
  }
}
