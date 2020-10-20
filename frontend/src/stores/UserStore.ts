import { Store } from '../Store';

interface User {
  id: number | undefined,
  username: string,
  loginTime: Date,
  loggedIn: boolean
}

class UserStore extends Store<User> {
  protected data(): User {
    return {
      id: undefined,
      username: 'no user',
      loginTime: new Date(Date.now()),
      loggedIn: false
    };
  }

  login(user: User): boolean {
    if(!this.isLogged()) {
      this.state.id = user.id;
      this.state.username = user.username;
      this.state.loginTime = new Date();
      this.state.loggedIn = true;
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
