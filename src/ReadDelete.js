import React, {Component} from 'react';

class ReadDelete extends Component {
  render() {
    const props = this.props;
    const body = props.users.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>
            <button onClick={() => props.onUserUpdate(user.id)}>Edit</button>
            <button onClick={() => props.onUserDelete(user.id)}>Delete</button>
          </td>
        </tr>
      );
    });

    return (
      <table>
        <Header/>
        <tbody>{body}</tbody>
      </table>
    );
  }
}

const Header = (() => (
  <thead>
  <tr>
    <th>Name</th>
    <th>Actions</th>
  </tr>
  </thead>
));

export default ReadDelete;
