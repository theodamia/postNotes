import ListGroupItem from 'react-bootstrap/lib/ListGroupItem.js'

export default class Post extends React.Component {
  render() {
    return (
      <ListGroupItem>{this.props.children}</ListGroupItem>
    );
  }
}
