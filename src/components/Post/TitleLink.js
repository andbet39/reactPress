import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

export default class TitleLink extends Component {
  static propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
    key: PropTypes.number
  }

  createMarkup(string) {
    return { __html: string };
  }

  render() {
    const { title, link } = this.props;
    const styles = require('./titleLink.scss');
    return (
      <div className={styles.postTitle}>
        <Link to={'/' + link.replace('/', '')} ><h1 dangerouslySetInnerHTML={this.createMarkup(title)} ></h1></Link>
      </div>
    );
  }
}
