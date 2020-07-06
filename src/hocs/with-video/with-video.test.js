// with-video.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import PropTypes from 'prop-types';
import withVideo from './with-video.jsx';


const MockComponent = (props) => {
  const {children} = props;
  return (
    <div>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

const MockComponentWrapped = withVideo(MockComponent);

describe(`withVideo tests`, () => {
  it(`Should correctly render VideoPlayer`, () => {
    const tree = renderer.create((
      <MockComponentWrapped
        isPlaying={true}
        isMuted={true}
        src={``}
        poster={``}
        width={200}
      />), {
      createNodeMock() {
        return {};
      }
    }).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
