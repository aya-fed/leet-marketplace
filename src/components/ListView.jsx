import itemCategories from "../data/categories";
import { useFetchItems } from "../hooks/useFetchItems";

export default function ListView() {
  const categories = itemCategories.slice();
  categories.unshift({ value: "", label: "All" });
  // console.log(categories);
  const { listings: items } = useFetchItems();
  // console.log(items);

  return (
    <div>
      <div>ListView</div>
    </div>
  );
}
