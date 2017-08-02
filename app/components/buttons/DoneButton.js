import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';

export default class DoneButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Button
        id="btnDone"
        value="Done"
        title="Done"
        onClick={this.props.handleDoneChange}/>
    );
  }
}
