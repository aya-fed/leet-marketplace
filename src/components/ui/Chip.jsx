export default function Chip({ className, children }) {
  let defaultClasses = "bg-neutral-500 py-[3px] px-3 text-white font-semibold";
  if (className) {
    if (className.indexOf("bg-") > -1) {
      defaultClasses = defaultClasses.replace(/bg-[a-zA-Z]+(-\d)?/, "");
    }
    if (className.match(/text-((xs|sm|base|lg|xl|\dxl)|\[\d+.?\d?[a-z]+\])/)) {
      defaultClasses = defaultClasses.replace(/text-((xs|sm|base|lg|xl|\dxl)|\[\d+.?\d?[a-z]+\])/, "");
    }
    if (className.match(/text-([a-zA-Z0-9-]+|\[([a-z]+|#[A-Fa-f0-9]+)\])/)) {
      defaultClasses = defaultClasses.replace(/text-([a-zA-Z0-9-]+|\[([a-z]+|#[A-Fa-f0-9]+)\])/, "");
    }
    if (className.match(/(\s|\")(p-|py-|px-|pt-|pb-|pr-|pl-)([0-9]+|\[\d+.?\d?[a-z]+\])/)) {
      defaultClasses = defaultClasses.replace(/(\s|\")(p-|py-|px-|pt-|pb-|pr-|pl-)([0-9]+|\[\d+.?\d?[a-z]+\])/g, "");
    }
  }

  return (
    <div className={`inline-block rounded-2xl text-sm flex items-center ${defaultClasses} ${className}`}>
      {children}
    </div>
  );
}
