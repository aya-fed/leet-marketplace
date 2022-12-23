// Ethan Cullen

import Item from "./Item.jsx";
import { FAQ, RESOURCES, COMPANY, SUPPORT } from "./Menus.js";
const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 ">
      <Item Links={FAQ} title="FAQ" />
      <Item Links={RESOURCES} title="RESOURCES" />
      <Item Links={COMPANY} title="COMPANY" />
      <Item Links={SUPPORT} title="SUPPORT" />
    </div>
  );
};

export default ItemsContainer;