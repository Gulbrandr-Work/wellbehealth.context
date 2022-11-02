const PathSelector = ({ children, title, copy }) => {
  return (
    <div className="p-4 w-full md:w-1/2 bg-white">
      <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden ">
        <h1 className="text-3xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
          {title} somethign different
        </h1>
        <p>{copy}</p>
        {children}
      </div>
    </div>
  );
};

export default PathSelector;
