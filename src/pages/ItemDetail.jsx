import { useFetchOneItem } from "../hooks/useFetchOneItem";

export default function ItemDetail() {
  const itemId = "0HJns7rHFApEbFldWNAl"; ///////////////////////////////// replace with the id from the parameter later
  const { item, sellerInfo, isLoading } = useFetchOneItem(itemId);
  return <div>ItemDetail</div>;
}
