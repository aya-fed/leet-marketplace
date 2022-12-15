// Coded by Michele Carter

import itemCategories from "../data/categories";
import { useFetchItems } from "../hooks/useFetchItems";
import ItemCard from "./ItemCard";
import { Link } from 'react-router-dom';
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
    <div>
      <div>
      
        <div className="grid grid-cols-1 gap-6 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {items.map((item, index) => {
            console.log(item);
              return (
                <div key={index}>
            <Link to={`/item-detail/${item.itemId}`} > <ItemCard item={item} /></Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
