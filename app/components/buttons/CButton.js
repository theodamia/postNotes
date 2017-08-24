import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';

export default class CButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const props = {
      id: this.props.id,
      value: this.props.value,
      title: this.props.title,
      bsStyle: this.props.bsStyle,
      type: this.props.type,
      onClick: this.props.onClick,
      text: this.props.text
    }
    return (
      <Button
        id={this.props.id}
        value={this.props.value}
        title={this.props.title}
        bsStyle={this.props.bsStyle}
        type={this.props.type}
        onClick={this.props.onClick}
      >
        {this.props.text}
      </Button>
    );
  }
}
