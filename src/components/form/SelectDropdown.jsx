// Coded by Aya Saito

import { useState } from "react";
import Select from "react-select";
import RequiredChip from "./RequiredChip";

const SelectDropdown = ({
  ref,
  label,
  labelClassName,
  stacked,
  required,
  id,
  placeholder,
  options,
  value,
  closeMenuOnSelect,
  onChange,
  onBlur,
  isMulti,
  isDisabled,
  isClearable,
  isSearchable,
  isFilter,
}) => {
  let dropdownOptions = [];
  const [isFocused, setIsFocused] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  if (typeof options[0] === "string") {
    options.map(opt => {
      dropdownOptions.push({ value: opt, label: opt });
    });
  } else {
    dropdownOptions = options;
  }

  // Custom styles
  const customStylesFilter = {
    menuList: styles => ({
      ...styles,
      color: "#FFF",
      background: "#1E2235",
      zIndex: "1000",
      position: "relative",
      "::-webkit-scrollbar": {
        width: "4px",
        height: "0px",
      },
      "::-webkit-scrollbar-track": {
        background: "#252A41",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#424867",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#424867",
      },
    }),
    option: (styles, state) => ({
      ...styles,
      color: "#FFF",
      backgroundColor: "#1E2235",
      // padding: 20,
      "&:hover": {
        backgroundColor: "#252A41",
      },
    }),
    control: () => ({
      // styles for the box itself
      color: "#FFF",
      border: isFilter
        ? "solid 0 0 1px 0 #FFF"
        : isFocused
        ? "solid 1px #FBBC05"
        : isInvalid
        ? "solid 1px #EA4335"
        : "solid 1px #FFF",
      borderRadius: "10px",
      display: "flex",
      backgroundColor: "transparent",
    }),
    singleValue: (styles, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const color = "#FFF";
      const transition = "opacity 300ms";
      return { ...styles, color, opacity, transition };
    },
  };
  // group style
  const formatGroupLabel = data => (
    <div className="flex">
      <span className="text-lg font-semibold normal-case text-primary">{data.label}</span>
      {/* <span>{data.options.length}</span> */}
    </div>
  );

  return (
    <div
      className={`
    select-dropdown my-6 
      ${!stacked && label ? "sm:grid items-start sm:grid-cols-[1fr_minmax(0,_2fr)]" : ""}
      `}
    >
      {label && (
        <div className={`flex justify-start items-center md:flex-wrap md:justify-start`}>
          <label htmlFor={id} className={`my-1 mr-2 ${labelClassName}`}>
            {label}
          </label>
          {required && <RequiredChip />}
        </div>
      )}

      <Select
        id={id}
        placeholder={<div>{placeholder}</div>}
        value={value}
        closeMenuOnSelect={closeMenuOnSelect}
        isMulti={isMulti}
        options={dropdownOptions}
        formatGroupLabel={formatGroupLabel}
        isDisabled={isDisabled}
        isSearchable={isSearchable}
        onChange={e => onChange(e)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          // needs refactoring
          setIsInvalid(required && value.value === "" ? true : false);
        }}
        styles={customStylesFilter}
        components={{
          IndicatorSeparator: () => null,
        }}
      />
    </div>
  );
};

export default SelectDropdown;
