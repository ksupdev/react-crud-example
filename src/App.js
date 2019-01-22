import React, {Component} from 'react';
import {Link, matchPath, Route, Switch} from 'react-router-dom';
import Media from 'react-media';
import DummyUserAPI from './DummyUserAPI';
import ReadDelete from './ReadDelete';
import UpdateCreate from './UpdateCreate';

class App extends Component {
  constructor(props) {
    super(props);

    this._api = new DummyUserAPI();
    this.state = {
      users: this._api.list(),
    };
  }

  findUser = (userId) => {
    if (userId) {
      userId = parseInt(userId);
      const user = this.state.users.find(user => user.id === userId);
      if (user) {
        return user;
      }
    }
    return null;
  };

  createUser = (user) => {
    const {users} = this.state;
    user = this._api.create(user);
    this.setState({users: [...users, user]});
  };

  updateUser = (user) => {
    user = this._api.update(user);
    // we don't use here a chain of `deleteUser, createUser` cause `this.setState` does not immediately update state
    // see docu about it https://reactjs.org/docs/react-component.html#setstate
    const otherUsers = this.state.users.filter((stateUser) => {
      return stateUser.id !== user.id;
    });
    this.setState({users: [...otherUsers, user]});
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

  onUserUpdate = (user) => {
    if (user.id) {
      this.updateUser(user);
    } else {
      this.createUser(user);
    }
    this.resetUserUpdate();
  };

  resetUserUpdate = () => {
    this.props.history.push('/');
  };

  render() {
    return (<Media query={{maxWidth: 599}}>
      {screenIsSmall => screenIsSmall ?
        this.renderSmallScreen()
        : this.renderBigScreen()
      }
    </Media>);
  }

  renderSmallScreen() {
    const {users} = this.state;

    return (
      <Switch>
        <Route exact path="/" render={props =>
          <React.Fragment>
            <ReadDelete users={users} onDelete={this.deleteUser} {...props}/>
            <Link to="/update">Create New</Link>
          </React.Fragment>
        }
        />
        <Route path="/update/:id?" render={props =>
          <UpdateCreate
            user={this.findUser(props.match.params.id)}
            onUpdate={this.onUserUpdate} onCancel={this.resetUserUpdate}
          />
        }/>
      </Switch>
    )
  }

  renderBigScreen() {
    const {users} = this.state;
    let updateUserId;
    const updateMatch = matchPath(this.props.match.url, {path: '/update/:id', exact: true});
    if (updateMatch) {
      updateUserId = parseInt(updateMatch.params.id);
    }

    return (
      <React.Fragment>
        <ReadDelete users={users} onDelete={this.deleteUser}/>
        <UpdateCreate
          user={this.findUser(updateUserId)} key={updateUserId}
          onUpdate={this.onUserUpdate} onCancel={this.resetUserUpdate}
        />
      </React.Fragment>
    )
  }
}

export default App;
