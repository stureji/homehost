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

  _json: ServerResponseJSON;

  constructor(log: string = '') {
    this._json = {
      status: 400,
      message: 'BAD_REQUEST'
    };

    if(log.length > 0) {
      console.log(log);
    }
  }

  set status(code: number) {
    if(ServerResponse.ALLOWED_STATUS.has(code)) {
      this._json.status = code;
      this._json.message = ServerResponse.ALLOWED_STATUS.get(code);
    } else {
      throw new Error('HTTP Status code [' + code + '] not supported!!!');
    }
  }

  get status() {
    return this._json.status;
  }

  set data(value: DataScheme<SchemeJSON>[] | null | undefined) {
    if(value != null && value != undefined) {
      this._json.data = value.map(d => d.toJson());
      this.status = 200;
    } else {
      this.status = 204;
    }
  }

  set error(error: Error) {
    this._json.error = error.message;
  }

  get json(): ServerResponseJSON {
    // There should be guard syntax for js!!!
    const status: number = this._json.status;
    if(status >= 100 && status < 700) {
      if(status >= 100 && status < 200) {
        return this.onInfo();
      } else if(status >= 200 && status < 300) {
        return this.onSucces();
      } else if(status >= 300 && status < 400) {
        return this.onRedirect();
      } else if(status >= 400 && status < 500) {
        return this.onClientError();
      } else if(status >= 500 && status < 600) {
        return this.onServerError();
      }else {
        return this.onIllegalRange();
      }
    } else {
      return this.onIllegalRange();
    }
  }

  public onInfo(): ServerResponseJSON {
    return (({status, message}) => ({status, message}))(this._json);
  }

  public onSucces(): ServerResponseJSON {
    return (({status, message, data}) => ({status, message, data}))(this._json);
  }

  public onRedirect(): ServerResponseJSON {
    return (({status, message}) => ({status, message}))(this._json);
  }

  public onClientError(): ServerResponseJSON {
    return (({status, message, error}) => ({status, message, error}))(this._json);
  }

  public onServerError(): ServerResponseJSON {
    return (({status, message}) => ({status, message}))(this._json);
  }

  public onIllegalRange(): ServerResponseJSON {
    return {status: 500, message: "INTERNAL_SERVER_ERROR"};
  }
}
