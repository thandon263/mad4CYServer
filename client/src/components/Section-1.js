import React, { Component } from "react";

class SectionOne extends Component {
  render() {
    return (
      <div>
        <section
          id="one"
          style={{ paddingTop: 40, paddingBottom: 40 }}
          className="style1 bottom"
        >
          <div className="content">
            <div className="container">
              <h1 style={{ textAlign: "center" }}>MAKE A DIFFERENCE</h1>
              <hr style={{ color: "#e44c65" }} />
              <div className="row">
                <div className="4u 12u$(medium)">
                  <header>
                    <h2>Thank You For Your Interest</h2>
                    <p>
                      This information is going to be kept in a secure service.
                    </p>
                  </header>
                </div>
                <div className="4u 12u$(medium)">
                  <div>
                    <h3>
                      <u>The MAD Youth choir’s vision for the future is:</u>
                    </h3>{" "}
                    To be at the heart of Toronto, a major contributor to its
                    quality of life and an ambassador for the region or
                    district, delivering music to diverse audiences here and
                    around the world.
                  </div>
                </div>
                <div className="4u$ 12u$(medium)">
                  <div>
                    <h3>
                      <u>
                        {" "}
                        The MAD Youth choir’s mission, its core purpose, is:
                      </u>
                    </h3>{" "}
                    To enrich people’s lives regionally, nationally and
                    internationally through excellence in performance, learning
                    and community engagement, and creative collaborations across
                    the arts.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default SectionOne;

// <div style={{ width: "100%", height: 400, borderTop: "#e44c65" }}>
//   <h1> The Form Will be here</h1>
//   <FormComponent />
// </div>
