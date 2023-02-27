import Link from "next/link";
import { hrefImage } from "../../constants/constants";

export default function CardHomeList({ cards, symbol }) {
  return (
    <>
      {cards.map((item) => (
        <div key={item.id} className="p-5">
          <div>
            <img
              src={`${hrefImage}${item.image}`}
              alt=""
              className="w-full h-[300px] object-cover overflow-hidden border rounded-lg hover:scale-110 hover:transition hover:duration-200"
            />
          </div>
          <div>
            <h2 className="text-[20px] font-semibold">Name: {item.name}</h2>
            <h4 className="text-[16px] font-medium">ETH: {item.eth} ETH</h4>
            <h4 className="text-[16px] font-medium">
              Price: {item.token} {symbol}
            </h4>
            <Link
              href={{
                pathname: "/buy/[id]",
                query: { id: item.id },
              }}
            >
              <button className="w-full bg-pink-300 border rounded-md text-black text-[18px]">
                Buy
              </button>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
