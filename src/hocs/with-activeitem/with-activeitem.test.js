// with-activeitem.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import withActiveItem from './with-activeitem.jsx';
import PropTypes from 'prop-types';

const genresList = [`All genres`, `Drama`, `Crime`];

const MockComponent = (props) => {
  return (
    <ul>
      {props.listItems.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <li>
              <a>{item}</a>
            </li>
          </React.Fragment>
        );
      })}
    </ul>
  );
};

MockComponent.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.string),
  currentActiveItem: PropTypes.number,
  setActiveItem: PropTypes.func,
  maxItemsCount: PropTypes.number,
};

const MockComponentWrapped = withActiveItem(MockComponent);

describe(`withActiveItem tests`, () => {
  it(`Should correctly render genres list`, () => {
    const tree = renderer.create((
      <MockComponentWrapped
        listItems={genresList}
        currentActiveItem={0}
        setActiveItem={() => {}}
        maxItemsCount={3}
        id={0}
      />), {
      createNodeMock() {
        return {};
      }
    }).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
