import { http } from "@/utils/http";
import { flaskApi } from "./utils";

export type LeaderInfo = {
  /** 日期和时间 */
  date: string;
  /** 唯一标识符 */
  id: number;
  /** 源视频文件路径 */
  leader: string;
  /** 用户信息（可能为空） */
  user: null | string;
};
export type LeaderInfoArray = Array<LeaderInfo>;
export const LeaderSearch = (src?: string) => {
  return http.request<LeaderInfoArray>(
    "get",
    flaskApi("leader") + "?leader=" + src
  );
};
