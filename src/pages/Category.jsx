import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ListView from "../components/ListView";
import { useFetchItems } from "../hooks/useFetchItems";


export default function Category() {
  const params = useParams();
  const [category, setCategory] = useState(() => params.categoryName);
  const [items, setItems] = useState();

  const { getItems, listings } = useFetchItems();

  useEffect(() => {
      getItems();
  }, []);

  useEffect(() => {
    setItems(listings.filter(item => item.category === category))
  }, [category, listings]);

  console.log(items)
  console.log(category);
  return (
    <div className="max-w-[1400px] mx-auto ">
      <ListView items={items} />
    </div>
  );
}
