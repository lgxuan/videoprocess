import { http } from "@/utils/http";
import { flaskApi } from "./utils";
export type uploadResult = {
  success: boolean;
  leader: string;
};
export const uploadVideo = (data?: object) => {
  return http.request<uploadResult>("post", flaskApi("upload"), {data} );
};
export const getToken = ()