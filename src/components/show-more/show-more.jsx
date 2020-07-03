// show-more.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer.js';

export const MOVIE_CARDS_ON_PAGE = 8;

class ShowMore extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {lastCard, cardsCount} = this.props;
    return (
      <div className="catalog__more">
        <button className={`catalog__button ${lastCard + 1 < cardsCount ? `` : `visually-hidden`}`}
          type="button" onClick={() => this.props.showMoreClickHandler(lastCard + 1)}>Show more</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  lastCard: state.lastCard,
  cardsCount: state.cardsCount,
});

const mapDispatchToProps = (dispatch) => ({
  showMoreClickHandler: (number) => {
    dispatch(ActionCreator.setFirstCardNumber(number));
  }
});

ShowMore.propTypes = {
  lastCard: PropTypes.number.isRequired,
  cardsCount: PropTypes.number.isRequired,
  showMoreClickHandler: PropTypes.func.isRequired,
};

export {ShowMore};
export default connect(mapStateToProps, mapDispatchToProps)(ShowMore);

