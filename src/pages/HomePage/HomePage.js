import React, { Component } from "react";
import { Link } from "react-router-dom";
import { recursiveDelay } from "./../../utility/typeWriter";
import Cursor from "./../../components/common/Cursor/Cursor";
import "./HomePage.css";

class HomePage extends Component {
  state = {
    textValue: `Have some plans?
Save them in a to-do list!`,
    typingText: "",
    indexVal: -1
  };

  componentDidMount = () => {
    recursiveDelay(
      this.handleAutoTyping,
      this.state.textValue.length + 1,
      0.07
    );
  };

  handleAutoTyping = () => {
    let index = this.state.indexVal;
    let typingText = this.state.typingText;
    let text = this.state.textValue;

    if (index < text.length) {
      typingText += text.charAt(index);
      index++;
      this.setState({ typingText, indexVal: index });
    }
  };

  render() {
    const { typingText, textValue } = this.state;
    return (
      <div className="home-container">
        <div className="greeting-container">
          <div>
            <pre className="introduction-text">
              {typingText}
              <Cursor />
            </pre>
          </div>
        </div>
        <div style={{ justifySelf: "center" }}>
          <Link to="/app">
            <button
              className={
                typingText.length === textValue.length
                  ? "introduction-button animate"
                  : "introduction-button"
              }
            >
              Go <span style={{ fontSize: "20pt" }}>→</span>
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default HomePage;
