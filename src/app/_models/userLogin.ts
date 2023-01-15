export class UserLogin implements IUserLogin {
    UserName: string;
    Password: string;

    constructor(data?: IUserLogin) {
        if (data) {
          for (var property in data) {
            if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
          }
        }
      }
      init(_data?: any) {
        if (_data) {
          this.UserName = _data['UserName'];
          this.Password = _data['Password'];
        }
      }
      static fromJS(data: any): UserLogin {
        data = typeof data === 'object' ? data : {};
        let result = new UserLogin();
        result.init(data);
        return result;
      }
    
      toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['UserName'] = this.UserName;
        data['Password'] = this.Password;
        return data;
      }
}


export interface IUserLogin{
    UserName: string;
    Password: string;
}