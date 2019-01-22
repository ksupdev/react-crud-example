import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {List, ListItem, ListItemText, ListItemSecondaryAction} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import {Delete, Edit} from '@material-ui/icons';

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
                <IconButton color="primary" onClick={() => props.onDelete(user.id)}>
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

export default ReadDelete;
