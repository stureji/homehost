import { Store } from '../Store';

interface User extends Object {
  id: number | undefined,
  username: string,
  loginTime: Date
}

class UserStore extends Store<User> {
  protected data(): User {
    return {
      id: undefined,
      username: 'no user',
      loginTime: new Date(Date.now())
    };
  }

  login(user: User): boolean {
    if(!this.isLogged()) {
      this.state.id = user.id;
      this.state.username = user.username;
      this.state.loginTime = new Date();
      return true;
    }
    return false;
  }

  isLogged(): boolean {
    return this.state.id != undefined && this.state.username != 'no user';
  }

  currentUser(): String | undefined {
    if(this.isLogged()) {
      return this.getState().username;
    }
  }
}

export const userStore: UserStore = new UserStore();
