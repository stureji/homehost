import DataScheme from "./data/DataScheme";

interface ServerResponseJSON {
  status: number,
  message: string | undefined,
  data?: Object[] | [],
  error?: string | undefined
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

  private json: ServerResponseJSON;

  constructor() {
    this.json = {
      status: 400,
      message: 'BAD_REQUEST'
    };
  }

  set status(code: number) {
    if(ServerResponse.ALLOWED_STATUS.has(code)) {
      this.json.status = code;
      this.json.message = ServerResponse.ALLOWED_STATUS.get(code);
    }
  }

  set data(data: DataScheme<JSON>[]) {
    this.json.data = data.map(d => d.toJson());
  }

  toJson(): ServerResponseJSON {
    return this.json;
  }
}
