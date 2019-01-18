import React, {Component} from 'react';
import UpdateCreate from "./UpdateCreate";
import ReadDelete from "./ReadDelete";

class App extends Component {
  constructor(props) {
    super(props);

    this.emptyUser = {
      id: null, name: '',
    };
    this.state = {
      users: [
        {id: 1, name: 'Bill'},
        {id: 2, name: 'Kate'},
      ],
      editingUser: this.emptyUser,
    };
  }

  createUser = (user) => {
    const {users} = this.state;
    if (!user.id) {
      let userIds = users.map(user => user.id);
      if (userIds.length > 0) {
        user.id = Math.max(...userIds) + 1;
      } else {
        user.id = 1;
      }
    }
    this.setState({users: [...users, user]});
    this.resetUserUpdate();
  };

  updateUser = (user) => {
    // we don't use here a chain of `deleteUser, createUser` cause `this.setState` does not immediately update state
    // see docu about it https://reactjs.org/docs/react-component.html#setstate
    const newStateUsers = this.state.users.filter((stateUser) => {
      return stateUser.id !== user.id;
    });
    newStateUsers.push(user);
    this.setState({users: newStateUsers});
    this.resetUserUpdate();
  };

  deleteUser = (userId) => {
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
