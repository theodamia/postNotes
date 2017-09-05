import React from 'react'
import ReactDOM from 'react-dom'
import { map } from 'lodash'

import CButton from '../button/CButton.js'
import Post from './item/Post.js'
import ListGroup from 'react-bootstrap/lib/ListGroup.js'

export default class PostList extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnBlur  = this.handleOnBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  handleOnBlur(e) {
    e.preventDefault();

    var text = e.target.value.trim();
    var _id = e.target.getAttribute('data-id');

    if(!text) {
      return;
    }

    this.props.onTextUpdate({
      text: text,
      _id: _id
    });
  }
  handleKeyDown(e) {
    if(e.keyCode == 13) {
      this.handleOnBlur(e);
    }
  }
  render() {
    var postNodes = this.props.data.filter((post) => {
      return post.done === this.props.done;
    })
    .map((post) => {
      if(this.props.done) {
        var doneButton = <CButton id="btnUndone" value="Undone" title="Undone" onClick={() => {this.props.handleDoneChange(post)}}/>
      } else {
        var doneButton = <CButton id="btnDone" value="Done" title="Done" onClick={() => {this.props.handleDoneChange(post)}}/>
      }
      return (
        <Post key={post._id}>
          <input data-id={post._id} className="npt-text" type="text" readOnly="true"
           defaultValue={post.text} onBlur={this.handleOnBlur} />
          <span>
            {doneButton}
            <CButton id="btnDelete" value="Delete" title="Delete" onClick={() => {this.props.handlerDelete(post)}}/>
          </span>
        </Post>
      )
    });
    return (
      <div className="post-list col-lg-6">
        <h3 className="sm-marginbot">Notes List</h3>
        <ListGroup className="list">
          {postNodes}
        </ListGroup>
      </div>
    );
  }
}
