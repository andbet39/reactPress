import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

export default class Title extends Component {
  static propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
    key: PropTypes.number
  }

  createMarkup(string) {
    return { __html: string };
  }

  render() {
    const { title } = this.props;
    const styles = require('./Post.scss');
    return (
      <div className={styles.mainTitle}>
        <h1 dangerouslySetInnerHTML={this.createMarkup(title)} ></h1>
      </div>
    );
  }
}
