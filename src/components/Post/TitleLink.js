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
    return (
      <Link to={'/' + link} ><h2 className="post-tite" dangerouslySetInnerHTML={this.createMarkup(title)} ></h2></Link>
    );
  }
}
