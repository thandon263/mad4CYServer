import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div>
        <header id="header">
          <h1 id="logo">
            <a href="index.html">#MADYouthChoir</a>
          </h1>
          <nav id="nav">
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#three" className="button special">
                  Register
                </a>
              </li>
            </ul>
          </nav>
        </header>

        <section id="banner">
          <div className="content">
            <header>
              <h2>MAD FOR CHRIST</h2>
              <p>
                Welcome to the Registration for MAD<br />
                <span style={{ color: "#e44c65" }}>
                  <a href="#four">Scroll to continue</a>
                </span>{" "}
                and Read the following conditions.
              </p>
            </header>
            <span
              style={{
                borderRadius: 0,
                position: "relative",
                left: 12,
                top: 70
              }}
            >
              <img
                style={{
                  borderRadius: 0,
                  width: 150,
                  height: 150
                }}
                src="images/pic01.png"
                alt=""
              />
            </span>
          </div>
          <a href="#four" className="goto-next scrolly">
            Next
          </a>
        </section>
      </div>
    );
  }
}

export default Header;
