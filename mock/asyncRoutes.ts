// 模拟后端动态生成路由
import { MockMethod } from "vite-plugin-mock";

/**
 * roles：页面级别权限，这里模拟二种 "admin"、"common"
 * admin：管理员角色
 * common：普通角色
 */

const videoRouter = {
  path: "/videoprocess",
  meta: {
    title: "视频处理",
    icon: "lollipop",
    rank: 10
  },
  children: [
    {
      path: "/process/index",
      name: "process",
      meta: {
        title: "视频处理",
        roles: ["admin", "common"]
      }
    },
    {
      path: "/uploads/index",
      name: "uploadVideo",
      meta: {
        title: "视频上传",
        roles: ["admin", "common"]
      }
    },
    {
      path: "/uploads/img",
      name: "uploadimg",
      meta: {
        title: "图片上传",
        roles: ["admin", "common"]
      }
    }
  ]
};

export default [
  {
    url: "/getAsyncRoutes",
    method: "get",
    response: () => {
      return {
        success: true,
        data: [videoRouter]
      };
    }
  }
] as MockMethod[];
