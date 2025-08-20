const Banner = () => {
  const content = (
    <>
      <span className="mx-3">NEXA FASHION</span>
      <span className="mx-3">★</span>
      <span className="mx-3">NEXA FASHION</span>
      <span className="mx-3">★</span>
      <span className="mx-3">NEXA FASHION</span>
      <span className="mx-3">★</span>
      <span className="mx-3">NEXA FASHION</span>
      <span className="mx-3">★</span>
    </>
  );

  return (
    <div className="w-full lg:h-16 items-center overflow-hidden bg-black text-white py-2 flex sm:my-4 lg:my-8 ">
      <div
        className="flex justify-around gap-5 whitespace-nowrap text-xl lg:text-3xl font-semibold animate-scroll gap-x-3"
        style={{
          animation: "scroll 190s linear infinite",
        }}
      >
        <span>{content}</span>
        <span>{content}</span>
        <span>{content}</span>
        <span>{content}</span>
        <span>{content}</span>
        <span>{content}</span>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};

export default Banner;
