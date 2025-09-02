import React, { useEffect, useState } from "react";

// Definisikan durasi total countdown dalam detik
const COUNTDOWN_SECONDS = 3.0;
// function Pre(props) {
//   const [seconds, setSeconds] = useState(0);

//   useEffect(() => {
//     if (!props.load) return; // do nothing if not loading
//     const start = Date.now();
//     const id = setInterval(() => {
//       const elapsed = (Date.now() - start) / 1000;
//       setSeconds(parseFloat(elapsed.toFixed(1)));
//     }, 100);
//     return () => clearInterval(id);
//   }, [props.load]);

//   return (
//     <div id={props.load ? "preloader" : "preloader-none"}>
//       <div className="splash">
//         <div className="splash-ring" aria-hidden="true" />
//         <h1 className="splash-hello" aria-live="polite">
//           <span className="hi">Hello,</span>
//           <span className="welcome"> welcome to</span>
//           <span className="name"> Yafet&apos;s world</span>
//         </h1>
//         <div className="splash-sub">Yafet Purnama</div>
//         <div className="splash-timer" aria-live="polite" aria-atomic="true">
//           Loading {seconds.toFixed(1)}s
//         </div>
//       </div>
//     </div>
//   );
// }

function Pre(props) {
  const [remaining, setRemaining] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    // Jangan jalankan timer jika tidak dalam mode loading
    if (!props.load) return;

    const start = Date.now();

    const intervalId = setInterval(() => {
      // Hitung waktu yang telah berlalu
      const elapsed = (Date.now() - start) / 1000;
      
      // Hitung sisa waktu, pastikan tidak kurang dari 0
      const newRemaining = Math.max(0, COUNTDOWN_SECONDS - elapsed);
      
      setRemaining(newRemaining);

      // Jika waktu habis, hentikan interval
      if (newRemaining === 0) {
        clearInterval(intervalId);
      }
    }, 100); // Update setiap 100ms untuk tampilan yang mulus

    // Cleanup function untuk membersihkan interval saat komponen di-unmount
    return () => clearInterval(intervalId);
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
          {/* Ubah teks dan tampilkan sisa waktu */}
          Starting in {remaining.toFixed(1)}s
        </div>
      </div>
    </div>
  );
}

export default Pre;
