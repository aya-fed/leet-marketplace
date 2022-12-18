// Coded by Aya Saito

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFetchItems } from "../hooks/useFetchItems";
import Filter from "../components/Filter";
import ListView from "../components/ListView";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import SortDropdown from "../components/SortDropdown";
import sortOptions from "../data/sortOptions";

export default function Search() {
  const params = useParams();
  const [keywords, setKeywords] = useState();
  const [category, setCategory] = useState();
  const [items, setItems] = useState([]);
  const [sortBy, setSortBy] = useState(sortOptions[1]);

  const { getItems, listings, isLoading } = useFetchItems();

  useEffect(() => {
    getItems();
  }, []);

  // Set parameter as keywords
  useEffect(() => {
    setKeywords(params.keywords);
  }, [params.keywords]);

  // // Sort by...
  useEffect(() => {
    if (items.length > 0) {
      setItems(prev => {
        const copy = prev.slice();
        copy.sort((a, b) => {
          const key = sortBy.dbField;
          const order = sortBy.order;
          const result = (order === "asc" && a[key] > b[key]) || (order === "desc" && a[key] < b[key]) ? 1 : -1;
          return result;
        });
        return copy;
      });
    }
  }, [sortBy]);

  // show spinner while loading
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-[90%] mx-auto flex flex-wrap md:flex-nowrap md:gap-5">
      <h3 className="mb-6 md:hidden text-neutral-light">
        {items.length === 0 ? "No matching items found" : `Results for "${keywords}"`}
      </h3>
      <>
        <Filter
          items={items}
          category={category}
          setItems={setItems}
          setCategory={setCategory}
          allItems={listings}
          keywords={keywords}
        />
        <div>
          <div>
            <h3 className="hidden md:block w-full text-neutral-light">
              {items.length === 0 ? "No matching items found" : `Results for "${keywords}"`}
            </h3>
            <SortDropdown sortBy={sortBy} setSortBy={setSortBy} className={`-mt-3 md:mt-[unset] z-[5] relative`} />
          </div>
          <ListView items={items && items} />
        </div>
      </>
    </div>
  );
}
