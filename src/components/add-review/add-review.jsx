// add-review.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {fullInfo} from '../../reducer/data/data.js';
import Rating from '../rating/rating.jsx';
import {
  MIN_REVIEW_LENGTH,
  MAX_REVIEW_LENGTH,
  STARS_COUNT,
  COMMENT_ERROR,
} from '../../const.js';


class AddReview extends React.PureComponent {
  constructor(props) {
    super(props);
    this._initState = this._initState.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this._checkReviewLengthAndRating = this._checkReviewLengthAndRating.bind(this);
    this._ratingClickHandler = this._ratingClickHandler.bind(this);
    this.submitIsBlocked = true;
    this.rating = 0;
    this._lengthIsOk = false;
  }

  _initState() {
    this.props.setPage(0);
    this.props.setMovie(undefined);
  }

  _checkReviewLengthAndRating() {
    const review = document.addReview.reviewText;
    const textLength = review.value.length;
    this._lengthIsOk = textLength > MIN_REVIEW_LENGTH &&
      textLength < MAX_REVIEW_LENGTH;
    if (this.rating === 0 || !this._lengthIsOk) {
      this.submitIsBlocked = true;
    } else {
      this.submitIsBlocked = false;
    }
    this.props.onChangeLength(textLength);
  }

  submitHandler(evt) {
    evt.preventDefault();
    this.props.onSubmit(this.props.movieInfo, {
      comment: document.addReview.reviewText.value,
      rating: this.rating,
    });
    this.submitIsBlocked = true;
  }

  _createMoreRatingFragments(count) {
    const items = [];
    let index = 1;
    while (index <= count) {
      items.push(
          <Rating
            key={index}
            index={index++}
            onClick={this._ratingClickHandler}
          />);
    }
    return items;
  }

  _ratingClickHandler(evt) {
    this.rating = Number(evt.target.defaultValue);
    this.submitIsBlocked = !this._lengthIsOk;
  }

  render() {
    const {avatar, movieInfo, submitIsBlocked} = this.props;
    const blockSubmit = submitIsBlocked || this.submitIsBlocked;
    return (
      <React.Fragment>
        <section className="movie-card movie-card--full">
          <div className="movie-card__header">
            <div className="movie-card__bg">
              <img src={movieInfo.background} alt={movieInfo.altBackground}/>
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header">
              <div className="logo">
                <a href="/" className="logo__link" onClick={this._initState}>
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </a>
              </div>

              <nav className="breadcrumbs">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <a href="#" className="breadcrumbs__link">{movieInfo.title} </a>
                  </li>
                  <li className="breadcrumbs__item">
                    <a className="breadcrumbs__link">Add review</a>
                  </li>
                </ul>
              </nav>

              <div className="user-block">
                <div className="user-block__avatar">
                  <img src={`${avatar}`} alt="User avatar" width="63" height="63" />
                </div>
              </div>
            </header>

            <div className="movie-card__poster movie-card__poster--small">
              <img src={movieInfo.poster} alt={movieInfo.altPoster} width="218" height="327" />
            </div>
          </div>

          <div className="add-review">
            <form action="#" className="add-review__form" name="addReview" onSubmit={this.submitHandler}>
              <div className="rating">
                <div className="rating__stars">
                  {this._createMoreRatingFragments(STARS_COUNT)}
                </div>
              </div>

              <div className="add-review__text">
                <textarea className={`add-review__textarea
                  ${blockSubmit ? COMMENT_ERROR : ``}`}
                name="reviewText" onInput={this._checkReviewLengthAndRating}
                id="review-text" placeholder="Review text">
                </textarea>

                <div className="add-review__submit">
                  <button className="add-review__btn"
                    type="submit" disabled={blockSubmit}>Post</button>
                </div>

              </div>
            </form>
          </div>

        </section>
      </React.Fragment>
    );
  }
}


AddReview.propTypes = {
  movieInfo: PropTypes.exact(fullInfo).isRequired,
  avatar: PropTypes.string.isRequired,
  setPage: PropTypes.func.isRequired,
  setMovie: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChangeLength: PropTypes.func.isRequired,
  textLength: PropTypes.number,
  submitIsBlocked: PropTypes.bool,
};

export default AddReview;
