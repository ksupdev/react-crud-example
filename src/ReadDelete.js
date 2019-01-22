import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ReadDelete extends Component {
  render() {
    const props = this.props;
    const body = props.users.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>
            <Link to={`/update/${user.id}`}>Edit</Link>
            <button onClick={() => props.onDelete(user.id)}>Delete</button>
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
