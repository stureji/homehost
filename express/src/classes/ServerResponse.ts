import {DataScheme, SchemeJSON} from "./data/DataScheme";

interface ServerResponseJSON {
  status: number,
  message: string | undefined,
  data?: object[] | [],
  error?: string | null
}

export default class ServerResponse {
  static ALLOWED_STATUS: Map<number, string> = new Map([
    [200, 'OK'],
    [201, 'CREATED'],
    [204, 'NO_CONTENT'],
    [400, 'BAD_REQUEST'],
    [401, 'UNAUTHORIZED'],
    [403, 'FORBIDDEN'],
    [404, 'NOT_FOUND'],
    [500, 'INTERNAL_SERVER_ERROR']
  ]);

  #json: ServerResponseJSON;

  constructor() {
    this.#json = {
      status: 400,
      message: 'BAD_REQUEST'
    };
  }

  set status(code: number) {
    if(ServerResponse.ALLOWED_STATUS.has(code)) {
      this.#json.status = code;
      this.#json.message = ServerResponse.ALLOWED_STATUS.get(code);
    }
  }

  set data(value: DataScheme<SchemeJSON>[] | null | undefined) {
    if(value != null && value != undefined) {
      this.#json.data = value.map(d => d.toJson());
      this.status = 200;
    } else {
      this.status = 204;
    }
  }

  set error(error: Error) {
    this.#json.error = error.message;
  }

  get json(): ServerResponseJSON {
    if(this.#json.status < 500) {
      return (({status, message, data}) => ({status, message, data}))(this.#json);
    } else {
      return (({status, message, error}) => ({status, message, error}))(this.#json);
    }
  }
}
