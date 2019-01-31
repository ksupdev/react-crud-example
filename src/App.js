import React, {Component} from 'react';
import {Link, matchPath, Route, Switch} from 'react-router-dom';
import Media from 'react-media';
import {Button} from '@material-ui/core';
import {connect} from 'react-redux';

import ReadDelete from './components/ReadDelete';
import UpdateCreate from './components/UpdateCreate';
import {createUser, updateUser} from './redux/actions';

class App extends Component {

  onUserUpdate = (user) => {
    if (user.id) {
      this.props.updateUser(user);
    } else {
      this.props.createUser(user);
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
    return (
      <Switch>
        <Route exact path="/" render={props =>
          <React.Fragment>
            <ReadDelete {...props}/>
            <Button color="primary" variant="contained" component={Link} to="/update">
              Create New
            </Button>
          </React.Fragment>
        }
        />
        <Route path="/update/:id?" render={props =>
          <UpdateCreate
            userId={parseInt(props.match.params.id)}
            onUpdate={this.onUserUpdate} onCancel={this.resetUserUpdate}
          />
        }/>
      </Switch>
    )
  }

  renderBigScreen() {
    let updateUserId;
    const updateMatch = matchPath(this.props.match.url, {path: '/update/:id', exact: true});
    if (updateMatch) {
      updateUserId = parseInt(updateMatch.params.id);
    }

    return (
      <React.Fragment>
        <ReadDelete/>
        <UpdateCreate
          userId={updateUserId} key={updateUserId}
          onUpdate={this.onUserUpdate} onCancel={this.resetUserUpdate}
        />
      </React.Fragment>
    )
  }
}

export default connect(null, {createUser, updateUser})(App);
