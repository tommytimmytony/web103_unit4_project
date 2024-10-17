import { useState, useEffect } from "react";
import "../css/OptionCard.css";

export default function OptionCard(props) {
  const [custom, setCustom] = useState({});

  useEffect(() => {
    setCustom({
      bolt_custom_id: props.bolt_custom_id,
      name: props.name,
      price: props.price,
      convertible: props.convertible,
    });
  }, [props]);

  return (
    <div
      className="option-card"
      style={{
        border: props.isSelected ? "2px solid green" : "2px solid white",
      }}
      onClick={() => {
        props.onCardSelect(custom.bolt_custom_id, {
          name: custom.name,
          price: custom.price,
          convertible: custom.convertible,
        });
        props.convertible ? props.openConvertibleWarning() : null
      }}
    >
      <div className="option-card-details">
        <p>{`${custom.name}💵 $${custom.price} ${
          custom.convertible ? "Convertible Only" : ""
        }`}</p>
      </div>
    </div>
  );
}
