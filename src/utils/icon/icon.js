import "./icon.scss";

export const ReplyIcon = ({ color }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 15L6.75 12.75H5.25C4.65326 12.75 4.08097 12.5129 3.65901 12.091C3.23705 11.669 3 11.0967 3 10.5V6C3 5.40326 3.23705 4.83097 3.65901 4.40901C4.08097 3.98705 4.65326 3.75 5.25 3.75H12.75C13.3467 3.75 13.919 3.98705 14.341 4.40901C14.7629 4.83097 15 5.40326 15 6V10.5C15 11.0967 14.7629 11.669 14.341 12.091C13.919 12.5129 13.3467 12.75 12.75 12.75H11.25L9 15Z"
        stroke="white"
        className={color}
        stroke-width="1.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6 6.75H12"
        className={color}
        stroke="white"
        stroke-width="1.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6 9.75H10.5"
        className={color}
        stroke="white"
        stroke-width="1.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const Upvote = ({ color }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 5V19"
        stroke="#878A8C"
        className={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16 9L12 5"
        stroke="#878A8C"
        className={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 9L12 5"
        stroke="#878A8C"
        className={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const Downvote = ({ color }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 5V19"
        stroke="#878A8C"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16 15L12 19"
        stroke="#878A8C"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 15L12 19"
        stroke="#878A8C"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
