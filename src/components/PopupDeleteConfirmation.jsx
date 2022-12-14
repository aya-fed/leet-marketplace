// Coded by Aya Saito

import Button from "./ui/Button";

export default function PopupDeleteConfirmation({ onClose, onSubmit }) {
  function deleteItem() {}
  return (
    <>
      <div className="flex justify-center flex-wrap items-center max-w-lg mx-auto">
        <div className="w-full">
          <h3>Are you sure?</h3>
          <div className="mt-6">Are you sure you want to delete this listing?</div>
        </div>
        <div className="w-full mt-[50px] flex gap-[14px]">
          <Button cancel className="w-1/2" onClick={onClose} />
          <Button className="w-1/2" onClick={onSubmit}>
            Delete
          </Button>
        </div>
      </div>
    </>
  );
}
