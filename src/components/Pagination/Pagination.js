import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

export default class Pagination extends Component {
  static propTypes = {
    maxPage: PropTypes.number,
    curPage: PropTypes.number,
  }


  render() {
    const { maxPage, curPage} = this.props;

    const btnArray = [];
    for (let btn = 1; btn <= maxPage; btn++) {
      btnArray.push(<li className={ btn === curPage ? 'active' : ''} ><Link to={'/posts/' + btn} >{btn}</Link></li>);
    }

    return (
      <ul className="pagination pagination-sm">
        <li className={ curPage === 1 ? 'disabled' : ''} ><Link to={'/posts/1'} >&laquo;</Link></li>
        {btnArray}
        <li className={ curPage === maxPage ? 'disabled' : ''}><Link to={'/posts/' + maxPage} >&raquo;</Link></li>
      </ul>
    );
  }
}
