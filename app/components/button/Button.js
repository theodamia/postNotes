import BButton from 'react-bootstrap/lib/Button';

export default class Button extends React.Component {
  render() {
    const {className, value, title, bsStyle, type, onClick, text} = this.props;
    return (
      <BButton
        className={className}
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
