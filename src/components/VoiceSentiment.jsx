import React, { useRef, useState } from "react";

const VoiceSentiment = () => {
  const [audioURL, setAudioURL] = useState(null);
  const [recording, setRecording] = useState(false);
  const [sentiment, setSentiment] = useState(null);
  const inputRef = useRef(null);

  let mediaRecorder;
  let audioChunks = [];

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.start();
    setRecording(true);

    mediaRecorder.ondataavailable = (e) => {
      audioChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      const url = URL.createObjectURL(audioBlob);
      setAudioURL(url);
      detectSentiment(); //Simulate
    };

    setTimeout(() => {
      mediaRecorder.stop();
      setRecording(false);
    }, 5000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAudioURL(url);
    detectSentiment(); // simulate
  };

  const detectSentiment = () => {
    // Simulate sentiment
    const sentiments = [
      "😊 Happy",
      "😔 Sad",
      "😐 Neutral",
      "😠 Angry",
      "🤩 Excited",
    ];
    const randomSentiment =
      sentiments[Math.floor(Math.random() * sentiments.length)];
    setSentiment(randomSentiment);
  };
  return (
    <div className='min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 relative overflow-hidden'>
      {/* Gradient Heading */}
      <h1 className='text-5xl md:text-6xl font-extrabold text-center leading-tight mb-4'>
        <span className='bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text'>
          Voice Emotion Analyzer
        </span>
      </h1>

      {/* Description */}
      <p className='text-gray-300 text-lg md:text-xl text-center max-w-2xl mb-10'>
        Let our AI decode your emotions from your voice. Tap the button and
        speak naturally — we’ll analyze the sentiment behind your tone.
      </p>

      {/* Record Button */}
      <div className='flex gap-5'>
        <button
          onClick={startRecording}
          disabled={recording}
          className={`transition-all duration-300 ease-in-out px-8 py-4 text-lg font-semibold rounded-lg shadow-lg ${
            recording
              ? "bg-gray-700 text-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-pink-500 text-white"
          } animate-pulse`}
        >
          {recording ? "Recording..." : "Start Voice Recording 🎙️"}
        </button>
        {/* Upload Button */}
        <button
          onClick={() => inputRef.current.click()}
          className='transition-all duration-300 ease-in-out px-8 py-4 text-lg font-semibold rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-cyan-500 text-white animate-pulse'
        >
          Upload Audio File 📁
        </button>
        {/* Hidden File Input */}
        <input
          ref={inputRef}
          type='file'
          accept='audio/*'
          onChange={handleFileUpload}
          className='hidden'
        />
      </div>

      {/* Audio + Result */}
      {audioURL && (
        <div className='mt-12 w-full max-w-lg bg-gradient-to-br from-purple-900/30 to-blue-900/10 border border-purple-600/30 rounded-2xl p-6 shadow-xl backdrop-blur-sm'>
          <h3 className='text-xl font-bold text-pink-400 mb-4 text-center'>
            🎧 Your Audio Playback
          </h3>
          <audio controls src={audioURL} className='w-full mb-4' />

          {sentiment && (
            <div className='text-center'>
              <p className='text-2xl font-semibold text-white'>
                Detected Sentiment:
              </p>
              <p className='text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-transparent bg-clip-text mt-2'>
                {sentiment}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VoiceSentiment;
