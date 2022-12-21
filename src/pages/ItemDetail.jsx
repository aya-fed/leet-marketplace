
import { useFetchOneItem } from "../hooks/useFetchOneItem";
import { useParams } from "react-router";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import WishlistIcon from "../components/ui/WishlistIcon";
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
    // Container wrapper
    <div className="flex-col w-[90%] md:w-[95%] mx-auto">
      
      <div className="md:flex">
      {/* Main image and thumnail wrapper */}
      <div className="w-full xxl:w-[30vw] xxl:ml-0 mx-auto mb-5 md:mb-0 md:mr-5"> 
        
        <div className="flex-col xxl:w-[40vw]">
            {/* Main image */}
          <div className="flex">
            <img className="w-full xxl:w-[30vw] mb-2" src={item.imageUrls[0]} />
          </div>
          {/* Thumbnail pics - hidden on viewports less than 768px */}
          <div className="hidden md:flex xxl:w-[30vw] justify-between gap-2 ">
            <img className="md:w-[85px] md:h-[70px] lg:w-[102px] xl:w-[115px] xxl:w-[185px] xxl:h-[120px]" src={item.imageUrls[0]} />
            <img className="md:w-[85px] md:h-[70px] lg:w-[102px] xl:w-[115px] xxl:w-[185px] xxl:h-[120px]" src={item.imageUrls[0]} />
            <img className="md:w-[85px] md:h-[70px] lg:w-[102px] xl:w-[115px] xxl:w-[185px] xxl:h-[120px]" src={item.imageUrls[0]} />
            <img className="hidden lg:flex md:h-[70px] lg:w-[102px] xl:w-[115px] xxl:w-[185px] xxl:h-[120px]" src={item.imageUrls[0]} />
          </div>  
        </div>
      </div>

      {/* Item title */}
      <div>
        <div className="mb-4 h-[112px] lg:h-[80px] xl:h-[80px] xxl:h-[110px]">
          <div className="text-2xl xxl:text-4xl">{item.title}</div>
          <div className="text-primary xxl:text-2xl">{item.condition}</div>
        </div>

        {/* Item description */}
        <div className="md:order-1 w-full xxl:text-2xl">{descText}</div>
        </div>
      </div>

        {/* Wrapper for price, icons, buy now button and item description */}
        <div className="flex flex-col md:flex-col-reverse">
          {/* Price, icons and buy now button */}
          <div className="flex items-center justify-between mb-5">
            <div className="text-2xl text-primary">${item.price}</div>
            <div className="flex items-center gap-6">
              <div><Webshare /></div>
              <div><WishlistIcon size={20}/></div>
              <Button className="px-4">Buy now</Button>
          </div>
        </div>
        

        

        {/* Seller info */}
        <div className="w-full h-full">{sellerInfo.profilePic}</div>
        <div className="w-full h-full" >{sellerInfo.name}</div>
      </div>   
    </div>
  );
}
