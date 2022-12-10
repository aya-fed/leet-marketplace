import ListView from "../components/ListView";

export default function Home() {
  return (
    <div className="w-[90%] my-6 mx-auto">
      just checking theme configs...
      <p className="w-fit">Base</p>
      <p className="w-fit text-primary">primary</p>
      <p className="w-fit text-secondary">secondary</p>
      <p className="w-fit text-secondary-dark">secondary-dark</p>
      <p className="w-fit text-warning">warning</p>
      <p className="w-fit text-yellow">yellow</p>
      <p className="w-fit text-neutral-light">neutral-light</p>
      <p className="w-fit text-neutral">neutral</p>
      <p className="w-fit text-neutral-dark">neutral-dark</p>
      <p className="text-gradient-1 text-xl">gradient-1</p>
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
