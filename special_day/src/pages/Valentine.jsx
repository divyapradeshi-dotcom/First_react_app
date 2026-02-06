import React, { useState } from "react";

const Valentine = () => {
  const [yesClicked, setYesClicked] = useState(false);
  const [noStyle, setNoStyle] = useState({});

  const moveNoButton = () => {
    const randomX = Math.floor(Math.random() * 200) - 100; // move left/right
    const randomY = Math.floor(Math.random() * 150) - 75;  // move up/down

    setNoStyle({
      transform: `translate(${randomX}px, ${randomY}px)`
    });
  };

  return (
    <div
      className="h-screen flex items-center justify-center 
      bg-gradient-to-br from-pink-300 via-rose-200 to-purple-300 
      relative overflow-hidden"
    >

      
      <div className="bg-white  p-10 rounded-3xl shadow-2xl text-center w-[380px] relative">
        
        {!yesClicked ? (
          <>
            <div className="text-6xl mb-4">🐻💖</div>

            <h1 className="text-3xl font-bold mb-6">
              Will you be my Valentine?
            </h1>

            <div className="flex justify-center gap-6 relative">
              <button
                onClick={() => setYesClicked(true)}
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full shadow-md transition"
              >
                Yes 💘
              </button>

              <button
                onMouseEnter={moveNoButton}
                style={noStyle}
                className="bg-gray-300 px-6 py-2 rounded-full shadow-md transition duration-200"
              >
                No 🙈
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-pink-600 mb-3">
              YAYYY!!! 🎉💖
            </h1>

            <p className="text-gray-700 mb-4">
              You just made me the happiest person ever 🥹💞
            </p>

            <video
              src="/gfa_bubu_dudu.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="rounded-xl mx-auto w-64 shadow-lg"
            />

            <p className="mt-4 text-pink-500 font-semibold">
              Love you forever  💗
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Valentine;
