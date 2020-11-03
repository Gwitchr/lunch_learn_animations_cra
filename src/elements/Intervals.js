import React, { useState } from "react";
import { useInterval } from "../hooks";

import logo from "../assets/spoton.png";

function Intervals({ selArea, selEx, areaId }) {
  const [animate, setAnimate] = useState(false);
  const [initial, setInitial] = useState();
  const [xPos, setXPos] = useState(0);
  const toggle = () => {
    setAnimate(!animate);
  };
  useInterval(
    () => {
      if (!initial) {
        setInitial(new Date());
      }
      let timePassed = Date.now() - initial;
      let nextPos = timePassed / 5;
      if (nextPos > 600) {
        nextPos = 0;
        setAnimate(false);
        setInitial(undefined);
      }
      setXPos(nextPos);
    },
    animate ? 20 : null
  );
  return (
    <>
      <div className={`code_section abs_cont `}>
        <span className="red_button" />
        <span className="yellow_button" />
        <span className="green_button" />
        <pre className="pre">
          {`
function draw(timePassed) {
logo.style.left = timePassed / 5 + 'px';
}
    `}
        </pre>
      </div>
      <div
        onMouseOver={() => selArea(areaId)}
        id="hero"
        className={`hero col ${selEx === areaId && "active"}`}
      >
        <section className="inner_row title">
          <h2>With intervals</h2>
        </section>
        <section className="inner_row animation abs_cont">
          <img
            style={{ transform: `translateX(${xPos}px)` }}
            className={`logo img-fluid `}
            src={logo}
            alt="spotOn!"
          />
        </section>
        <section className="inner_row">
          <div className="row h-100 justify-content-end">
            <div className="col-2 d-flex align-items-center">
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
    </>
  );
}

export default Intervals;
