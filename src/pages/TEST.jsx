import { useState } from "react";

import { HiHeart } from "react-icons/hi";
import Button from "../components/ui/Button";
import Modal from "../components/Modal";
import PopupAuthForm from "../components/PopupAuthForm";
import InputField from "../components/form/InputField";
import Textarea from "../components/form/Textarea";
import SelectDropdown from "../components/form/SelectDropdown";
import Checkbox from "../components/form/Checkbox";
import PopupDeleteConfirmation from "../components/PopupDeleteConfirmation";
import PopupPostFeedback from "../components/PopupPostFeedback";

export default function TEST() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpenContentCheck, setIsModalOpenContentCheck] = useState(true);
  return (
    <div className="w-[90%] my-6 mx-auto">
      {/* Checking Form components -------------------------------------------------- */}
      <form className="w-[85%] md:max-w-[600px] mx-auto mt-10">
        {/* Input ---------------------------------------------------------------- */}
        <InputField label="Input Text" placeholder="Input text field" required />
        <SelectDropdown
          label="Select dropdown"
          placeholder="Select dropdown example"
          options={["category1", "category2", "category3", "categoryyyy4"]}
          required
        />
        <Textarea label="Textarea" className="h-[150px]" placeholder="Textarea" required />
        <InputField label="Input with $" type="number" currency="$" placeholder="0" onChange={() => {}} required />
        <Checkbox label="Checkbox" reverse checked={false} required />
      </form>
      <hr className="my-6" />
      <div className="flex gap-10">
        {/* Checking Button component -------------------------------------------------- */}
        <div className="w-60 flex flex-wrap gap-2">
          <Button>Test Button</Button>
          <Button cancel />
          <Button
            className="border-white text-white hover:border-secondary hover:text-secondary"
            onClick={() => alert("Clicked!")}
          >
            onClick & className props
          </Button>
          <Button className="bg-primary border-none text-background-1 font-semibold">
            <HiHeart />
            With Icon
          </Button>
          <Button className="!w-fit px-4 text-secondary border-secondary">
            <HiHeart />
          </Button>
        </div>

        {/* Checking Modal component -------------------------------------------------- */}
        <div className="w-60 flex flex-wrap items-start gap-2">
          <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
          {isModalOpen && (
            <Modal
              title="Modal Test"
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              onClose={() => alert("Closed modal.")}
            />
          )}

          <Button onClick={() => setIsModalOpen2(true)}>Modal with contents</Button>

          {isModalOpen2 && (
            <Modal title="Modal Test" isModalOpen={isModalOpen2} setIsModalOpen={setIsModalOpen2}>
              <p>This is the content.</p>
              <Button className="mt-6" onClick={() => setIsModalOpen2(false)}>
                Close
              </Button>
            </Modal>
          )}

          {isModalOpenContentCheck && (
            <Modal
              isModalOpen={isModalOpenContentCheck}
              setIsModalOpen={setIsModalOpenContentCheck}
              onClose={() => setIsModalOpenContentCheck(false)}
            >
              {/* <PopupAuthForm /> */}
              {/* <PopupDeleteConfirmation onClose={() => setIsModalOpenContentCheck(false)} /> */}
              <PopupPostFeedback onClose={() => setIsModalOpenContentCheck(false)} />
            </Modal>
          )}
        </div>
      </div>
      {/* Truncate text using  -------------------------------------------------- */}
      <hr className="my-6" />
      <div className="text-neutral max-w-[350px]">
        "line-clamp" class to truncate text
        <p className="text-xs">(@tailwindcss/line-clamp - an official Tailwind plugin)</p>
        <div className="mt-6">
          e.g. <br />
          className="line-clamp-2" to truncate 2 lines
        </div>
        <div className="my-6 p-6 bg-background-3 ">
          <p className="text-white line-clamp-2">
            *NEW* Razer Blade 14 - 14" Gaming Laptop w/ AMD Ryzen 6900HX |Black|16GB RAM|1TB
          </p>
        </div>
      </div>
      {/* Checking tailwind theme config... -------------------------------------------------- */}
      <hr className="my-6" />
      <p className="w-fit">Base</p>
      <p className="w-fit text-primary">primary</p>
      <p className="w-fit text-secondary">secondary</p>
      <p className="w-fit text-secondary-dark">secondary-dark</p>
      <p className="w-fit text-warning">warning</p>
      <p className="w-fit text-yellow">yellow</p>
      <p className="w-fit text-neutral-light">neutral-light</p>
      <p className="w-fit text-neutral">neutral</p>
      <p className="w-fit text-neutral-dark">neutral-dark</p>
      <p className="w-fit text-gradient-1 text-xl">gradient-1</p>
      <div className="flex mt-5 gap-2 flex-wrap max-w-20">
        <div className="h-20 w-40 p-2 text-xs bg-background-1 rounded shadow-xl">background-1</div>
        <div className="h-20 w-40 p-2 text-xs bg-background-2 rounded shadow-xl">background-2</div>
        <div className="h-20 w-40 p-2 text-xs bg-background-3 rounded shadow-xl">background-3</div>
        <div className="h-20 w-40 p-2 text-xs bg-background-4 rounded shadow-xl">background-4</div>
        <div className="h-20 w-40 p-2 text-xs bg-gradient-1 rounded shadow-xl">gradient-1</div>
      </div>
    </div>
  );
}
