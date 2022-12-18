// Coded by Aya Saito

import { useEffect, useState } from "react";

import Checkbox from "./form/Checkbox";
import makeAnimated from "react-select/animated";
import itemCategories from "../data/categories";
import SelectDropdown from "./form/SelectDropdown";
import RangeFilter from "./form/RangeFilter";

export default function Filter({
  items: propItems,
  setItems: propSetItems,
  category: propCategory,
  setCategory: propSetCategory,
  keywords: propKeywords,
  allItems,
}) {
  const animatedComponents = makeAnimated();
  const categories = itemCategories.slice();
  categories.unshift({ value: "", label: "All" });

  const [showFilter, setShowFilter] = useState(false); // for mobile
  // states for items to display
  const [categoryItems, setCategoryItems] = useState(null);
  // states for showing filters
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [categoryMeta, setCategoryMeta] = useState(null);
  const [selectedMeta, setSelectedMeta] = useState({});
  const [priceMinMax, setPriceMinMax] = useState(null);
  const [priceRangeVals, setPriceRangeVals] = useState(null);

  //
  useEffect(() => {
    setCategoryItems(allItems);
    setPriceRange(allItems);
    setSelectedCategory("");
    filterWithKeywords(propKeywords, allItems);
  }, []);

  // Filter by keywords (using parameter from the parent component)
  useEffect(() => {
    if (propKeywords && categoryItems) {
      filterWithKeywords(propKeywords, propItems);
    }
  }, [selectedCategory]);

  function filterWithKeywords(keywords, items) {
    const keywordArr = keywords.trim().split(/ +/);
    // console.log(keywordArr);
    const matchingItems = items.filter(item => {
      const title = item.title.toLowerCase();
      return keywordArr.every(word => title.indexOf(word.toLowerCase()) > 0);
    });
    // console.log(matchingItems);
    if (matchingItems.length > 0) {
      setCategoryItems(matchingItems);
      propSetItems(matchingItems);
      setPriceRange(matchingItems);
    } else {
      setCategoryItems([]);
      propSetItems([]);
      setPriceRange([]);
    }
  }

  // Set pre-selected category as a selected category state and show meta filter
  useEffect(() => {
    if (propCategory && !selectedCategory) {
      setSelectedCategory(propCategory);
      filterWithCategory(propCategory);
    }
  }, [propCategory]);

  // Set price min max values for the price range filter
  function setPriceRange(itemArr) {
    // console.log(itemArr);
    if (itemArr.length > 0) {
      const min = itemArr.reduce((a, b) => (a.price < b.price ? a : b));
      const max = itemArr.reduce((a, b) => (a.price > b.price ? a : b));
      setPriceMinMax({
        min: min.price,
        max: max.price,
      });
      setPriceRangeVals({
        min: min.price,
        max: max.price,
      });
    } else {
      setPriceMinMax({ min: 0, max: 0 });
      setPriceRangeVals({ min: 0, max: 0 });
    }
  }

  // Category filter -----------------------------------------------------
  function onChangeCategory(e) {
    // console.log(e.value);
    const categoryVal = e.value;
    setSelectedCategory(categoryVal);
    propSetCategory(categoryVal);
    if (categoryVal) {
      if (allItems) {
        filterWithCategory(categoryVal, allItems);
      }
    } else {
      setCategoryItems(allItems);
      propSetItems(allItems);
      setPriceRange(allItems);
      setCategoryMeta(null);
      setSelectedMeta({});
    }
  }

  function filterWithCategory(categoryVal) {
    // Filter items with category
    const matchingItems = allItems.filter(item => item.category === categoryVal);
    setCategoryItems(matchingItems);
    propSetItems(matchingItems);
    setPriceRange(matchingItems); // for price range filter
    // console.log(matchingItems);
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
      propSetItems(categoryItems);
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
      } else {
        Object.keys(metaFilter).forEach(key => {
          // if the property doesn't exist remove from matchingItems array
          if (!item.metadata.hasOwnProperty(key)) {
            match = false;
          } else if (metaFilter[key].findIndex(({ value }) => value === item.metadata[key]) < 0) {
            match = false;
          }
        });
      }
      if (match) {
        matchingItems.push(item);
      }
    });
    propSetItems(matchingItems);
    setPriceRange(matchingItems);
  }

  // Price filter -----------------------------------------------------
  useEffect(() => {
    // console.log(propItems);
    if (priceMinMax && priceRangeVals) {
      if (categoryItems) {
        const matchingItems = categoryItems.filter(
          item => item.price >= priceRangeVals.min && item.price <= priceRangeVals.max
        );
        propSetItems(matchingItems);
      }
    }
  }, [priceRangeVals]);

  return (
    <div
      className={`${showFilter ? "p-4" : "p-2"} 
      rounded-lg w-full bg-background-3 flex flex-wrap justify-center 
      md:py-4 px-6 mb-6 md:min-w-[280px] md:max-w-[300px] md:max-h-[600px]
      `}
    >
      <div className={`w-full md:w-48 text-center md:hidden`} onClick={() => setShowFilter(!showFilter)}>
        Filter
      </div>
      <div className={`filter-dropdown w-full md:w-full p-0 ${!showFilter && "hidden md:block"}`}>
        <SelectDropdown
          options={categories}
          placeholder="Category"
          value={selectedCategory && { value: selectedCategory, label: selectedCategory }}
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
                    // label={meta.name}
                    // labelClassName="text-xs ml-3 text-neutral-light"
                    placeholder={`${meta.name}`}
                    value={selectedMeta[meta.name]}
                    options={
                      Object.keys(selectedMeta).length === 0 || !selectedMeta[meta.name]
                        ? meta.options
                        : meta.options.filter(opt => selectedMeta[meta.name].indexOf(opt.value) < 0)
                    }
                    isMulti
                    isClearable
                    closeMenuOnSelect={true}
                    hideSelectedOptions={true}
                    onChange={e => onMetaFilterChange(meta.name, e)}
                    onReset={e => onMetaFilterChange(meta.name, e)}
                    className="w-full relative"
                    isFilter
                    stacked
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
        {priceMinMax && (
          <RangeFilter
            id="price"
            label="Price"
            price
            min={priceMinMax.min}
            max={priceMinMax.max}
            className="px-2"
            setValue={setPriceRangeVals}
          />
        )}
      </div>
    </div>
  );
}
