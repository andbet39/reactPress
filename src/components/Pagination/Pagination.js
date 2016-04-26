import React, {Component, PropTypes} from 'react';

export default class Pagination extends Component {
  static propTypes = {
    maxPage: PropTypes.number,
    curPage: PropTypes.number,
    handlePageSelect: PropTypes.func
  }


  render() {
    const { maxPage, curPage} = this.props;

    const handleClickPage = (btn) => {
      const {handlePageSelect} = this.props; // eslint-disable-line no-shadow
      return () => handlePageSelect(Number(btn));
    };

    const btnArray = [];
    for (let btn = 1; btn <= maxPage; btn++) {
      btnArray.push(<li className={ btn === curPage ? 'active' : ''} ><a href="#" onClick={ handleClickPage(btn) }>{btn}</a></li>);
    }

    return (
      <ul className="pagination pagination-sm">
        <li><a href="#" className={ curPage === 1 ? 'disabled' : ''} onClick={ handleClickPage(1) }>&laquo;</a></li>
        {btnArray}
        <li><a href="#" className={ curPage === maxPage ? 'disabled' : ''} onClick={ handleClickPage(maxPage) }>&raquo;</a></li>
      </ul>
    );
  }
}
