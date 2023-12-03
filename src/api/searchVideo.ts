import { http } from "@/utils/http";
import { flaskApi } from "./utils";

export type VideoInfo = {
  /** 日期和时间 */
  date: string;
  /** 唯一标识符 */
  id: number;
  /** 源视频文件路径 */
  src: string;
  /** 用户信息（可能为空） */
  user: null | string;
};
export type VideoInfoArray = Array<VideoInfo>;
export const videoSearch = (src?: string) => {
  return http.request<VideoInfoArray>(
    "get",
    flaskApi("videos") + "?src=" + src
  );
};
