import * as React from "react";
import { connect } from "react-redux";

type Props = {
  workers: Array<Worker>;
  isLoading: boolean;
  error?: Error;
  updateWorkers: (string) => any;
};

export class App extends React.Component<Props> {
  render() {
    return <div>App</div>;
  }
}

const mapStateToProps = state => {
  const { workers, isLoading, error } = state;

  return {
    workers,
    isLoading,
    error
  };
};

export default connect(mapStateToProps)(App);
