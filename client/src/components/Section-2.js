import React, { Component } from "react";

class SectionTwo extends Component {
  render() {
    return (
      <section id="four" className="wrapper style1 special fade-up">
        <div className="container">
          <header className="major">
            <h2>MAD Is All About Development</h2>
            <p>
              “Practice isn’t the thing you do once you’re good. It’s the thing
              you do that makes you good.”
            </p>
          </header>
          <div className="box alt">
            <div className="row uniform">
              <section className="4u 6u(medium) 12u$(xsmall)">
                <span className="icon alt major fa-area-chart" />
                <h3>Analysis</h3>
                <p>
                  Learn to break a song down and look at its basic components.
                </p>
              </section>
              <section className="4u 6u$(medium) 12u$(xsmall)">
                <span className="icon alt major fa-comment" />
                <h3>Communication</h3>
                <p>Talk about the things that help you improve your talent.</p>
              </section>
              <section className="4u$ 6u(medium) 12u$(xsmall)">
                <span className="icon alt major fa-flask" />
                <h3>Science</h3>
                <p>
                  The voice is a biological instrument, learn more about it.
                </p>
              </section>
              <section className="4u 6u$(medium) 12u$(xsmall)">
                <span className="icon alt major fa-paper-plane" />
                <h3>Send</h3>
                <p>
                  We are here to spread the word of God through song, we need to
                  be the heart of sound.
                </p>
              </section>
              <section className="4u 6u(medium) 12u$(xsmall)">
                <span className="icon alt major fa-file" />
                <h3>Learning</h3>
                <p>
                  There is a standard curriculum built for the members to learn
                  how to deliver the quality sound.
                </p>
              </section>
              <section className="4u$ 6u$(medium) 12u$(xsmall)">
                <span className="icon alt major fa-lock" />
                <h3>Security</h3>
                <p>
                  Your information is well secure within a standard premium
                  database protected by Google services.
                </p>
              </section>
            </div>
          </div>
          <footer className="major">
            <ul className="actions">
              <li>
                <a
                  target="_blank"
                  href="https://drive.google.com/file/d/11kU61h-inbMqz7Ni-O_4nowRrCQQtw6z/view?usp=sharing"
                  className="button"
                >
                  Download The Contract
                </a>
              </li>
            </ul>
          </footer>
        </div>
      </section>
    );
  }
}

export default SectionTwo;
