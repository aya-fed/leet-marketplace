import { RWebShare } from "react-web-share";
import { FiShare2 } from "react-icons/fi";

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
        <FiShare2 className={`cursor-pointer ${className}`} size={size} />
      </RWebShare>
    </div>
  );
};

export default WebShare;
