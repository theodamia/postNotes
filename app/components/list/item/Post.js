import ListGroupItem from 'react-bootstrap/lib/ListGroupItem.js'
import React from 'react'
import ReactDOM from 'react-dom'

export default class Post extends React.Component {
  render() {
    return (
      <ListGroupItem>{this.props.children}</ListGroupItem>
    );
  }
}
