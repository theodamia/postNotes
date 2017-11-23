export default class Icon extends React.Component {
  render() {
    const {className, value, title, type, onClick, text} = this.props;
    return (
      <i className={className}
        value={value}
        title={title}
        type={type}
        onClick={onClick}>
      </i>
    );
  }
}
