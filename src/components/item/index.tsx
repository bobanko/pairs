import * as React from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import { Item } from "../../types";

import "./item.scss";

type Props = Item & {
  onClick: (data?: any) => void;
};

class Component extends React.Component<Props> {
  render() {
    return (
      <div
        className={classnames("item", "cell", {
          "is-open": this.props.isOpen
        })}
        data-id={this.props.imageId}
        onClick={() => this.props.onClick(this.props.id)}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  const { items } = state;

  const currentItem = items[props.id];

  return currentItem;
};

export default connect(mapStateToProps)(Component);
