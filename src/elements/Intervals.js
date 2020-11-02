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
        <section className="inner_row activate">
          <button onClick={toggle} className="btn lower_btn" id="toggle_1">
            {animate ? "Reset" : "Play"}
          </button>
        </section>
      </div>
      <div className={`code_section `}>
        <pre className="pre">
          {`
function draw(timePassed) {
  logo.style.left = timePassed / 5 + 'px';
}
      `}
        </pre>
      </div>
    </>
  );
}

export default Intervals;
