import React, {Component, PropTypes} from 'react';
import PostSection from './PostSection';
import PostNavigator from '../PostNavigator/PostNavigator';
import { Element, Link} from 'react-scroll';
import { slugify } from '../../utils/helper';

export default class Body extends Component {
  static propTypes = {
    sections: PropTypes.array,
    key: PropTypes.number,
    dispatch: PropTypes.func
  }

  createMarkup(string) {
    return { __html: string };
  }

  render() {
    const { sections } = this.props;

    return (
      <div>
        <PostNavigator sections={sections}/>
        <div className="post-body">
          { sections.map((section) =>
            <div>
              <Element name={slugify(section.title)} className="element"/>
              <PostSection body={section.body} title={section.title}/>
            </div>
          )}
        </div>
      </div>
   );
  }
}
