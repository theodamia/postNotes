import ListGroupItem from 'react-bootstrap/lib/ListGroupItem.js'
import Button from '../../button/Button.js'
import Icon from '../../button/Icon.js'

export default class Post extends React.Component {
  render() {
    const {post} = this.props
    return (
      <ListGroupItem>
        <input data-id={post._id} className="npt-text" type="text" readOnly="true"
       defaultValue={post.text} onBlur={(e) => {this.props.handleOnBlur(e)}} />
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
    </ListGroupItem>
    );
  }
}
