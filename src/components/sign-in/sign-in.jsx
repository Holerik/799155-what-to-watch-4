// sign-in.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../footer/footer.jsx';

const checkEmailIsValid = (email) => {
  const testChars = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (testChars.test(email) === false) {
    return false;
  }
  return true;
};

const SignIn = React.memo(function SignIn(props) {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const submitHandler = (evt) => {
    evt.preventDefault();
    if (checkEmailIsValid(emailRef.current.value)) {
      props.onSubmit({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (<React.Fragment>
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <a href="/" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={submitHandler}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" placeholder="Email address"
                name="user-email" id="user-email" ref={emailRef}/>
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password"
                name="user-password" id="user-password" ref={passwordRef}/>
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <Footer/>
      </footer>
    </div>

  </React.Fragment>
  );
});

SignIn.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignIn;
