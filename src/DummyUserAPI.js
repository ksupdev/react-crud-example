class DummyUserAPI {

  static STORAGE_KEY = 'dummy-user-api';

  constructor() {
    this._users = DummyUserAPI._restoreUsers();
    if (!this._users.length) {
      this.create({id: 1, name: 'John'});
      this.create({id: 2, name: 'Anna'});
    }
  }

  list() {
    return this._users;
  }

  create(user) {
    let userIds = this._users.map(user => user.id);
    if (userIds.length > 0) {
      user.id = Math.max(...userIds) + 1;
    } else {
      user.id = 1;
    }
    this._users = [...this._users, user];
    this._saveUsers();
    return user;
  }

  update(user) {
    const otherUsers = this._users.filter((_user) => {
      return _user.id !== user.id;
    });
    this._users = [...otherUsers, user];
    this._saveUsers();
    return user;
  }

  delete(id) {
    this._users = this._users.filter((user) => {
      return user.id !== id;
    });
    this._saveUsers();
  }

  static _restoreUsers() {
    let users = localStorage.getItem(DummyUserAPI.STORAGE_KEY);
    if (!users) {
      return [];
    } else {
      return JSON.parse(users);
    }
  }

  _saveUsers() {
    localStorage.setItem(DummyUserAPI.STORAGE_KEY, JSON.stringify(this._users));
  }
}

export default DummyUserAPI
