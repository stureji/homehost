import { Store } from '../Store';

interface User extends Object {
  id: number | undefined,
  username: string
}

class UserStore extends Store<User> {
  protected data(): User {
    return {
      id: undefined,
      username: 'user not logged in'
    };
  }

  login(user: User): boolean {
    if(!this.isLoggedIn()) {
      this.state.id = user.id;
      this.state.username = user.username;
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return this.state.id != undefined && this.state.username != 'user not logged in';
  }

  currentUser(): User {
    return this.getState();
  }
}

export const userStore: UserStore = new UserStore();
