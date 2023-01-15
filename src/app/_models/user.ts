export class User implements IUser {
    UserName: string;
    IsAdmin: boolean;
    FriendlyName: string;
    UserType: string;

    constructor(data?: IUser) {
        if (data) {
          for (var property in data) {
            if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
          }
        }
      }
      init(_data?: any) {
        if (_data) {
          this.UserName = _data['UserName'];
          this.IsAdmin = _data['IsAdmin'];
          this.FriendlyName = _data['FriendlyName'];
          this.UserType = _data['UserType'];
        }
      }
      static fromJS(data: any): User {
        data = typeof data === 'object' ? data : {};
        let result = new User();
        result.init(data);
        return result;
      }
    
      toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['UserName'] = this.UserName;
        data['IsAdmin'] = this.IsAdmin;
        data['FriendlyName'] = this.FriendlyName;
        data['UserType'] = this.UserType;
        return data;
      }
}

export interface IUser{
    UserName: string;
    IsAdmin: boolean;
    FriendlyName: string;
    UserType: string;
}