import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';

export default class AddButton extends React.Component {
    render(){
      return (
        <Button bsStyle="warning" value="Favourite">Favourite</Button>
      );
    }
}