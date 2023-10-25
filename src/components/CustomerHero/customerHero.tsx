export default function CustomerHero() {
  return (
    <div className="relative">
      <img
        src="./images/bg.svg"
        alt=""
        className="w-full mx-auto text-center "
      />
      <img
        src="./images/title.svg"
        alt=""
        className="absolute top-[20%] left-[30%]"
        style={{maxWidth: "50%"}}
      />
    </div>
  );
}
