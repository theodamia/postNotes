import ListGroupItem from 'react-bootstrap/lib/ListGroupItem.js'
import { SplitButton, MenuItem, DropdownButton } from 'react-bootstrap/lib'
import Button from '../../button/Button.js'
import Icon from '../../button/Icon.js'
import classnames from 'classnames'

export default class Post extends React.Component {
  render() {
    const {post} = this.props
    var statusTypes = [{id: "1", type: "default"},{id: "2", type: "important"},
      {id: "3", type: "ongoing"},{id: "4", type: "completed"}];
    return (
      <ListGroupItem className={classnames("plist__item", {
          "plist__item--default": post.status === "default",
          "plist__item--important": post.status === "important",
          "plist__item--ongoing": post.status === "ongoing",
          "plist__item--completed": post.status === "completed"
      })}>
        <div className="plist__item-title">
          <input
            type="text"
            readOnly="true"
            defaultValue={post.title}
            onBlur={(e) => {this.props.handleBlur(e, post._id, "title")}}
            onKeyDown={(e) => {this.props.handleKeyDown(e, "title")}}
          />
        </div>
        { this.props.checkText ?
          <div className="plist__item-text">
            <input
              type="text"
              readOnly="true"
              defaultValue={post.text}
              onBlur={(e) => {this.props.handleBlur(e, post._id, "text")}}
              onKeyDown={(e) => {this.props.handleKeyDown(e, "text")}}
            />
          </div>
          : null }
        <div className="plist__item-icons">
          <span>
            <DropdownButton title="Status" className="dropdown" id="dropdown-basic">
              {statusTypes.map(status => (
                <MenuItem eventKey={status.id} key={status.id} onSelect={() => {this.props.onStatusChange(post._id, status.type)}}>
                  {_.capitalize(status.type)}
                  <div className={"dropdown__palette dropdown__palette--" + status.type}></div>
                </MenuItem>
              ))}
            </DropdownButton>
          </span>
          <span>
            <i className="fa fa-trash fa-fw icon"
              value="Delete"
              title="Delete"
              onClick={() => {this.props.handlerDelete(post)}}></i>
          </span>
        </div>
      </ListGroupItem>
    );
  }
}
