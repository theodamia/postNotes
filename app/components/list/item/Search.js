import ListGroupItem from 'react-bootstrap/lib/ListGroupItem.js'

export default class SearchItem extends React.Component {
  render() {
    const {onChange} = this.props;
    return (
      <ListGroupItem>
          <input
            className="search-box"
            type="text"
            placeholder="  Search note..."
            onChange={onChange}/>
      </ListGroupItem>
    );
  }
}
