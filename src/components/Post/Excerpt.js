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
    const styles = require('./titleLink.scss');
    const { text } = this.props;
    return (
        <div className={styles.postExcerpt} dangerouslySetInnerHTML={this.createMarkup(text)}>
        </div>
    );
  }
}
