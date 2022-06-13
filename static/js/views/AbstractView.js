export default class {
  constructor(params) {
    this.params = params;
    console.log("params", this.params);
  }
  /**
   *
   * @param {string} title 문서의 제목을 변경한다
   */
  setTitle(title) {
    document.title = title;
  }

  async getHtml() {
    return "";
  }
}
