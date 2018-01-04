import ListGroupItem from 'react-bootstrap/lib/ListGroupItem.js'

export default class SearchItem extends React.Component {
  render() {
    const {onChange} = this.props;
    return (
      <ListGroupItem>
          <input
            className="plist__search"
            type="text"
            placeholder="  Search note..."
            onChange={onChange}/>
      </ListGroupItem>
    );
  }
}
