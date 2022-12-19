// Ethan Cullen
import itemCategories from "../data/categories";
import { useFetchItems } from "../hooks/useFetchItems";
import ItemCard from "./ItemCard";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import ItemCardHorizontal from "./ItemCardHorizontal";

export default function ListViewHorizontal({ items: propItems }) {
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
    <div className="w-full ">
      <div className=" overflow-hidden   ">
        {items.map((item) => {
    
          return (
            <div key={item.itemId}>
              <ItemCardHorizontal item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
