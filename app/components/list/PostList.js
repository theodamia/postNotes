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
  handleBlur(e, _id, kind) {
    e.preventDefault();

    if(kind == "text") {
      var text = e.target.value.trim();

      this.props.onTextUpdate({
        _id: _id,
        text: text
      });
    } else if (kind == "title") {
      var title = e.target.value.trim();

      if(!title) {
        return;
      }

      this.props.onTitleUpdate({
        _id: _id,
        title: title
      });
    }
  }
  onStatusChange(_id, status) {
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
    return this.props.posts.filter(post => _.lowerCase(post.title).includes(_.lowerCase(this.state.searchValue)));
  }
  render() {
    return (
      <div className="col-lg-6">
        <section className="plist">
          <h3 className="sm-marginbot">{this.props.completed ? 'Completed Notes' : 'Notes List'}</h3>
          <ListGroup>
            <Search onChange={this.onSearchChange} />
            {this.filterSearchValue().map(post => (
              <Post
                key={post._id}
                post={post}
                handleBlur={this.handleBlur}
                handleKeyDown={this.handleKeyDown}
                onStatusChange={this.onStatusChange}
                handlerDelete={this.props.handlerDelete}
                checkText={post.text ? true : false}
              />
            ))}
          </ListGroup>
      </section>
      </div>
    );
  }
}
