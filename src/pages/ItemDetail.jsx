
import { useFetchOneItem } from "../hooks/useFetchOneItem";
import { useParams } from "react-router";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import WishlistIcon from "../components/ui/WishlistIcon";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button"
import Webshare from "../components/ui/Webshare"

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
        <img className="w-[411px] h-[411px] mx-10" src={item.imageUrls[0]} />
        <div className="flex mt-3 ml-10 w-[411px] justify-between">
          <img className="w-[127px] h-[110px]" src={item.imageUrls[0]} />
          <img className="w-[127px] h-[110px]" src={item.imageUrls[0]} />
          <img className="w-[127px] h-[110px]" src={item.imageUrls[0]} />
        </div>        
      </div>
      <div className="w-[800px] h-[725px] overflow-y-scroll">
        <div className="text-2xl mb-[30px]">{item.title}</div>
        <div>
          <div className="text-2xl text-primary">${item.price}</div>
          <div><Webshare /></div>
          <Link to="/wishlist"><WishlistIcon size={20}/></Link>
          <Button>Buy now</Button>
        </div>
        
        <div>{descText}</div>
      </div>
    </div>
  );
}
