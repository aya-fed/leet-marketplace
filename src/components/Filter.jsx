// Coded by Aya Saito

import { useEffect, useState } from "react";

import Checkbox from "./form/Checkbox";
import makeAnimated from "react-select/animated";
import itemCategories from "../data/categories";
import SelectDropdown from "./form/SelectDropdown";

export default function Filter({ 
  items: propItems, 
  setItems: propSetItems, 
  category:propCategory, 
  setCategory: propSetCategory, 
  allItems 
}) {
  const animatedComponents = makeAnimated();
  const categories = itemCategories.slice();
  categories.unshift({ value: "", label: "All" });

  const [showFilter, setShowFilter] = useState(false); // for mobile
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(items);
  const [categoryItems, setCategoryItems] = useState(items);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryMeta, setCategoryMeta] = useState(null);
  const [selectedMeta, setSelectedMeta] = useState({});

  useEffect(() => {
    setItems(propItems);
    setSelectedCategory(propCategory);
    if (items) {
      showMetaFilters(propCategory,items);
    }
  }, [propItems, propCategory]);


  // Category filter -----------------------------------------------------
  function onChangeCategory(e) {
    console.log(e.value);
    const categoryVal = e.value;
    setSelectedCategory(categoryVal);
    propSetCategory(categoryVal);
    if (categoryVal) {
      if (items) {
        filterWithCategory(categoryVal, items);
      }
    } else {
      setFilteredItems(items);
      setCategoryMeta(null);
      setSelectedMeta({});
    }
  }

  function filterWithCategory(categoryVal) {
    // Filter items
    const matchingItems = allItems.filter(item => item.category === categoryVal);
    setFilteredItems(matchingItems);
    setCategoryItems(matchingItems);
    propSetItems(matchingItems);
    console.log(matchingItems);
    showMetaFilters(categoryVal, matchingItems);
  }

  // Set Metadata filter fields
  function showMetaFilters(categoryVal, matchingItems) {
    // Category meta
    // Identify which category group it's under
    const categoryGroup = itemCategories.filter(catGroup => catGroup.options.some(cat => cat.value === categoryVal))[0]
      .options;
    const metaDataBase = categoryGroup.filter(cat => cat.value === categoryVal)[0].metadata;
    // Only show the available metadata options / value range in the filter
    const availableMetaData = metaDataBase.map(meta => {
      const options = [];
      // check each item
      matchingItems.forEach(item => {
        const itemMetadataArr = Object.entries(item.metadata).map(([key, value]) => ({ key, value }));
        if (itemMetadataArr) {
          itemMetadataArr.forEach(data => {
            if (data.key === meta.name) {
              switch (meta.type) {
                // for select dropdown
                case "select":
                  // if there is no matching option then push it to the options array
                  if (!options.some(opt => opt.value === data.value)) {
                    options.push({ value: data.value, label: data.value });
                  }
                // for number input field
                case "inputNumber":
                  if (options.length === 0) {
                    options.min = 0;
                    options.max = 0;
                  }
                  options.min = data.value < options.min ? data.value : options.min;
                  options.max = data.value > options.max ? data.value : options.max;
                  break;
              }
            }
          });
        }
      });
      return { name: meta.name, type: meta.type, options: options };
    });
    setCategoryMeta(availableMetaData);
  }

  // Metadata filter onChange
  function onMetaFilterChange(metaName, e) {
    const selectedMetaCopy = { ...selectedMeta, [metaName]: e };

    if (e.length === 0) {
      // if empty delete property itself from the object
      delete selectedMetaCopy[metaName];
    }
    setSelectedMeta(selectedMetaCopy);
    if (selectedMetaCopy.length === 0) {
      setFilteredItems(categoryItems);
    } else {
      filterWithMeta(selectedMetaCopy);
    }
  }

  function filterWithMeta(metaFilter) {
    const matchingItems = [];
    categoryItems.forEach(item => {
      let match = true;
      // if the metadata is empty remove from matchingItems array
      if (Object.keys(item.metadata).length === 0) {
        match = false;
        // } else {
        //   Object.keys(metaFilter).forEach(key => {
        //     // if the property doesn't exist remove from matchingItems array
        //     if (!item.metadata.hasOwnProperty(key)) {
        //       match = false;
        //     } else if (metaFilter[key].findIndex(({ value }) => value === item.metadata[key]) < 0) {
        //       match = false;
        //     }
        //   });
      }
      if (match) {
        matchingItems.push(item);
      }
    });
    setFilteredItems(matchingItems);
  }

  return (
    <div
      className={`${
        showFilter ? "p-4" : "p-2"
      } 
      rounded-lg w-full bg-background-3 flex flex-wrap justify-center 
      md:py-4 px-6 mb-6 md:min-w-[280px] md:max-h-[600px]
      `}
    >
      <div className={`w-full md:w-48 text-center md:hidden`} onClick={() => setShowFilter(!showFilter)}>
        Filter
      </div>
      <div className={`filter-dropdown w-full md:w-full p-0 ${!showFilter && "hidden md:block"}`}>
        <SelectDropdown
          options={categories}
          placeholder="Category"
          value={{ value: selectedCategory, label: selectedCategory }}
          closeMenuOnSelect={true}
          components={animatedComponents}
          onChange={onChangeCategory}
          isFilter
        />
        {categoryMeta &&
          categoryMeta.map((meta, index) => {
            switch (meta.type) {
              case "select":
                return (
                  <SelectDropdown
                    key={meta.name + index}
                    name={meta.name}
                    placeholder={`${meta.name}`}
                    value={{ value: selectedMeta[meta.name], label: selectedMeta[meta.name] }}
                    options={
                      Object.keys(selectedMeta).length === 0 || !selectedMeta[meta.name]
                        ? meta.options
                        : meta.options.filter(opt => selectedMeta[meta.name].indexOf(opt.value) < 0)
                    }
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={true}
                    onChange={e => onMetaFilterChange(meta.name, e)}
                    onReset={e => onMetaFilterChange(meta.name, e)}
                    className="w-full"
                    isFilter
                  />
                );
                break;
              case "checkbox":
                return <Checkbox key={meta.name + index} checked={false} label={meta.name} onChange={e => {}} />;
                break;
              case "inputNumber": // range slider
                return;
                break;
            }
          })}
      </div>
    </div>
  );
}
