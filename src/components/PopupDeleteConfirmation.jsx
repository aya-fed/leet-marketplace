// Coded by Aya Saito

import Button from "./ui/Button";

export default function PopupDeleteConfirmation({ onClose }) {
  function deleteItem() {
    /// Add this later
    alert("will add delete function later");
  }
  return (
    <>
      <div className="flex justify-center flex-wrap items-center max-w-lg mx-auto">
        <div className="w-full">
          <h3>Are you sure?</h3>
          <div className="mt-6">Are you sure you want to delete this listing?</div>
        </div>
        <div className="w-full mt-[50px] flex gap-[14px]">
          <Button cancel className="w-1/2" onClick={onClose} />
          <Button className="w-1/2" onClick={deleteItem}>
            Delete
          </Button>
        </div>
      </div>
    </>
  );
}
