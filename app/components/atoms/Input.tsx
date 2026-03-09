const Input = () => {
  return (
    <div className="flex justify-center items-center">
      <input
        type="text"
        placeholder="Search here..."
        className="w-full max-w-sm px-4 py-2 rounded-full bg-[#0081de62] shadow-md border
            border-transparent outline-none transition-all duration-200
           focus:border-blue-400 focus:ring-blue-200 focus:ring-2"
      />
    </div>
  );
};

export default Input;
