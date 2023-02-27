import { hrefImage } from "../../constants/constants";

export default function CardAccountList({ cards, symbol }) {
  // console.log(cards);
  return (
    <>
      {cards !== null
        ? cards.map((item) => (
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
                <div className="flex justify-center items-center">
                  <button className="bg-pink-300 border rounded-md w-full font-semibold">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))
        : null}
    </>
  );
}
