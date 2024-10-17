import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import "../css/CarDetails.css";

const CarDetails = ({ data }) => {
  const { id } = useParams();
  const [car, setCar] = useState([]);

  useEffect(() => {
    const fetchCarById = async () => {
      const response = await fetch(`/api/cars/${id}`);
      const data = await response.json();
      setCar(data);
    };
    fetchCarById();
  }, [data, id]);

    const deleteCar = (event) => {
      event.preventDefault();
      const options = {
        method: "DELETE",
      };
      const response = fetch(`/api/cars/${id}`, options);
      window.location = "/customcars";
    };

  return (
    <div>
      <article className="car-full-details">
        <div>
          <h2 style={{ color: "black" }}>{car.name}</h2>
        </div>
        <div className="details-content">
          <div className="car-details-price">
            <p>💰 ${car.price}</p>
          </div>
          <div className="car-selection">
            <div className="car-selection-overlay">
              <div className="car-selection-details">
                <p style={{ color: "black" }}>
                  <strong>🖌️ Exterior:</strong> {car.exterior}
                </p>
                <p className="option-price">💵 ${car.exterior_price}</p>
              </div>
            </div>
          </div>
          <div className="car-selection">
            <div className="car-selection-overlay">
              <div className="car-selection-details">
                <p style={{ color: "black" }}>
                  <strong>😎 Roof:</strong> {car.roof}
                </p>
                <p className="option-price">💵 ${car.roof_price}</p>
              </div>
            </div>
          </div>

          <div className="car-selection">
            <div className="car-selection-overlay">
              <div className="car-selection-details">
                <p style={{ color: "black" }}>
                  <strong>🛴 Wheels:</strong> {car.wheels}
                </p>
                <p className="option-price">💵 ${car.wheels_price}</p>
              </div>
            </div>
          </div>
          <div className="car-selection">
            <div className="car-selection-overlay">
              <div className="car-selection-details">
                <p style={{ color: "black" }}>
                  <strong>💺 Interior:</strong> {car.interior}
                  Seat
                </p>
                <p className="option-price">💵 ${car.interior_price}</p>
              </div>
            </div>
          </div>
          <div className="car-modify">
            <a href={`/edit/${id}`} role="button">
              Edit
            </a>
            <button onClick={deleteCar}>Delete</button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default CarDetails;
