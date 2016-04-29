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
    const subtitleArr = text.match(/<h(.)>.*?<\/h\1>/g); // ["<h1>A</h1>", "<h2>B</h2>", "<h3>C</h3>"]
    const sections = [];

    if (subtitleArr !== null) {
      // First section
      sections.push(text.substring(0, text.indexOf(subtitleArr[0])));

      for (let index = 0; index < subtitleArr.length; index++) {
        const title = subtitleArr[index];
        const startPos = text.indexOf(title);
        let endPos = text.length;
        if ( index + 1 < subtitleArr.length ) {
          const titleEnd = subtitleArr[index + 1];
          endPos = text.indexOf(titleEnd);
        }
        sections.push(text.substring(startPos, endPos));
      }
    } else {
      sections.push(text);
    }
    console.log(subtitleArr);

    return (
        <section className="post-body">
        { sections.map((section) =>
              <section dangerouslySetInnerHTML={this.createMarkup(section)}>
            </section>
         )}
        </section>
    );
  }
}
