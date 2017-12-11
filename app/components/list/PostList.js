import { connect } from 'react-redux'
import Post from './item/Post.js'
import Search from './item/Search.js'
import ListGroup from 'react-bootstrap/lib/ListGroup.js'

export default class PostList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: ""
    };

    this.handleBlur         = this.handleBlur.bind(this);
    this.handleKeyDown      = this.handleKeyDown.bind(this);
    this.onSearchChange     = this.onSearchChange.bind(this);
    this.onStatusChange     = this.onStatusChange.bind(this);
    this.filterSearchValue  = this.filterSearchValue.bind(this);
  }
  handleBlur(e, kind) {
    e.preventDefault();

    var _id = e.target.getAttribute('data-id');

    if(kind == "text") {
      var text = e.target.value.trim();

      if(!text) {
        return;
      }

      this.props.onTextUpdate({
        _id: _id,
        text: text
      });
    } else if (kind == "title") {
      var title = e.target.value.trim();
      this.props.onTitleUpdate({
        _id: _id,
        title: title
      });
    }
  }
  onStatusChange(e, _id, status) {
    e.preventDefault();
    this.props.onStatusUpdate({
      _id: _id,
      status: status
    });
  }
  handleKeyDown(e, kind) {
    if(e.keyCode == 13) {
      this.handleBlur(e, kind);
    }
  }
  onSearchChange(e) {
    var searchValue = e.target.value.trim();
    this.setState({searchValue: searchValue});
  }
  filterSearchValue() {
    return this.props.posts.filter(post => _.lowerCase(post.text).includes(_.lowerCase(this.state.searchValue)));
  }
  render() {
    return (
      <div className="post-list col-lg-6">
        <h3 className="sm-marginbot">{this.props.done ? 'Completed Notes' : 'Notes List'}</h3>
        <ListGroup className="list">
          <Search onChange={this.onSearchChange} />
          {this.filterSearchValue().map(post => (
            <Post
              key={post._id}
              post={post}
              handleBlur={this.handleBlur}
              handleKeyDown={this.handleKeyDown}
              onStatusChange={this.onStatusChange}
              handleDoneChange={this.props.handleDoneChange}
              handlerDelete={this.props.handlerDelete}
              checkText={post.text ? true : false}
            />
          ))}
        </ListGroup>
      </div>
    );
  }
}
