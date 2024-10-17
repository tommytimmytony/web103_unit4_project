import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import "../css/EditCar.css";
import OptionCard from "../components/OptionCard";

const EditCar = () => {
  const { id } = useParams();
  const [modalContent, setModalContent] = useState("");
  const [custom1, setCustom1] = useState("");
  const [custom2, setCustom2] = useState("");
  const [custom3, setCustom3] = useState("");
  const [custom4, setCustom4] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedCustom1, setSelectedCustom1] = useState({
    name: "",
    price: 0,
  });
  const [selectedCustom2, setSelectedCustom2] = useState({
    name: "",
    price: 0,
  });
  const [selectedCustom3, setSelectedCustom3] = useState({
    name: "",
    price: 0,
  });
  const [selectedCustom4, setSelectedCustom4] = useState({
    name: "",
    price: 0,
  });
  const [carName, setCarName] = useState("");
  const [selectedCustoms, setSelectedCustoms] = useState([
    null,
    null,
    null,
    null,
  ]);
  const [totalPrice, setTotalPrice] = useState(50000);

  const handleTotalPriceChange = () => {
    const convertible = checked ? 60000 : 50000;
    setTotalPrice(
      selectedCustom1.price +
        selectedCustom2.price +
        selectedCustom3.price +
        selectedCustom4.price +
        convertible
    );
  };

  async function fetchCustomById(customId) {
    const response = await fetch(`/api/customs/${customId}`);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    async function fetchCustomData() {
      const data1 = await fetchCustomById(1);
      const data2 = await fetchCustomById(2);
      const data3 = await fetchCustomById(3);
      const data4 = await fetchCustomById(4);

      setCustom1(data1);
      setCustom2(data2);
      setCustom3(data3);
      setCustom4(data4);
    }
    fetchCustomData();

    async function fetchCarData() {
      const response = await fetch(`/api/cars/${id}`);
      const data = await response.json();
      setSelectedCustom1({ name: data.exterior, price: data.exterior_price });
      setSelectedCustom2({ name: data.roof, price: data.roof_price });
      setSelectedCustom3({ name: data.wheels, price: data.wheels_price });
      setSelectedCustom4({ name: data.interior, price: data.interior_price });
      setChecked(data.convertible);
      setCarName(data.name)
    }
    fetchCarData();
  }, []);

  useEffect(() => {
    handleTotalPriceChange();
  }, [selectedCustom1, selectedCustom2, selectedCustom3, selectedCustom4]);

  const openModal = (content) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const handleCardSelect = (selectedCustom, custom) => {
    switch (selectedCustom) {
      case 1:
        setSelectedCustom1(custom);
        break;
      case 2:
        setSelectedCustom2(custom);
        break;
      case 3:
        setSelectedCustom3(custom);
        break;
      case 4:
        setSelectedCustom4(custom);
        break;
    }
    const updatedSelections = [...selectedCustoms];
    updatedSelections[selectedCustom - 1] = custom.name;
    setSelectedCustoms(updatedSelections);
    handleTotalPriceChange();
  };

  function updateCar(event) {
    const carCustom = {
      name: carName,
      exterior: selectedCustom1.name,
      roof: selectedCustom2.name,
      wheels: selectedCustom3.name,
      interior: selectedCustom4.name,
      exterior_price: selectedCustom1.price,
      roof_price: selectedCustom2.price,
      wheels_price: selectedCustom3.price,
      interior_price: selectedCustom4.price,
      price: totalPrice,
      convertible: checked,
    };
    event.preventDefault();
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carCustom),
    };
    fetch(`/api/cars/${id}`, options);
    window.location = "/customcars";
  }

  const deleteCar = (event) => {
    event.preventDefault();
    const options = {
      method: "DELETE",
    };
    fetch(`/api/cars/${id}`, options);
    window.location = "/customcars";
  };

  return (
    <div className="customs">
      <div className="car-options">
        <button onClick={() => openModal(custom1)}>EXTERIOR</button>
      </div>
      <div className="car-options">
        <button onClick={() => openModal(custom2)}>ROOF</button>
      </div>
      <div className="car-options">
        <button onClick={() => openModal(custom3)}>WHEELS</button>
      </div>
      <div className="car-options">
        <button onClick={() => openModal(custom4)}>INTERIOR</button>
      </div>
      {modalContent && (
        <div className="modal">
          {modalContent.map((content) => (
            <OptionCard
              key={content.content_id}
              name={content.name}
              price={content.price}
              convertible={content.convertible}
              bolt_custom_id={content.bolt_custom_id}
              isSelected={
                content.name == selectedCustoms[content.bolt_custom_id - 1]
              }
              onCardSelect={handleCardSelect}
            />
          ))}
          <button onClick={closeModal}>Done</button>
        </div>
      )}
      <div className="price">{`💰 $${totalPrice}`}</div>
      <div className="modify-btn">
        <button onClick={updateCar}>Update</button>
        <button onClick={deleteCar}>Delete</button>
      </div>
    </div>
  );
};

export default EditCar;
