import { useState } from "react";
import ChatBot from "./ChatBot";

const ParkisonDetect = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [sentiment, setSentiment] = useState(null);
  const [error, setError] = useState("");

  // Validate input data format
  const validateData = (inputText) => {
    // Remove any extra whitespace and split by commas
    const values = inputText
      .trim()
      .split(",")
      .map((val) => val.trim());

    // Check if we have numerical values
    const isValid = values.every((val) => {
      // Check if the value can be converted to a number
      const num = parseFloat(val);
      return !isNaN(num);
    });

    // Ensure we have at least some minimum number of values (adjust as needed)
    if (values.length < 10) {
      setError(
        "Please provide at least 10 numerical values separated by commas"
      );
      return false;
    }

    if (!isValid) {
      setError("Please enter only numerical values separated by commas");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError("Please enter data");
      return;
    }

    // Validate the input data before proceeding
    if (!validateData(text)) {
      return;
    }

    setLoading(true);
    setSentiment(null);

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ features: text }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setSentiment(
        (data.prediction == 0
          ? "No Parkinson Detected"
          : "Parkinson Detected") || "No response"
      );
    } catch (error) {
      console.error("Error:", error);
      setSentiment("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 relative overflow-hidden'>
      {/* Heading */}
      <h1 className='text-5xl md:text-6xl font-extrabold text-center leading-tight mb-4'>
        <span className='bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text'>
          Parkinson Disease Analyzer
        </span>
      </h1>
      <div className='flex flex-col lg:flex-row justify-between w-full mt-10'>
        <div className='flex flex-col items-center justify-center w-full'>
          {/* Description */}
          <p className='text-gray-300 text-lg md:text-xl text-center max-w-2xl mb-10'>
            Enter your speech parameter transcript — our AI will analyze the
            text and detect signs of Parkinson's.
          </p>

          {/* Text Input */}
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error) setError(""); // Clear error when user types
            }}
            rows={6}
            placeholder='Enter comma-separated numerical values (e.g., 2.11, 0.72, 2.62, -0.75, ...)'
            className='w-full max-w-xl p-4 text-lg rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2'
          />

          {/* Error message */}
          {error && (
            <p className='w-full max-w-xl text-red-400 text-sm mb-4 px-1'>
              {error}
            </p>
          )}

          {/* Example format helper */}
          <p className='w-full max-w-xl text-gray-400 text-sm mb-6 px-1'>
            Example format: 2.112, 0.723, 2.628, -0.755, -0.901, -0.677, ...
          </p>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`transition-all duration-300 ease-in-out px-8 py-4 text-lg font-semibold rounded-lg shadow-lg ${
              loading
                ? "bg-gray-700 text-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-pink-500 text-white"
            }`}
          >
            {loading ? "Analyzing..." : "Analyze Data 🧠"}
          </button>

          {/* Result */}
          {sentiment && (
            <div className='mt-10 w-full max-w-lg bg-gradient-to-br from-purple-900/30 to-blue-900/10 border border-purple-600/30 rounded-2xl p-6 shadow-xl backdrop-blur-sm'>
              <h3 className='text-xl font-bold text-pink-400 mb-4 text-center'>
                🧾 AI Prediction Result
              </h3>
              <p className='text-4xl font-bold text-center bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-transparent bg-clip-text'>
                {sentiment}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating ChatBot */}
      <div className='absolute md:visible invisible bottom-4 right-4 z-50'>
        <ChatBot />
      </div>
    </div>
  );
};

export default ParkisonDetect;
