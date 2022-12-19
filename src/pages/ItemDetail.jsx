
import { useFetchOneItem } from "../hooks/useFetchOneItem";
import { useParams } from "react-router";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import WishlistIcon from "../components/ui/WishlistIcon";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button"
import WebShare from "../components/ui/WebShare"

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
      <div className="mx-10"> 
        <img className="w-[611px] h-[611px] " src={item.imageUrls[0]} />
        <div className="flex mt-3 w-[411px] gap-4">
          <img className="w-[110px] h-[110px]" src={item.imageUrls[0]} />
          <img className="w-[110px] h-[110px]" src={item.imageUrls[0]} />
          <img className="w-[110px] h-[110px]" src={item.imageUrls[0]} />
          <img className="w-[110px] h-[110px]" src={item.imageUrls[0]} />
          <img className="w-[110px] h-[110px]" src={item.imageUrls[0]} />
        </div>        
      </div>
      <div className="w-[800px] min-h-fit">
        <div className="text-3xl mb-[30px]">{item.title}</div>
        <div className="flex mb-[30px] justify-between">
          <div className="text-3xl text-primary">${item.price}</div>
          <div className="flex gap-10 items-center">
            <div><WebShare size={20} /></div>
            <Link to="/wishlist"><WishlistIcon size={20}/></Link>
            <Button className="px-4">Buy now</Button>
          </div>
        </div>
        
        <div>{descText}</div>
      </div>
    </div>
  );
}
