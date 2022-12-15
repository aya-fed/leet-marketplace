// Coded by Aya Saito

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFetchItems } from "../hooks/useFetchItems";
import Filter from "../components/Filter";
import ListView from "../components/ListView";
import LoadingSpinner from "../components/ui/LoadingSpinner";


export default function Category() {
  const params = useParams();
  const [category, setCategory] = useState(() => params.categoryName);
  const [items, setItems] = useState();

  const { getItems, listings, isLoading } = useFetchItems();

  useEffect(() => {
      getItems();
  }, []);

  useEffect(() => {
    setCategory(params.categoryName);
  }, [params.categoryName]);

  useEffect(() => {
    setItems(listings.filter(item => item.category === category))
  }, [category, listings]);

  if (isLoading){
    return <LoadingSpinner color="text-primary" />
  }
  
  return (
    <div className="w-[90%] max-w-[1200px] mx-auto flex flex-wrap md:flex-nowrap md:gap-20">
      <h3 className="mb-6 md:hidden text-neutral-light">{category}</h3>
      {items && items.length > 0 && (
        <>
          <Filter items={items} category={category} setItems={setItems} setCategory={setCategory} allItems={listings} />
          <div>
            <h2 className="mb-6 hidden md:block w-full text-neutral-light">{category} </h2>
            <ListView items={items} />
          </div>
        </>
      )}
    </div>
  );
}
