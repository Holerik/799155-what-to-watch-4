// add-review.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {fullInfo} from '../../reducer/data/data.js';

const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 400;

const RatingFragment = React.memo(function RatingFragment({index}) {
  return <React.Fragment>
    <input className="rating__input" id={`star-${index}`} type="radio" name="rating" value={`${index}`}/>
    <label className="rating__label" htmlFor={`star-${index}`}>{`Rating ${index}`}</label>
  </React.Fragment>;
});

RatingFragment.propTypes = {
  index: PropTypes.number.isRequired,
};

const STARS_COUNT = 10;
const COMMENT_ERROR = `comment--error`;

const createMoreRatingFragments = (count) => {
  const items = [];
  let index = 1;
  while (index <= count) {
    items.push(
        <RatingFragment
          key={index}
          index={index++}
        />);
  }
  return items;
};

class AddReview extends React.PureComponent {
  constructor(props) {
    super(props);
    this.initState = this.initState.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.checkReviewLength = this.checkReviewLength.bind(this);
  }

  initState() {
    this.props.setPage(0);
    this.props.setMovie(undefined);
  }

  checkReviewLength() {
    const review = document.addReview.reviewText;
    const isSubmitBlocked = review.value.length < MIN_REVIEW_LENGTH ||
      review.value.length > MAX_REVIEW_LENGTH;
    if (isSubmitBlocked) {
      if (!review.classList.contains(COMMENT_ERROR)) {
        review.classList.add(COMMENT_ERROR);
      }
    } else {
      if (review.classList.contains(COMMENT_ERROR)) {
        review.classList.remove(COMMENT_ERROR);
      }
    }
    document.querySelector(`.add-review__btn`).disabled = isSubmitBlocked;
    this.props.onChangeLength(review.value.length);
  }

  submitHandler(evt) {
    evt.preventDefault();
    const group = document.addReview.rating;
    const radios = [...group];
    const index = radios.findIndex((radio) => radio.checked) + 1;
    this.props.onSubmit(this.props.movieInfo, {
      comment: document.addReview.reviewText.value,
      rating: index,
    });
    return false;
  }

  render() {
    const {avatar, movieInfo} = this.props;
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
                <a href="/" className="logo__link" onClick={this.initState}>
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
                  <img src={avatar} alt="User avatar" width="63" height="63" />
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
                  {createMoreRatingFragments(STARS_COUNT)}
                </div>
              </div>

              <div className="add-review__text">
                <textarea className="add-review__textarea"
                  name="reviewText" onInput={this.checkReviewLength}
                  id="review-text" placeholder="Review text"></textarea>
                <div className="add-review__submit">
                  <button className="add-review__btn"
                    type="submit" disabled>Post</button>
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
};

export default AddReview;
