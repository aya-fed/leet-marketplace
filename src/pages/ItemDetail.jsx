import { useFetchOneItem } from "../hooks/useFetchOneItem";
import { useParams } from "react-router";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export default function ItemDetail() {
  const params = useParams();
  const itemId = params.itemId
  const { item, sellerInfo, isLoading } = useFetchOneItem(itemId);
  console.log("item data", item);
  console.log("seller info", sellerInfo);
  

  if (isLoading) {
    <LoadingSpinner />
    return <LoadingSpinner />
  }

  const descText = item.description.split("\n").map((line, index) => {
    return (
      <span key={index}>
        {line}
        <br />
      </span>
    );
  });
  
  return (
    <div className="flex">
      <div className=""> 
        <img className="w-[611px] h-[611px] mx-10" src={item.imageUrls[0]} />
        <div className="flex mt-3 ml-10 w-[611px] justify-between">
          <img className="w-[110px] h-[110px]" src={item.imageUrls[0]} />
          <img className="w-[110px] h-[110px]" src={item.imageUrls[0]} />
          <img className="w-[110px] h-[110px]" src={item.imageUrls[0]} />
          <img className="w-[110px] h-[110px]" src={item.imageUrls[0]} />
          <img className="w-[110px] h-[110px]" src={item.imageUrls[0]} />
        </div>        
      </div>
      <div className="w-[611px] h-[725px] overflow-scroll">
        <div>{item.title}</div>
        <div>${item.price}</div>
        <div></div>
        <div>{descText}</div>
      </div>
    </div>
  );
}
