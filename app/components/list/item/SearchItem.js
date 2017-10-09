import ListGroupItem from 'react-bootstrap/lib/ListGroupItem.js'

export default class SearchItem extends React.Component {
  render() {
    const {onChange} = this.props;
    return (
      <ListGroupItem>
          <input type="text" onChange={onChange}/>
      </ListGroupItem>
    );
  }
}
