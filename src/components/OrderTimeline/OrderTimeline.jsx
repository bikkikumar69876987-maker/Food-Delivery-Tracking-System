import { FaCheck } from "react-icons/fa";
import { ORDER_STAGES } from "../../utils/orders";

function OrderTimeline({ progressIndex }) {
  return (
    <section className="order-timeline" aria-label="Order progress">
      <div
        className={`order-timeline__progress order-timeline__progress--${progressIndex}`}
        aria-hidden="true"
      />
      {ORDER_STAGES.map((stage, index) => {
        const complete = index <= progressIndex;
        const current = index === progressIndex;

        return (
          <div
            className={[
              "order-timeline__step",
              complete ? "order-timeline__step--complete" : "",
              current ? "order-timeline__step--current" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            key={stage}
            aria-current={current ? "step" : undefined}
          >
            <span className="order-timeline__marker" aria-hidden="true">
              {complete ? <FaCheck /> : index + 1}
            </span>
            <span className="order-timeline__label">{stage}</span>
          </div>
        );
      })}
    </section>
  );
}

export default OrderTimeline;
