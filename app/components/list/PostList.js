import { map } from 'lodash'
import { connect } from 'react-redux'
import { CButton } from "elements"
import Post from './item/Post.js'
import SearchItem from './item/SearchItem.js'
import ListGroup from 'react-bootstrap/lib/ListGroup.js'
import { keyBy, omit, filter, includes, lowerCase } from 'lodash'

export default class PostList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: ""
    };

    this.handleOnBlur  = this.handleOnBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.filterSearchValue  = this.filterSearchValue.bind(this);
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
  onSearchChange(e) {
    var searchValue = e.target.value.trim();
    this.setState({searchValue: searchValue});
  }
  filterSearchValue() {
    return this.props.posts.filter(post => lowerCase(post.text).includes(lowerCase(this.state.searchValue)));
  }
  render() {
    return (
      <div className="post-list col-lg-6">
        <h3 className="sm-marginbot">{this.props.done ? 'Completed Notes' : 'Notes List'}</h3>
        <ListGroup className="list">
          <SearchItem onChange={this.onSearchChange} />
          {this.filterSearchValue().map(post => (
            <Post
              key={post._id}
              post={post}
              handleDoneChange={this.props.handleDoneChange}
              handlerDelete={this.props.handlerDelete}
              handleOnBlur={this.handleOnBlur} />
          ))}
        </ListGroup>
      </div>
    );
  }
}
