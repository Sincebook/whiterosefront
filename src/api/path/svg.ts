import { Get } from "../server";

interface SvgData {
  id: number,
  svg: string,
  room_id: number,
  status: string,
  uptime: string,
  modify_time: string
}

export interface FcResponse<T> {
  code: string;
  data: T;
  errMsg: string;
}

export type ApiResponse<K> = Promise<[any, FcResponse<K> | undefined]>;

export function reqFindSvgByRoomId<T>(room_id: string): ApiResponse<T> {
  return Get<T>("/svgs/findByRoomId", { room_id });
}

export const svgApi = {
  reqFindSvgByRoomId,
};
