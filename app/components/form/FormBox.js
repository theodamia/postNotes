import React from 'react';
import ReactDOM from 'react-dom';

import FormGroup from 'react-bootstrap/lib/FormGroup.js';
import FormControl from 'react-bootstrap/lib/FormControl.js';
import AddButton from '../buttons/AddButton.js';

export default class FormBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit     = this.handleSubmit.bind(this);
    this.handleKeyDown    = this.handleKeyDown.bind(this);
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
  handleKeyDown(e) {
    if(e.keyCode == 13) {
      this.handleSubmit(e);
    }
  }
  render() {
    return (
      <div className="col-lg-12">
        <div className="ta-center md-margintop md-marginbot">
          <form onSubmit={this.handleSubmit}>
            <FormGroup>
              <FormControl
                className="center"
                componentClass="textarea"
                placeholder="Write a Note..."
                value={this.state.text}
                onChange={this.handleTextChange}
                onKeyDown={this.handleKeyDown}
              />
              <div className="sm-margintop">
                <AddButton />
              </div>
            </FormGroup>
          </form>
        </div>
      </div>
    );
  }
}