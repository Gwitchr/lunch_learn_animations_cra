import React, { useState, useRef, useEffect } from "react";

import logo from "../assets/spoton.png";

function Intervals({ selArea, selEx, areaId }) {
  const animElem = useRef();
  const [animate, setAnimate] = useState(false);
  const [elem, setElem] = useState();
  const toggle = () => {
    setAnimate(!animate);
    if (animate) {
      elem.play();
    } else {
      elem.pause();
    }
  };
  useEffect(() => {
    if (animElem.current) {
      const newElement = animElem.current.animate(
        [
          { transform: "rotate(0) translate3D(-50%, -50%, 0)", color: "#000" },
          { color: "#431236", offset: 0.3 },
          {
            transform: "rotate(360deg) translate3D(-50%, -50%, 0)",
            color: "#000"
          }
        ],
        {
          duration: 3000,
          iterations: Infinity
        }
      );
      setElem(newElement);
    }
  }, []);

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
        <section className="inner_row animation abs_cont flex-centered">
          <img
            ref={animElem}
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
  element.animate(
    [
      { transform: 'rotate(0) translate3D(-50%, -50%, 0)', color: '#000' },
      { color: '#431236', offset: 0.3},
      { transform: 'rotate(360deg) translate3D(-50%, -50%, 0)', color: '#000' }
    ], {
      duration: 3000,
      iterations: Infinity
    }
  )
      `}
        </pre>
      </div>
    </>
  );
}

export default Intervals;
