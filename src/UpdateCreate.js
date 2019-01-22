import React, {Component} from 'react';
import {TextField, Button, withStyles} from "@material-ui/core";


const styles = ({spacing: {unit}}) => ({
  form: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-evenly',
    marginBottom: unit
  }
});

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
    const {classes} = this.props;

    return (
      <form className={classes.form}>
        <TextField
          name="name"
          label="Username"
          value={user.name}
          onChange={this.onInputChange}
          margin="normal"
        />
        {user.id ?
          <Button key="update" type="submit" color="primary" variant="contained" onClick={this.onUpdate}>
            Update
          </Button>
          :
          <Button key="create" type="submit" color="primary" variant="contained" onClick={this.onUpdate}>
            Create
          </Button>
        }
        <Button key="cancel" type="submit" color="primary" variant="contained" onClick={this.onCancel}>
          Cancel
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(UpdateCreate);
