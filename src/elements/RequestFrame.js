import React, { useState, useEffect } from "react";

import logo from "../assets/spoton.png";

function animateFn({ timing, draw, duration }) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    let progress = timing(timeFraction);

    draw(progress); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

function RequestFrame({ selArea, selEx, areaId }) {
  const [animate, setAnimate] = useState(false);
  const [xPos, setXPos] = useState(0);
  const toggle = () => {
    setAnimate(!animate);
  };
  useEffect(() => {
    if (animate) {
      animateFn({
        duration: 1000,
        timing: function(timeFraction) {
          return timeFraction;
        },
        draw: function(progress) {
          console.log("is it happening");
          setXPos(progress * 400);
        }
      });
    }
  }, [animate]);

  return (
    <>
      <div
        onMouseOver={() => selArea(areaId)}
        id="hero"
        className={`hero col ${selEx === areaId && "active"}`}
      >
        <section className="inner_row title">
          <h2>With RequestAnimation</h2>
        </section>
        <section className="inner_row animation abs_cont">
          <img
            style={{ transform: `translateX(${xPos}px)` }}
            className={`logo img-fluid `}
            src={logo}
            alt="spotOn!"
          />
        </section>
        <section className="inner_row ">
          <div className="row justify-content-end">
            <div className="col-4">
              <div class="form-group">
                <label for="exampleFormControlSelect1">Ease select</label>
                <select
                  onChange={getValue}
                  class="form-control"
                  id="exampleFormControlSelect1"
                >
                  <option val="linear">linear</option>
                  <option val="pow">pow</option>
                  <option val="pow3">pow3</option>
                  <option val="arc">arc</option>
                  <option val="bounce">bounce</option>
                </select>
              </div>
            </div>
            <div className="col-2 d-flex align-items-center ">
              <button
                onClick={toggle}
                className="btn btn-primary lower_btn btn-block"
                id="toggle_1"
              >
                {animate ? "Reset" : "Play"}
              </button>
            </div>
          </div>
        </section>
      </div>
      <div className={`code_section abs_cont `}>
        <span className="red_button" />
        <span className="yellow_button" />
        <span className="green_button" />
        <pre className="pre">
          {`
function animateFn({ timing, draw, duration }) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    let progress = timing(timeFraction);

    draw(progress); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}
      `}
        </pre>
      </div>
    </>
  );
}

export default RequestFrame;
