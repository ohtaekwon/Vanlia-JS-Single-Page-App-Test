import Dashboard from "./views/Dashboard.js";
import Post from "./views/Post.js";
import Settings from "./views/Settings.js";

const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
  // ["/posts/2", "2"]; 에서 id값에 해당하는 두 번째 값을 가져옴
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );
  console.log("keys", Array.from(match.route.path.matchAll(/:(\w+)/g)));
  return {};
};

const navigateTo = (url) => {
  history.pushState({}, null, url);
  router();
};

const router = async () => {
  // console.log(pathToRegex("/posts/:id")); // /^\/posts\/(.+)$/
  // posts/:id
  const routes = [
    { path: "/", view: Dashboard },
    { path: "/posts", view: Post },
    { path: "/posts/:id", view: Post },
    { path: "/settings", view: Settings },
  ];
  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });
  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );
  // "/posts/2".match(/^\/1posts\/(.+)$/) ==> null
  console.log("/posts/:id".match(/^\/posts\/(.+)$/));
  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  const view = new match.route.view(getParams(match));
  document.querySelector("#app").innerHTML = await view.getHtml();
  // console.log(match.route.view);
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
