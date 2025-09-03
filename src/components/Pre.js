import React, { useEffect, useState } from "react";

// Durasi loader sesuai permintaan (detik)
const COUNTDOWN_SECONDS = 8.0;

function Pre(props) {
  const [remaining, setRemaining] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    if (!props.load) return;
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const newRemaining = Math.max(0, COUNTDOWN_SECONDS - elapsed);
      setRemaining(newRemaining);
      if (newRemaining === 0) clearInterval(id);
    }, 100);
    return () => clearInterval(id);
  }, [props.load]);

  return (
    <div id={props.load ? "preloader" : "preloader-none"}>
      <div className="splash">
        <div className="splash-ring" aria-hidden="true" />
        <h1 className="splash-hello" aria-live="polite">
          <span className="hi">Hello,</span>
          <span className="welcome"> welcome to</span>
          <span className="name"> Yafet&apos;s world</span>
        </h1>
        <div className="splash-sub">Portofolio</div>
        <div className="splash-timer" aria-live="polite" aria-atomic="true">
          Starting in {remaining.toFixed(1)}s
        </div>
      </div>
    </div>
  );
}

export default Pre;