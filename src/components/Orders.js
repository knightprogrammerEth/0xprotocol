import FillZRX from "./FillZRX";
function Orders({ orders }) {
  return (
    <div>
      {orders &&
        orders.map((el, i) => {
          return (
            <div key={i} className="p-4 border-2 my-3">
              <p>
                Taker Token:{" "}
                <span className="text-red-500">{el.order.takerToken}</span>
              </p>
              <p>
                Maker Token:{" "}
                <span className="text-red-500">{el.order.makerToken}</span>
              </p>
              <p>
                Taker Amount:{" "}
                <span className="text-red-500">
                  {+el.order.takerAmount}
                  <span className="text-gray-500">
                     WEI (10^6)
                  </span>
                </span>
              </p>
              <p>
                Maker Amount:{" "}
                <span className="text-red-500">
                  {+el.order.makerAmount} 
                  <span className="text-gray-500">
                     WEI (10^18)
                  </span>
                </span>
              </p>
              <FillZRX value={el.order} />
            </div>
          );
        })}
    </div>
  );
}

export default Orders;
