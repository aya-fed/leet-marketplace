import spinner from "../../assets/spinner.svg";

export default function LoadingSpinner({ className }) {
  return (
    <div className="bg-background-1 bg-opacity-30 flex justify-center items-center fixed left-0 right-0 top-0 bottom-0 z-50">
        <img src={spinner} alt="loading..." className="h-24" />
    </div>
  );
}
