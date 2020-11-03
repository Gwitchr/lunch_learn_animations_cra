import React, { useState, useRef, useEffect } from "react";

import logo from "../assets/spoton.png";

const totalDuration = 3000;

function Intervals({ selArea, selEx, areaId }) {
  const animElem = useRef();
  const [animate, setAnimate] = useState(false);
  const [direction, setDirection] = useState(false);
  const [currFrame, setCurrFrame] = useState(0);
  const [elem, setElem] = useState();
  const toggle = () => {
    setAnimate(!animate);
    if (!animate) {
      elem.play();
    } else {
      elem.pause();
    }
  };
  const toggleDirection = () => {
    setDirection(!direction);
    if (direction) {
      elem.playbackRate = 1;
    } else {
      elem.playbackRate = -1;
    }
  };
  const getValue = ({ target: { value } }) => {
    setCurrFrame(value);
  };
  useEffect(() => {
    if (elem) {
      const nextVal = Math.floor((currFrame * totalDuration) / 100);
      elem.currentTime = nextVal;
    }
  }, [currFrame, elem]);
  useEffect(() => {
    if (animElem.current) {
      const newElement = animElem.current.animate(
        [
          {
            transform: "rotate(0) translate3D(-50%, -50%, 0)",
            color: "#000"
          },
          { color: "#431236", offset: 0.3 },
          {
            transform: "rotate(360deg) translate3D(-50%, -50%, 0)",
            color: "#000"
          }
        ],
        {
          duration: totalDuration,
          easing: "ease-in-out",
          iterations: Infinity
        }
      );
      newElement.pause();
      setElem(newElement);
    }
  }, []);

  return (
    <>
      <div className={`code_section abs_cont `}>
        <span className="red_button" />
        <span className="yellow_button" />
        <span className="green_button" />
        <pre className="pre">
          {`
element.animate(
  [
    { transform: 'rotate(0) translate3D(-50%, -50%, 0)' },
    {  offset: 0.3},
    { transform: 'rotate(360deg) translate3D(-50%, -50%, 0)' }
  ], {
    duration: 3000,
    iterations: Infinity
  }
)

const toggle = () => {
  setAnimate(!animate);
  if (!animate) {
    elem.play();
  } else {
    elem.pause();
  }
};
    `}
        </pre>
      </div>
      <div
        onMouseOver={() => selArea(areaId)}
        id="hero"
        className={`hero col ${selEx === areaId && "active"}`}
      >
        <section className="inner_row title">
          <h2>Timeline</h2>
        </section>
        <section className="inner_row animation abs_cont flex-centered">
          <img
            ref={animElem}
            className={`logo img-fluid `}
            src={logo}
            alt="spotOn!"
          />
        </section>
        <section className="inner_row">
          <div className="row justify-content-end">
            <div className="col-5 ">
              <div class="form-group">
                <label for="formControlRange">Set Frame</label>
                <input
                  type="range"
                  onChange={getValue}
                  value={currFrame}
                  class="form-control-range"
                  id="formControlRange"
                />
              </div>
            </div>
            <div className="col-2 d-flex align-items-center">
              <button
                onClick={toggleDirection}
                disabled={!animate}
                className="btn btn-primary lower_btn btn-block"
                id="toggle_1"
              >
                {direction ? "Forwad" : "Reverse"}
              </button>
            </div>
            <div className="col-2 d-flex align-items-center">
              <button
                onClick={toggle}
                className="btn btn-primary lower_btn  btn-block"
                id="toggle_1"
              >
                {animate ? "Pause" : "Play"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Intervals;
