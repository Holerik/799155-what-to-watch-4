// error-msg.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getErrMessage} from '../../reducer/error/selectors.js';

const ErrorMsg = React.memo(function ErrorMsg(props) {
  const {errMessage} = props;
  return (
    <div className="error-message">
      <p>{errMessage}</p>
    </div>
  );
});

const mapStateToProps = (state) => ({
  errMessage: getErrMessage(state),
});

ErrorMsg.propTypes = {
  errMessage: PropTypes.string.isRequired,
};

export {ErrorMsg};
export default connect(mapStateToProps, null)(ErrorMsg);

