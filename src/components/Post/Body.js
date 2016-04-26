import React, {Component, PropTypes} from 'react';

export default class Body extends Component {
  static propTypes = {
    text: PropTypes.string,
    key: PropTypes.number
  }

  createMarkup(string) {
    return { __html: string };
  }

  render() {
    const { text } = this.props;

    return (
        <section className="post-body">
          <div dangerouslySetInnerHTML={this.createMarkup(text)}></div>
        </section>
    );
  }
}
