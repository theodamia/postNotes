import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';

export default class DeleteButton extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick() {
    this.props.handlerDelete();
  }
  render() {
    return (
      <Button
        id="btnDelete"
        className="btnList"
        bsStyle="danger"
        value="Delete"
        onClick={this.props.handlerDelete}>
          Delete
      </Button>
    );
  }
}
