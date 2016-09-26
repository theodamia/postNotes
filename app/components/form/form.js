import React from 'react';
import ReactDOM from 'react-dom';

import FormGroup from 'react-bootstrap/lib/FormGroup.js';
import FormControl from 'react-bootstrap/lib/FormControl.js';
import AddButton from '../buttons/AddButton.js';

export default class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit     = this.handleSubmit.bind(this);
  }
  handleTextChange(e) {
    this.setState({text: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();
    var text = this.state.text.trim();

    if(!text) {
      return;
    }
    this.props.onPostSubmit({text: text});
    this.setState({text: ''});
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <FormGroup>
          <FormControl
            className="center"
            componentClass="textarea"
            placeholder="Write a Post..."
            value={this.state.text}
            onChange={this.handleTextChange}
          />
          <div className="sm-margintop">
            <AddButton />
          </div>
        </FormGroup>
      </form>
    );
  }
}
