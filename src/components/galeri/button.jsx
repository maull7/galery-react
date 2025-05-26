const Button = ({ onClick, bg = 'bg-red-500', children }) => {
  return (
    <button
      onClick={onClick}
      className={`${bg} text-white px-3 py-2 rounded-full cursor-pointer shadow-md hover:opacity-80 transition-all`}
    >
      {children}
    </button>
  );
};

export default Button;
