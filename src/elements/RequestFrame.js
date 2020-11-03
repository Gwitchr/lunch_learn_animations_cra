import React, { useState, useEffect } from "react";

import logo from "../assets/spoton.png";

const totalPx = 500;

function animateFn({ timing, draw, duration, end }) {
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
    } else {
      end();
    }
  });
}

const availEase = [
  {
    name: "linear",
    ease(timeFraction) {
      return Math.pow(timeFraction, 2);
    }
  },
  {
    name: "quad",
    ease(timeFraction) {
      return Math.pow(timeFraction, 2);
    }
  },
  {
    name: "cubic",
    ease(timeFraction) {
      return Math.pow(timeFraction, 3);
    }
  },
  {
    name: "arc",
    ease(timeFraction) {
      return 1 - Math.sin(Math.acos(timeFraction));
    }
  }
];

function RequestFrame({ selArea, selEx, areaId }) {
  const [animate, setAnimate] = useState(false);
  const [selEase, setSelEase] = useState(0);
  const [totalTime, setTotalTime] = useState(1);
  const [xPos, setXPos] = useState(0);
  const toggle = () => {
    setAnimate(!animate);
  };
  const getValue = ({ target: { value } }) => {
    setSelEase(+value || 0);
  };
  useEffect(() => {
    if (animate) {
      animateFn({
        duration: totalTime * 1000,
        timing: availEase[selEase].ease || availEase[0].ease,
        draw: function(progress) {
          setXPos(progress * totalPx);
        },
        end: function() {
          setAnimate(false);
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
            <div className="col-3">
              <div className="form-group">
                <label for="">Total time in s</label>
                <input
                  onChange={({ target: { value } }) => setTotalTime(+value)}
                  class="form-control"
                  min={0}
                  type="number"
                  value={totalTime}
                />
              </div>
            </div>
            <div className="col-4">
              <div class="form-group">
                <label for="exampleFormControlSelect1">Ease select</label>
                <select
                  onChange={getValue}
                  class="form-control"
                  id="exampleFormControlSelect1"
                >
                  <option val="linear">Select easing... </option>
                  {availEase.map(({ name }, i) => (
                    <option value={i}>{name}</option>
                  ))}
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
