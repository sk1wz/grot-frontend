const watermarkShadow = [
  "drop-shadow(1px 1px 1px rgba(255, 255, 255, 0.75))",
  "drop-shadow(2px 3px 6px rgba(100, 115, 140, 0.3))",
  "drop-shadow(4px 7px 14px rgba(80, 95, 120, 0.45))",
  "drop-shadow(-1px -1px 2px rgba(255, 255, 255, 0.5))",
].join(" ");
export const LogoName = () => {
  return (
    <h2
      className="px-1 bg-[linear-gradient(90deg,rgba(62,60,75,0.2)_0%,#D4DDEA_4%,#FFFFFF_31%,#FFFFFF_60%,#D4DDEA_85%,rgba(62,60,75,0.2)_100%)] bg-clip-text bg-center bg-no-repeat bg-size-[calc(100%+1rem)_100%] text-4xl font-bold text-transparent"
      style={{ filter: watermarkShadow }}
    >
      InfoFusion
    </h2>
  );
};
