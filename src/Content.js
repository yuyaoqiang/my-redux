import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "./react-redux";
import ThemeSwitch from "./ThemeSwitch";

class Content extends Component {
  static contextTypes = {
    themeColor: PropTypes.string
  };
  constructor() {
    super();
    this.state = { themeColor: "" };
  }
  render() {
    return (
      <div>
        <p style={{ color: this.props.themeColor }}>React.js 小书内容</p>
        <ThemeSwitch />
      </div>
    );
  }
}
const mapState = state => {
  return {
    themeColor: state.themeColor
  };
};
Content = connect(mapState)(Content);
export default Content;
