// Coded by Aya Saito

import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import sortOptions from "../data/SortOptions";

export default function SortDropdown({ sortBy, setSortBy }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(sortBy ?? sortOptions[1]);

  function toggle(option) {
    setIsOpen(!isOpen);
    if (option.id !== selectedOption.id) {
      setSelectedOption(option);
      setSortBy(option);
    }
  }
  return (
    <div className="w-min whitespace-nowrap text-sm text-neutral-light">
      {selectedOption && (
        <div
          className={`flex justify-start gap-2 items-center py-3 text-primary cursor-pointer`}
          onClick={() => toggle(selectedOption)}
        >
          <div>Sort By {selectedOption.label}</div>
          <HiChevronDown className={`${isOpen && "rotate-180"}`} />
        </div>
      )}

      <div
        className={`rounded bg-background-3 overflow-hidden shadow scale-y-0 ${
          isOpen && "scale-y-100"
        } transition origin-top`}
      >
        {sortOptions.map(opt => (
          <div
            key={opt.id}
            className={`p-3 scale-y-0 cursor-pointer ${
              selectedOption.id === opt.id ? "bg-background-4" : "hover:text-primary"
            } ${isOpen && "scale-y-100 "} transition origin-top`}
            onClick={() => toggle(opt)}
          >
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  );
}
