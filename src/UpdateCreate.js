import React, {Component} from 'react';

class UpdateCreate extends Component {

  constructor(props) {
    super(props);

    this.emptyState = {
      id: '',
      name: ''
    };
    const user = props.user;
    if (user) {
      this.state = user;
    } else {
      this.state = this.emptyState;
    }
  }

  onInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  };

  onUpdate = () => {
    this.props.onUpdate(this.state);
    this.setState(this.emptyState);
  };

  onCancel = () => {
    this.props.onCancel();
    this.setState(this.emptyState);
  };

  render() {
    const user = this.state;

    return (
      <form>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={this.onInputChange}
        />
        {user.id ?
          <input key="update" type="button" value="Update" onClick={this.onUpdate}/>
          : <input type="button" value="Create" onClick={this.onUpdate}/>
        }
        <input key="cancel" type="button" value="Cancel" onClick={this.onCancel}/>
      </form>
    );
  }
}

export default UpdateCreate;
