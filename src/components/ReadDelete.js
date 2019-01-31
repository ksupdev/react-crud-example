import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {List, ListItem, ListItemText, ListItemSecondaryAction} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import {Delete, Edit} from '@material-ui/icons';

import {getUserList} from '../redux/selectors';
import { deleteUser } from '../redux/actions';

class ReadDelete extends Component {
  render() {
    const props = this.props;

    return (
      <List>
        {props.users.map((user) => {
          return (
            <ListItem key={user.id}>
              <ListItemText primary={user.name}/>
              <ListItemSecondaryAction>
                <IconButton color="primary" component={Link} to={`/update/${user.id}`}>
                  <Edit/>
                </IconButton>
                <IconButton color="primary" onClick={() => this.props.deleteUser(user.id)}>
                  <Delete/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    );
  }
}

const mapStateToProps = (state) => {
  const users = getUserList(state);
  return {users};
};
export default connect(mapStateToProps, {deleteUser})(ReadDelete);
