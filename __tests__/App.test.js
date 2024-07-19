import * as React from "react";
import { render } from "@testing-library/react-native";
import App from "../App";

jest.useFakeTimers();

test("renders correctly", () => {
 const { getByText } = render(<App />);
 const text = getByText("Open up App.js to start working on your app!");
 expect(text).toBeDefined();
});
