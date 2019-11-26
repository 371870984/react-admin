import { NotFound, DashBoard, Login, ArticleList, ArticleEdit, Settings, NoAuth, Profile } from "../views";

export const mainRoutes = [
  {
    pathname: "/login",
    component: Login
  },
  {
    pathname: "/404",
    component: NotFound
  }
];

export const adminRoutes = [
  {
    pathname: "/admin/dashboard",
    component: DashBoard,
    title: "仪表盘",
    isNav: true,
    icon: "dashboard",
    roles: ["001", "002"]
  },
  {
    pathname: "/admin/article",
    component: ArticleList,
    exact: true,
    title: "文章列表",
    isNav: true,
    icon: "unordered-list",
    roles: ["001", "002"]
  },
  {
    pathname: "/admin/article/edit/:orderNo",
    component: ArticleEdit,
    title: "文章编辑",
    roles: ["001", "002"]
  },
  {
    pathname: "/admin/settings",
    component: Settings,
    title: "设置",
    isNav: true,
    icon: "setting",
    roles: ["001"]
  },
  {
    pathname: "/admin/noauth",
    component: NoAuth,
    title: "没有权限",
    roles: ["001", "002"]
  },
  {
    pathname: "/admin/profile",
    component: Profile,
    title: "个人中心",
    roles: ["001", "002"]
  }
];
