import React, {Component} from 'react';

class UpdateCreate extends Component {

  render() {
    const user = this.props.user;

    return (
      <form>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={this.props.onInputChange}
        />
        {user.id ? [
          <input key="update" type="button" value="Update" onClick={() => this.props.onUserUpdate(user)}/>,
          <input key="cancel" type="button" value="Cancel" onClick={this.props.cancelUserUpdate}/>
        ] : (
          <input type="button" value="Create" onClick={() => this.props.onUserCreate(user)}/>
        )}
      </form>
    );
  }
}

export default UpdateCreate;
