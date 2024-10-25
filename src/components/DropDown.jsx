import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

const Dropdown = ({ label, passedArray, setIsDropdownOpen, isDropdownOpen }) => {
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    return (
      <div>
        <label className="mt-4">{label}</label>
  
        <button className="  px-4 w-full py-2 flex items-center justify-between  rounded border border-[#828FA340] hover:border-primary cursor-pointer relative " onClick={toggleDropdown}>
          <span className="block">
            <FaChevronDown color="#635FC7" size={24} />
          </span>
        {isDropdownOpen && (
            <div className="absolute bottom-full translate-x-9  left-full translate-y-full rounded bg-[#20212c] w-max">
              <ul className="flex flex-col p-2">
                {
                passedArray.map((item, index) => (
                    <li
                        key={index}
                        className={`flex items-center gap-2 p-4 hover:bg-[#2b2c37] rounded transition-all duration-200 `}
                    >
                        <span>{item.name}</span>
                    </li>
                ))}
              </ul>
            </div>
          )}
        </button>
      </div>
    );
  };

export default Dropdown