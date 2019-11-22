import { NotFound, DashBoard, Login, ArticleList, ArticleEdit, Settings } from "../views";

export const mainRoutes = [
  {
    pathname: "/login",
    component: Login
  },
  {
    pathname: "/404",
    component: NotFound
  },
  {
    pathname: "/login",
    component: Login
  }
];

export const adminRoutes = [
  {
    pathname: "/admin/dashboard",
    component: DashBoard,
    title: "仪表盘",
    isNav: true,
    icon: 'dashboard'
  },
  {
    pathname: "/admin/article",
    component: ArticleList,
    exact: true,
    title: "文章列表",
    isNav: true,
    icon: 'unordered-list'
  },
  {
    pathname: "/admin/article/edit/:orderNo",
    component: ArticleEdit,
    title: "文章编辑"
  },
  {
    pathname: "/admin/settings",
    component: Settings,
    title: "设置",
    isNav: true,
    icon: 'setting'
  }
];
