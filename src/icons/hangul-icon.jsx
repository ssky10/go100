import React from "react";

const HangulIcon = ({ size, color }) => {
  return (
    <svg
      version="1"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 3570 3340"
    >
      <g fill={color}>
        <path d="M2480 1670V0h550v1090h540v460h-540v1790h-550V1670zM176 2346L-4 2173l109-51c59-29 110-52 112-52 3 0 64-36 137-79 344-208 613-453 808-736 130-189 191-332 233-543l7-32H270V210h1772l-6 98c-25 372-98 647-253 954-116 229-253 417-448 614-148 149-253 234-444 359-135 88-503 286-528 285-5-1-89-79-187-174z" />
      </g>
    </svg>
  );
};

export default HangulIcon;