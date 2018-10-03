import * as React from "react";

import Item from "../item";
import { connect } from "react-redux";

import "./field.scss";
import { flipCell } from "../../redux/actions";

type Props = {
  items: Array<number>;
  fieldSize: { width: number; height: number };
  flipCell: (id: number) => void;
};

class Field extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    // return this.props.items.length;

    if (this.props.items.length === 0) return "-";

    return (
      <div className="field">
        {this.props.items.map((item, i) => (
          <Item key={i} id={i} onClick={id => this.props.flipCell(id)} />
        ))}
      </div>
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
    flipCell: id => {
      dispatch(flipCell(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Field);
