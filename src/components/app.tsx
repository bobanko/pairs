import * as React from "react";
import { connect } from "react-redux";

import Field from "./field";

import "./index.scss";
import { generateItems } from "../redux/actions";

type Props = {
  items: Array<any>;
  fieldSize: { width: number; height: number };
  isLoading: boolean;
  error?: Error;

  generateItems: (size: any) => any;
};

class App extends React.Component<Props> {
  componentDidMount() {
    this.props.generateItems({ width: 5, height: 4 });
  }

  render() {
    return (
      <>
        <div className="countdown" />

        <Field items={this.props.items} fieldSize={this.props.fieldSize} />

        <div className="controls" />
      </>
    );
  }
}

const mapStateToProps = state => {
  const { items, fieldSize } = state;

  return {
    items,
    fieldSize
  };
};

const mapDispatchToProps = dispatch => {
  return {
    generateItems: size => {
      dispatch(generateItems(size));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
