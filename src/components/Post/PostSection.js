import React, {Component, PropTypes} from 'react';

export default class PostSection extends Component {
  static propTypes = {
    body: PropTypes.string,
    title: PropTypes.string,
    key: PropTypes.number
  }

  createMarkup(string) {
    return { __html: string };
  }
  render() {
    const { body, title } = this.props;
    const styles = require('./Post.scss');
    return (
        <div className={styles.PostSection}>
          <div className={styles.SubTitle}> <h2>{title}</h2> </div>
          <div className={styles.PostParagraph} dangerouslySetInnerHTML={this.createMarkup(body)}></div>
        </div>
    );
  }
}
