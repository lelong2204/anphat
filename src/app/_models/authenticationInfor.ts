export class AuthenticationInfo implements IAuthenticationInfo{
    UserName: string;
    AuthToken: string;

    constructor(data?:IAuthenticationInfo) {
        if (data) {
            for (var property in data) {
              if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
            }
          }
    }
    init(_data?: any) {
        if (_data) {
          this.UserName = _data['UserName'];
          this.AuthToken = _data['AuthToken'];
        }
      }
      static fromJS(data: any): AuthenticationInfo {
        data = typeof data === 'object' ? data : {};
        let result = new AuthenticationInfo();
        result.init(data);
        return result;
      }
    
      toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['UserName'] = this.UserName;
        data['AuthToken'] = this.AuthToken;
        return data;
      }
}

export interface IAuthenticationInfo{
    UserName: string;
    AuthToken: string;
}