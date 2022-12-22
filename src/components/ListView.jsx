// Coded by Michele Carter

import itemCategories from "../data/categories";
import { useFetchItems } from "../hooks/useFetchItems";
import ItemCard from "./ItemCard";
import { useEffect, useState } from "react";

export default function ListView({ items: propItems }) {
  const categories = itemCategories.slice();
  categories.unshift({ value: "", label: "All" });
  
  const { getItems, listings } = useFetchItems();
  const [items, setItems] = useState(propItems ?? []);
  useEffect(() => {
    if (!propItems) {
      getItems();
    }
  }, []);
  useEffect(() => {
    if(!propItems){
      setItems(listings);
    } else {
      setItems(propItems);
    }
  }, [listings, propItems]);

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-wrap gap-4 justify-center ">
        {items.map((item) => {
        // console.log(item);
          return (
            <div key={item.itemId}>
              <ItemCard item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
