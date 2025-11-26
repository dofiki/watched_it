import { useState, useEffect } from "react";

export default function StarRating({
  defaultRating = 0,
  maxStars = 6,
  color = "text-green-800",
  size = "w-8 h-8",
  onSetRating = () => {},
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  useEffect(() => {
    setRating(defaultRating);
  }, [defaultRating]);

  function handleRating(id) {
    const newRating = id === rating ? 0 : id;
    setRating(newRating);
    onSetRating(newRating);
  }

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxStars }, (_, i) => (
        <button
          key={i}
          type="button"
          className={`cursor-pointer ${size} ${
            (tempRating || rating) >= i + 1 ? color : "text-gray-600"
          }`}
          onClick={() => handleRating(i + 1)}
          onMouseEnter={() => setTempRating(i + 1)}
          onMouseLeave={() => setTempRating(0)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            className="w-full h-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        </button>
      ))}
    </div>
  );
}
