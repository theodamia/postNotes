import ListGroupItem from 'react-bootstrap/lib/ListGroupItem.js'
import { SplitButton, MenuItem, DropdownButton } from 'react-bootstrap/lib'
import Button from '../../button/Button.js'
import Icon from '../../button/Icon.js'

export default class Post extends React.Component {
  render() {
    const {post} = this.props
    console.log(post.status);
    return (
      <ListGroupItem className="list-item">
        <div className={"list-item-title " + post.status}>
          <input
            data-id={post._id}
            className="npt-title"
            type="text"
            readOnly="true"
            defaultValue={post.title}
            onBlur={(e) => {this.props.handleBlur(e, "title")}}
            onKeyDown={(e) => {this.props.handleKeyDown(e, "title")}}
          />
        </div>
        { this.props.checkText ?
          <div className="list-item-text">
            <input
              data-id={post._id}
              className="npt-text"
              type="text"
              readOnly="true"
              defaultValue={post.text}
              onBlur={(e) => {this.props.handleBlur(e, "text")}}
              onKeyDown={(e) => {this.props.handleKeyDown(e, "text")}}
            />
          </div>
          : null }
        <div className="list-item-icons">
          <span>
            <i className= {post.done ? "fa fa-times fa-fw icon" : "fa fa-check-circle-o fa-fw icon"}
              value={post.done ? "Done" : "Undone"}
              title={post.done ? "Undone" : "Done"}
              onClick={() => {this.props.handleDoneChange(post)}}></i>
          </span>
          <span>
            <i className="fa fa-trash fa-fw icon-delete"
              value="Delete"
              title="Delete"
              onClick={() => {this.props.handlerDelete(post)}}></i>
          </span>
          <span>
            <DropdownButton title="Status" className="dropdown" id="dropdown-basic">
              <MenuItem eventKey="1" onClick={(e) => {this.props.onStatusChange(e, post._id, "default")}}>
                Default
                <div className="default"></div>
              </MenuItem>
              <MenuItem eventKey="2" onClick={(e) => {this.props.onStatusChange(e, post._id, "important")}}>
                Important
                <div className="important"></div>
              </MenuItem>
              <MenuItem eventKey="3" onClick={(e) => {this.props.onStatusChange(e, post._id, "ongoing")}}>
                Ongoing
                <div className="ongoing"></div>
              </MenuItem>
              <MenuItem eventKey="4">
                Completed
                <div className="color-palette completed"></div>
              </MenuItem>
            </DropdownButton>
          </span>
        </div>
      </ListGroupItem>
    );
  }
}
