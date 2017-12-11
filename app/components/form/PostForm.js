import {FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import Button from '../button/Button'

export default class FormBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      checkTitle: false
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTextChange  = this.handleTextChange.bind(this);
    this.handleSubmit      = this.handleSubmit.bind(this);
    this.handleKeyDown     = this.handleKeyDown.bind(this);
  }
  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }
  handleTextChange(e) {
    this.setState({text: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();
    var title = this.state.title.trim();
    var text = this.state.text.trim();

    if(!title) {
      this.setState({checkTitle: true});
      return;
    }

    this.props.onPostSubmit({
      title: title,
      text: text
    });

    this.setState({
      title: '',
      text: ''
    });
  }
  handleKeyDown(e) {
    if(e.keyCode == 13) {
      this.handleSubmit(e);
    }
  }
  render() {
    return (
      <div className="col-lg-">
        <div className="post-form">
          <form onSubmit={this.handleSubmit}>
            <FormGroup>
              <FormControl
                type="text"
                className="post-title"
                placeholder="Write a title..."
                value={this.state.title}
                onChange={this.handleTitleChange}
                onKeyDown={this.handleKeyDown}
              />
              <ControlLabel className="alert-text title-alert">
                {this.state.checkTitle ? 'You must write a title!' : '' }
              </ControlLabel>
              <FormControl
                className="post-text"
                componentClass="textarea"
                placeholder="Write a Note..."
                value={this.state.text}
                onChange={this.handleTextChange}
                onKeyDown={this.handleKeyDown}
              />
              <div className="sm-margintop">
                <Button bsStyle="primary" type="submit" value="Post" text="Add Note" />
              </div>
            </FormGroup>
          </form>
        </div>
      </div>
    );
  }
}
