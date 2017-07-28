import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';

export default class UndoneButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <Button
        id="btnUndone"
        value="Undone"
        title="Undone"
        onClick={this.props.handleDoneChange}/>
    );
  }
}
