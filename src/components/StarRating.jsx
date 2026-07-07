import React from "react";
import { assets } from "../assets/assets";

const StarRating = ({ rating = 4.8 }) => {
  return (
    <div
      className="flex shrink-0 items-center gap-2 text-sm font-semibold text-slate-700"
      aria-label={`${rating} out of 5 stars`}
    >
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <img
            key={index}
            src={index < Math.round(rating) ? assets.starIconFilled : assets.starIconOutlined}
            alt=""
            className="h-3.5 w-3.5"
          />
        ))}
      </div>
      <span>{rating.toFixed(1)}</span>
    </div>
  );
};

export default StarRating;
