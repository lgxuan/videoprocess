import { http } from "@/utils/http";
import { flaskApi } from "./utils";

export type VideoProcessResponse = {
  errno: number;
  error: string;
  data: Array<{
    dst: string;
    result: number;
    src: string;
  }>;
};
export type videoProgress = {
  /** 错误号 */
  errno: number;
  /** 错误信息 */
  error: string;
  /** 数据数组 */
  data: Array<{
    /** 目标文件路径 */
    dst: string;
    /** 结果码 */
    result: number;
    /** 源文件路径 */
    src: string;
  }>;
};


export const setres = (data?: object) => {
  return http.request<VideoProcessResponse>("post", flaskApi("videoProcess/set"), { data });
};
export const prores = (data?: object) => {
  return http.request<videoProgress>("post", flaskApi("videoProcess/result"), { data });
};