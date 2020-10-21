import {DataScheme, SchemeJSON} from "./data/DataScheme";

interface ServerResponseJSON {
  status: number,
  message: string | undefined,
  data?: object[] | [],
  error?: string | null
}

/**
 * Create a ServerResponse at the moment when you intend to handle an incoming HTTP request. Later, when you
 * wish to send the HTTP request, call for its json object. ServerResponse will automatically set status
 * codes depending on how you handle the object, ensuring correct HTTP response status codes and response
 * status messages gets sent to the clients. You can always override the automatic status code and the hooks
 * that decide return behaviour.
 */
export default class ServerResponse {
  static ALLOWED_STATUS: Map<number, string> = new Map([
    [200, 'OK'],
    [201, 'CREATED'],
    [202, 'ACCEPTED'],
    [204, 'NO_CONTENT'],
    [400, 'BAD_REQUEST'],
    [401, 'UNAUTHORIZED'],
    [403, 'FORBIDDEN'],
    [404, 'NOT_FOUND'],
    [500, 'INTERNAL_SERVER_ERROR']
  ]);

  private method: string;
  private uri: string;
  private log = () => { return this.method.length < 8 && this.method.length > 0 && this.uri.length > 0; }
  _json: ServerResponseJSON;

  constructor(method:string = '', uri: string = '') {
    this.method = method.toUpperCase();
    this.uri = uri.toLocaleLowerCase();
    this._json = {
      status: 400,
      message: 'BAD_REQUEST'
    };

    if(this.log()) {
      console.log('-> |: ' + this.method + ' '.repeat(Math.max(8 - this.method.length, 1)) + this.uri);
    }
  }

  get status() {
    return this._json.status;
  }

  /**
   * Sets the status to one of the supproted codes. Throws error if not allowed to set specific status code.
   */
  set status(code: number) {
    if(ServerResponse.ALLOWED_STATUS.has(code)) {
      this._json.status = code;
      this._json.message = ServerResponse.ALLOWED_STATUS.get(code);
    } else {
      throw new Error('HTTP Status code [' + code + '] not supported!');
    }
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
    // There should be guards in js imo, like scala or haskell
    const status: number = this._json.status;
    if(this.log()) {
      console.log('<- |: ' + this.method + ' '.repeat(Math.max(8 - this.method.length, 1)) + this.uri +
      ' '.repeat(Math.max(24 - this.method.length - this.uri.length, 1)) + status + ' ' + this._json.message);
    }
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

  // These functions could be overridden by subclasses making room for decorative design patterns
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
