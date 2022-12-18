import { RWebShare } from "react-web-share";
import { HiOutlineShare } from "react-icons/hi";

const WebShare = ({ text, title, url, className, size }) => {
  return (
    <div>
      <RWebShare
        data={{
          text: text,
          url: url,
          title: title,
        }}
      >
        <HiOutlineShare className={`cursor-pointer ${className}`} size={size} />
      </RWebShare>
    </div>
  );
};

export default WebShare;
