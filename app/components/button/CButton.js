import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';

export default class CButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {id, value, title, bsStyle, type, onClick, text} = this.props;
    return (
      <Button
        id={id}
        value={value}
        title={title}
        bsStyle={bsStyle}
        type={type}
        onClick={onClick}>
          {text}
      </Button>
    );
  }
}
