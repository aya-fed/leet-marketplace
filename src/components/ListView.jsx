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
      <div className="grid grid-cols-1 gap-6 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
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
