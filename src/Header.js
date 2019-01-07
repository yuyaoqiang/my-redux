import React, { Component } from "react";
import { connect } from "./react-redux";
import PropTypes from "prop-types";
class Header extends Component {
  static contextTypes = {
    themeColor: PropTypes.string
  };
  render() {
    return <h1 style={{ color: this.props.themeColor }}>React.js 小书</h1>;
  }
}
const mapState = state => {
  return {
    themeColor: state.themeColor
  };
};
Header = connect(mapState)(Header);
export default Header;
