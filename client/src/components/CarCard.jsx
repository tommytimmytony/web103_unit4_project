import { useState, useEffect } from "react";
import "../css/CarCard.css"

export default function CarCard(props) {

    const [car, setCar] = useState([])
    useEffect(() => {
        setCar({
            car_id: props.car_id,
            name: props.name,
            exterior: props.exterior,
            interior: props.interior,
            price: props.price,
            wheels: props.wheels,
            roof: props.roof,
        })
    }, [props])
  return (
    <>
      <article>
        <header>
          <h3>{car.name}</h3>
        </header>
        <div className="car-card">
          <div className="car-summary">
            <p>
              <strong>🖌️ Exterior:</strong> {car.exterior}
            </p>
            <p>
              <strong>😎 Roof:</strong> {car.roof}
            </p>
          </div>
          <div className="car-summary">
            <p>
              <strong>🛴 Wheels:</strong> {car.wheels}
            </p>
            <p>
              <strong>💺 Interior:</strong> {car.interior}
            </p>
          </div>
          <div className="car-price">
            <p>💰 ${car.price}</p>
            <a href={`/customcars/${car.car_id}`} role="button">
              Details
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
