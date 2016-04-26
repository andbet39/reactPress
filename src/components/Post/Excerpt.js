import React, {Component, PropTypes} from 'react';

export default class Excerpt extends Component {
  static propTypes = {
    text: PropTypes.string,
    key: PropTypes.number
  }

  createMarkup(string) {
    const regex = new RegExp('<a.*?</a>', 'gi');
    const target = string.replace(regex, '');

    return { __html: target };
  }

  render() {
    const { text } = this.props;
    return (
        <section className="post-excerpt">
          <p dangerouslySetInnerHTML={this.createMarkup(text)}></p>
        </section>
    );
  }
}
