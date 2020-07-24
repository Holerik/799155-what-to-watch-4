// my-list.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MovieList from '../movielist/movielist.jsx';
import {fullInfo} from '../../reducer/data/data.js';
import ShowMore from '../show-more/show-more.jsx';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import withActiveItem from '../../hocs/with-activeitem/with-activeitem.jsx';
import withCanPlay from '../../hocs/with-canplay/with-canplay.jsx';
import {getFavoriteFilms} from '../../reducer/data/selectors.js';
import {ShowMode} from '../../reducer/data/data.js';

const MovieTabs = withActiveItem(withCanPlay(MovieList));

const MyList = React.memo(function MyList(props) {
  const {
    filmsInfo,
    setActiveMovie,
    firstCard,
    lastCard,
  } = props;

  return (
    <React.Fragment>
      <div className="user-page">
        <Header/>
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <MovieTabs
            listItems={filmsInfo.slice(firstCard, lastCard + 1)}
            setActiveItem={setActiveMovie}
          />
          <div className="catalog__more">
            <ShowMore
              showMode={ShowMode.FAVORITE_MODE}
            />
          </div>
        </section>
        <Footer/>
      </div>
    </React.Fragment>
  );
});

const mapStateToProps = (state) => ({
  filmsInfo: getFavoriteFilms(state),
});

MyList.propTypes = {
  filmsInfo: PropTypes.arrayOf(
      PropTypes.exact(fullInfo)).isRequired,
  setActiveMovie: PropTypes.func.isRequired,
  firstCard: PropTypes.number.isRequired,
  lastCard: PropTypes.number.isRequired,
};

export {MyList};
export default connect(mapStateToProps)(MyList);
