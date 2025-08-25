import React, { useState, useEffect } from "react";
function Pre(props) {
  const [countdown, setCountdown] = useState(3); // 3 detik

  useEffect(() => {
    if (props.load && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [props.load, countdown]);

  return (
    <div id={props.load ? "preloader" : "preloader-none"}>
      {props.load && (
        <div style={{
          position: 'absolute',
          top: '60%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#fff',
          fontSize: '2rem',
          fontWeight: 'bold',
          zIndex: 1000000
        }}>
          Loading... {countdown > 0 ? countdown : "Go!"}
        </div>
      )}
    </div>
  );
}

export default Pre;
