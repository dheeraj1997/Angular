export class LoginUser {
  username: string;
  password: string;
  fcmToken: string;

  constructor(username: string, password: string, fcmToken?: string) {
    this.username = username;
    if (fcmToken) {
      this.fcmToken = fcmToken;
    }
    if (password) {
      this.password = password;
    }
  }
}
