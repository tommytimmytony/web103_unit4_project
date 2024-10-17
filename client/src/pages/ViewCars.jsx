import { useState, useEffect } from "react";
import "../App.css";
import CarCard from "../components/CarCard";

const ViewCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
        const response = await fetch("/api/cars");
        const data = await response.json();
        console.log(data);
        setCars(data);
    };
    fetchCars();
  }, [])

  return (
    <div>
      {cars && cars.length > 0 ? (
        cars.map((car) => (
          <CarCard
            car_id={car.car_id}
            name={car.name}
            exterior={car.exterior}
            roof={car.roof}
            wheels={car.wheels}
            interior={car.interior}
            price={car.price}
          ></CarCard>
        ))
      ) : (
        <h3 className="noResults">{"No Car Yet 😞"}</h3>
      )}
    </div>
  );
};

export default ViewCars;
