import Select from "react-select";
import RequiredChip from "./RequiredChip";

const SelectDropdown = ({
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
  isMulti,
  isDisabled,
  isClearable,
  isSearchable,
  isFilter,
}) => {
  let dropdownOptions = [];

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
      background: "#1E2235",
    }),
    option: (styles, state) => ({
      ...styles,
      backgroundColor: "#1E2235",
      // padding: 20,
      "&:hover": {
        backgroundColor: "#252A41",
      },
    }),
    control: () => ({
      // styles for the box itself
      // width: 200,
      border: isFilter ? "solid 0 0 1px 0 #FFF" : "solid 1px #FFF",
      borderRadius: "4px",
      display: "flex",
      backgroundColor: "transparent",
    }),
    singleValue: (styles, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      return { ...styles, opacity, transition };
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
        placeholder={placeholder}
        value={value}
        closeMenuOnSelect={closeMenuOnSelect}
        isMulti={isMulti}
        options={dropdownOptions}
        formatGroupLabel={formatGroupLabel}
        isDisabled={isDisabled}
        isSearchable={isSearchable}
        onChange={e => onChange(e)}
        styles={customStylesFilter}
        components={{
          IndicatorSeparator: () => null,
        }}
      />
    </div>
  );
};

export default SelectDropdown;
