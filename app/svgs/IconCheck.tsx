const IconCheck = ({ stroke }: { stroke?: string }) => {
  return (
    <svg width="10" height="8" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.5 4.5l2.124 2.124L8.97 1.28"
        stroke={stroke || "#fff"}
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default IconCheck;
