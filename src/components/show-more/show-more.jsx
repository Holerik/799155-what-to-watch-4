// show-more.jsx
import React from 'react';
import PropTypes from 'prop-types';

export const MOVIE_CARDS_ON_PAGE = 8;

const getNextFirstCard = (firstCard, cardsCount) => {
  const nextFirstCard = firstCard + MOVIE_CARDS_ON_PAGE;
  return nextFirstCard > cardsCount - 1 ? firstCard : nextFirstCard;
};

const getLastCard = (firstCard, cardsCount) => {
  const lastCard = firstCard + MOVIE_CARDS_ON_PAGE;
  return lastCard > cardsCount - 1 ? cardsCount - 1 : lastCard;
};

class ShowMore extends React.PureComponent {
  constructor(props) {
    super(props);
    this._showMoreClickHandler = this._showMoreClickHandler.bind(this);
    this.state = {
      firstCard: 0,
      lastCard: getLastCard(0, props.filmsCount),
    };
  }

  _showMoreClickHandler() {
    const first = getNextFirstCard(this.state.firstCard, this.props.filmsCount);
    const last = getLastCard(first, this.props.filmsCount);
    this.setState({
      firstCard: first,
      lastCard: last,
    });
    this.props.setShowLimits({
      first,
      last,
    });
  }

  render() {
    return (
      <div className="catalog__more">
        <button className={`catalog__button ${this.state.lastCard + 1 < this.props.filmsCount ? `` : `visually-hidden`}`}
          type="button" onClick={this._showMoreClickHandler}>Show more</button>
      </div>
    );
  }
}

export default ShowMore;

ShowMore.propTypes = {
  filmsCount: PropTypes.number.isRequired,
  setShowLimits: PropTypes.func.isRequired,
};
