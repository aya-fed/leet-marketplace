import itemCategories from "../data/categories";
import { useFetchItems } from "../hooks/useFetchItems";
import ItemCard from "./ItemCard";

export default function ListView() {
  const categories = itemCategories.slice();
  categories.unshift({ value: "", label: "All" });
  // console.log(categories);
  const { listings: items } = useFetchItems();
  // console.log(items);

  return (
    <div>
      <div>
      <div className="grid grid-cols-5 gap-4">
      {items.map((item, index) => {
        return (
          <div>
            <ItemCard key={index} item={item} />
          </div>
        );
      })}
    </div>
        </div>
    </div>
  );
}
