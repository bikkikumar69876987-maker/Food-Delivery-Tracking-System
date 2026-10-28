import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { DELIVERY_PARTNER } from "../../utils/orders";

function DeliveryPartner() {
  return (
    <section className="delivery-partner">
      <div className="delivery-partner__photo" aria-label="Photo placeholder">
        <FaUser aria-hidden="true" />
      </div>
      <div className="delivery-partner__details">
        <p className="delivery-partner__eyebrow">YOUR DELIVERY PARTNER</p>
        <h2>{DELIVERY_PARTNER.name}</h2>
        <a
          className="delivery-partner__phone"
          href={`tel:${DELIVERY_PARTNER.phone.replace(/\s/g, "")}`}
        >
          <FaPhoneAlt aria-hidden="true" />
          {DELIVERY_PARTNER.phone}
        </a>
        <p className="delivery-partner__vehicle">
          Vehicle number <strong>{DELIVERY_PARTNER.vehicleNumber}</strong>
        </p>
      </div>
    </section>
  );
}

export default DeliveryPartner;
