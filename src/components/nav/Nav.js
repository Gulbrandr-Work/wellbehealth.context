import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const Nav = () => {
  const { updatePath, pathReset } = useContext(GlobalContext);
  return (
    <nav className="container p-6 mx-auto flex justify-between items-center border shadow">
      <div className="flex items-center justify-between">
        <div className="max-w-md md:max-w-xs">
          <span
            className="text-2xl font-bold text-gray-800  hover:text-gray-700"
            href="#"
            onClick={() => pathReset("home")}
          >
            <img
              className="invisible md:visible hidden md:block max-w-xs"
              src="/wellbe-logo.png"
              alt="wellbe health"
            />
            <span
              className="visible md:invisible md:hidden text-purple-400 text-lg "
              onClick={() => pathReset("home")}
            >
              WellbeHealth
            </span>
          </span>
        </div>
        <div className="flex mt-0 flex-row -px-8 space-y-0">
          <span
            className="mx-8 text-gray-700 transition-colors duration-200 transform hover:text-blue-500"
            href="#"
            onClick={() => pathReset("participant")}
          >
            Participants
          </span>
          <span
            className="mx-8 text-gray-700 transition-colors duration-200 transform hover:text-blue-500"
            href="#"
            onClick={() => pathReset("Provider")}
          >
            Providers
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
