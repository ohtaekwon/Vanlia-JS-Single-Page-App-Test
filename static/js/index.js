import Dashboard from "./views/Dashboard.js";
import Post from "./views/Post.js";
const navigateTo = (url) => {
  history.pushState({}, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/", view: Dashboard },
    { path: "/posts", view: Post },
    { path: "/settings", view: () => console.log("settings page") },
  ];
  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });
  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  const view = new match.route.view();
  document.querySelector("#app").innerHTML = await view.getHtml();
  console.log(match.route.view);
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    //이벤트 위임을 위해 작성하는 코드
    //data-link라는 data attribute를 가진 링크에만 작동하도록 조건문을 작성해 이벤트를 위임한다
    if (e.target.matches("[data-link]")) {
      // 그리고 페이지 콘텐츠 변경 및 path 이동을 위해 우리가 만든 함수를 대신 실행한다
      // 링크가 가진 href를 url로 삼아서 함수를 실행한다
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});
