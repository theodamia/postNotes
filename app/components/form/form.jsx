import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import Button from '../button/button';

import './form.post.css';

class Form extends React.Component {
  state = {
    title: '',
    text: '',
    checkTitle: false,
  };
  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  }
  handleTextChange = (e) => {
    this.setState({ text: e.target.value });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const title = this.state.title.trim();
    const text = this.state.text.trim();

    if (!title) {
      this.setState({ checkTitle: true });
      return;
    }

    this.props.onPostSubmit({
      title,
      text,
    });

    this.setState({
      title: '',
      text: '',
    });
  }
  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.handleSubmit(e);
    }
  }
  render() {
    return (
      <section className="form">
        <form onSubmit={this.handleSubmit}>
          <FormGroup className="form-inner">
            <FormControl
              type="text"
              className="form-title"
              placeholder="Write a title..."
              value={this.state.title}
              onChange={this.handleTitleChange}
              onKeyDown={this.handleKeyDown}
            />
            <ControlLabel className="form-alert">
              {this.state.checkTitle ? 'You must write a title!' : '' }
            </ControlLabel>
            <FormControl
              className="form-text"
              componentClass="textarea"
              placeholder="Write a Note..."
              value={this.state.text}
              onChange={this.handleTextChange}
              onKeyDown={this.handleKeyDown}
            />
            <div className="sm-margintop">
              <Button bsStyle="primary" type="submit" value="Post" text="Add Note" />
            </div>
          </FormGroup>
        </form>
      </section>
    );
  }
}

Form.propTypes = {
  onPostSubmit: PropTypes.func,
};

Form.defaultProps = {
  onPostSubmit: () => false,
};

export default Form;
