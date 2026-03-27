// NorgeTravel brand background blobs
// Navy (#1B3A5C) top-right + Aurora Green (#00CC6A) bottom-left
export function NorgeBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-[#1B3A5C]/10 rounded-full blur-[100px] opacity-70"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-[#00CC6A]/10 rounded-full blur-[100px] opacity-70"></div>
    </div>
  );
}
