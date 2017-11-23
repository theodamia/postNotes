import BButton from 'react-bootstrap/lib/Button';

export default class Button extends React.Component {
  render() {
    const {id, value, title, bsStyle, type, onClick, text} = this.props;
    return (
      <BButton
        id={id}
        value={value}
        title={title}
        bsStyle={bsStyle}
        type={type}
        onClick={onClick}>
          {text}
      </BButton>
    );
  }
}
