/**
 * Mock Translation component import, as it uses Meteor modules we have a hard time testing with Jest
 */
jest.mock("/imports/plugins/core/ui/client/components", () => ({
  Translation(props) {
      return <span>{props.defaultValue}</span>; // eslint-disable-line
  }
}));

import React from "react";
import { shallow } from "enzyme";
import shallowToJSON from "enzyme-to-json";
import App from "../app";

/**
 * Badge is a display only component
 * It receives props and displays them accordingly
 */

afterEach(() => {
  jest.clearAllMocks();
});

/**
 * Snapshots make sure your UI does not change unexpectedly
 */

test("Basic Rendering: className test", () => {
  const isActionViewOpen = false;
  const hasDashboardAccess = false;
  const currentRoute = {
    route: {
      name: "testingRouteClassName"
    }
  };

  const component = shallow(
    <App
      isActionViewOpen={isActionViewOpen}
      hasDashboardAccess={hasDashboardAccess}
      currentRoute={currentRoute}
    >
      <h1>Testing...</h1>
    </App>
  );
  const tree = shallowToJSON(component);
  expect(tree).toMatchSnapshot();
});
