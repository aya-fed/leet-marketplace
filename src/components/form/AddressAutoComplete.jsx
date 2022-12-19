// Coded by Aya Saito

import { useRef, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import RequiredChip from "./RequiredChip";

const AddressAutoComplete = ({
  id,
  label,
  labelClassName,
  value,
  placeholder,
  required,
  className,
  stacked,
  onChange: propOnChange,
}) => {
  const [address, setAddress] = useState(value);
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "nz" },
    fields: ["address_components"],
  };

  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, options);
  }, []);

  function onBlur(e) {
    if (autoCompleteRef.current.gm_accessors_.place.jj.formattedPrediction) {
      let postcode;
      setTimeout(() => {
        const tempLength = autoCompleteRef.current.gm_accessors_.place.jj.place.address_components.length;
        postcode =
          " " + autoCompleteRef.current.gm_accessors_.place.jj.place.address_components[tempLength - 1].long_name;
        if (address.indexOf(postcode) > -1) {
          postcode = "";
        }
        const cleanAddress = autoCompleteRef.current.gm_accessors_.place.jj.formattedPrediction.replace(
          ", New Zealand",
          ""
        );
        setAddress(cleanAddress + postcode);
        setTimeout(() => {
          onChange(e);
        }, 100);
      }, 500);
    }
  }
  function onChange(e) {
    setAddress(e.target.value);
    propOnChange(e);
  }

  return (
    <div
      className={`text-left my-6 ${!stacked && label ? "sm:grid items-center sm:grid-cols-[1fr_minmax(0,_3fr)]" : ""}`}
    >
      <div>
        {label && (
          <div className="flex flex-wrap items-center">
            <label htmlFor={id} className={`my-1 mr-2 ${labelClassName}`}>
              {label}
            </label>
            {required && <RequiredChip />}
          </div>
        )}
        <div className="relative rounded overflow-hidden">
          <input
            type="text"
            ref={inputRef}
            id={id}
            value={address}
            className={twMerge(`
            w-full py-2 
            border 
            border-neutral-light
            bg-transparent
            rounded-[10px] 
            px-4
            ${className ?? ""}
          `)}
            placeholder={placeholder}
            onBlur={onBlur}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};
export default AddressAutoComplete;
