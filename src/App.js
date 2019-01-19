import React, {Component} from 'react';
import UpdateCreate from "./UpdateCreate";
import ReadDelete from "./ReadDelete";
import DummyUserAPI from "./DummyUserAPI";

class App extends Component {
  constructor(props) {
    super(props);

    this._api = new DummyUserAPI();
    this.emptyUser = {
      id: null, name: '',
    };
    this.state = {
      users: [],
      editingUser: this.emptyUser,
    };
  }

  componentDidMount() {
    const users = this._api.list();
    this.setState({users: users})
  }

  createUser = (user) => {
    const {users} = this.state;
    user = this._api.create(user);
    this.setState({users: [...users, user]});
    this.resetUserUpdate();
  };

  updateUser = (user) => {
    user = this._api.update(user);
    // we don't use here a chain of `deleteUser, createUser` cause `this.setState` does not immediately update state
    // see docu about it https://reactjs.org/docs/react-component.html#setstate
    const otherUsers = this.state.users.filter((stateUser) => {
      return stateUser.id !== user.id;
    });
    this.setState({users: [...otherUsers, user]});
    this.resetUserUpdate();
  };

  deleteUser = (userId) => {
    this._api.delete(userId);
    const {users} = this.state;
    this.setState({
      users: users.filter((user) => {
        return user.id !== userId;
      })
    });
  };

  resetUserUpdate = () => {
    this.setState({editingUser: this.emptyUser});
  };

  setUserToUpdate = (userId) => {
    const user = this.state.users.find((user) => user.id === userId);
    const editingUser = Object.assign({}, user);
    this.setState({editingUser: editingUser});
  };

  onInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const editingUser = Object.assign({}, this.state.editingUser);
    editingUser[name] = value;
    this.setState({editingUser: editingUser});
  };

  render() {
    return (
      <div>
        <header>
          React CRUD Example
        </header>
        <ReadDelete
          users={this.state.users}
          onUserDelete={this.deleteUser} onUserUpdate={this.setUserToUpdate}
        />
        <UpdateCreate
          user={this.state.editingUser}
          onUserCreate={this.createUser} onUserUpdate={this.updateUser}
          cancelUserUpdate={this.resetUserUpdate} onInputChange={this.onInputChange}
        />
      </div>
    );
  }
}

export default App;
