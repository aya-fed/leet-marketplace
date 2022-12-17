import { useFetchOneItem } from "../hooks/useFetchOneItem";

export default function ItemDetail() {
  const itemId = "0HJns7rHFApEbFldWNAl"; ///////////////////////////////// replace with the id from the parameter later
  const { item, sellerInfo, isLoading } = useFetchOneItem(itemId);
  return <div>(
    
    <div>
      {item.imageUrls && item.imageUrls.length > 0 ? (<img className="w-[600px] h-[600px]" src={item.imageUrls[0]} alt={item.title} />) : (
      <div className="w-full h-40 bg-background-2 text-neutral-dark p-2">No image</div>)}
    </div>
    
    )</div>;
}
