import ListGroupItem from 'react-bootstrap/lib/ListGroupItem.js'
import CButton from '../../button/CButton.js'

export default class Post extends React.Component {
  render() {
    const {post} = this.props
    return (
      <ListGroupItem>
        <input data-id={post._id} className="npt-text" type="text" readOnly="true"
       defaultValue={post.text} onBlur={(e) => {this.props.handleOnBlur(e)}} />
        <span>
          <CButton
            id={post.done ? "btnUndone" : "btnDone"}
            value={post.done ? "Done" : "Undone"}
            title={post.done ? "Done" : "Undone"}
            onClick={() => {this.props.handleDoneChange(post)}}/>
          <CButton
            id="btnDelete"
            value="Delete"
            title="Delete"
            onClick={() => {this.props.handlerDelete(post)}}/>
        </span>
    </ListGroupItem>
    );
  }
}
