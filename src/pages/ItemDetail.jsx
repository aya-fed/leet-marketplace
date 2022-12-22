
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
    <div className="grid grid-cols-1 md:grid-cols-2 w-[90%] mx-auto gap-10">
      
      
      {/* Main image and thumnail wrapper */}
      <div className="w-full"> 
        <div className="grid ">
            {/* Main image */}
            <img className="w-full mb-2" src={item.imageUrls[0]} />
            
            {/* Thumbnail pics - hidden on viewports less than 768px */}
            <div className="hidden md:grid grid-cols-3 gap-3">
              <div className="md:grid-cols-1 ">
                <img className=" " src={item.imageUrls[0]} />
              </div>
              <div className="md:grid-cols-2">
                <img className="" src={item.imageUrls[0]} />
              </div>
              <div className="md:grid-cols-3">
                <img className="" src={item.imageUrls[0]} />
              </div>
              <div className="hidden xl:grid-cols-4">
                <img className="md:h-[70px] lg:w-[102px] xl:w-[115px] xxl:w-[145px] xxl:h-[90px]" src={item.imageUrls[0]} />
              </div>
              <div className="hidden xxl:grid-cols-5">
                <img className="md:h-[70px] lg:w-[102px] xl:w-[115px] xxl:w-[145px] xxl:h-[90px]" src={item.imageUrls[0]} />
              </div>
            </div>  
        </div>
      </div>

      {/* Right hand side grid */}
      <div className="grid grid-cols-1"> 
        <div className="">

          {/* Item title/description wrapper */}
          <div className="mb-4 gap-4">
            <div className="row-start-1 text-2xl xxl:text-3xl">{item.title}</div>
            <div className="row-start-2 text-primary xxl:text-xl">{item.condition}</div>
          </div>
        
             
          {/* Price, icons and buy now button wrapper*/}
          <div className="grid grid-cols-1">
          <div className="order-last flex items-center justify-between mb-5">
            <div className="text-2xl text-primary">${item.price}</div>
            <div className="flex items-center gap-6">
              <div><Webshare /></div>
              <div><WishlistIcon size={20}/></div>
              <Button className="px-4">Buy now</Button>
            </div>
          </div>

          {/* Item description */}
          
          <div className="md:order-last w-full ">{descText}</div>
          </div>

          {/* Seller info */}
          <div className="w-full">{sellerInfo.profilePic}</div>
          <div className="w-full" >{sellerInfo.name}</div>
        </div>
          
      </div>   
    </div>
    
  );
}
