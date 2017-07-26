import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';

export default class DeleteButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      // <Button
      //   id="btnDelete"
      //   className="btn-list"
      //   bsStyle="danger"
      //   value="Delete"
      //   onClick={this.props.handlerDelete}>
      //     Delete
      // </Button>
      <Button
        id="btnDelete"
        value="Delete"
        title="Delete"
        onClick={this.props.handlerDelete}/>
    );
  }
}
