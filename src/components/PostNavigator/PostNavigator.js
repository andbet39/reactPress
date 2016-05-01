import React, {Component, PropTypes} from 'react';
import { Element, Link} from 'react-scroll';
import { slugify } from '../../utils/helper';
import jQuery from 'jquery';

export default class PostNavigator extends Component {
  static propTypes = {
    sections: PropTypes.array
  }

  render() {
    const styles = require('./postnavigator.scss');
    const { sections } = this.props;
    return (
      <div className={styles.dropdown}>
        <div id="navbutton" >
          <i className="fa fa-link" aria-hidden="true"></i>
        </div>
        <div className={styles.dropdownContent}>
          <ul className="list-group">
            { sections.map((section) =>
              <li className="list-group-item">
                <Link activeClass="active" spy="true" smooth="true" to={slugify(section.title)} offset={-30} duration={700}>
                  {section.title ? section.title : 'Start'}
                </Link>
              </li>
            )}
          </ul>
          </div>
      </div>
      );
  }
}
