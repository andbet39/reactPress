import React, {Component, PropTypes} from 'react';

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
      <h2 className="post-tite">
      <a href={link} dangerouslySetInnerHTML={this.createMarkup(title)}>
      </a>
      </h2>
    );
  }
}
