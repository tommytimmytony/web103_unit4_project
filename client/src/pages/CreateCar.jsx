import { useState, useEffect } from "react";
import "../App.css";
import "../css/CreateCar.css";
import OptionCard from "../components/OptionCard";

const CreateCar = () => {
  const [modalContent, setModalContent] = useState("");
  const [custom1, setCustom1] = useState("");
  const [custom2, setCustom2] = useState("");
  const [custom3, setCustom3] = useState("");
  const [custom4, setCustom4] = useState("");
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
  const [checked, setChecked] = useState(false);
  const [carName, setCarName] = useState("");
  const [selectedCustoms, setSelectedCustoms] = useState([
    null,
    null,
    null,
    null,
  ]);
  const [totalPrice, setTotalPrice] = useState(50000);
  const [convertibleWarning, setConvertibleWarning] = useState(false);

  const openConvertibleWarning = () => {
    if (checked) {
      return;
    }
    setConvertibleWarning(true);
  };
  const closeConvertibleWarning = () => {
    setConvertibleWarning(false);
  };

  const handleCheckChange = () => {
    setChecked(!checked);
  };

  const handleInputChange = (event) => {
    setCarName(event.target.value);
  };

  const handleTotalPriceChange = () => {
    const convertiblePrice = checked ? 10000 : 0;
    setTotalPrice(
      selectedCustom1.price +
        selectedCustom2.price +
        selectedCustom3.price +
        selectedCustom4.price +
        convertiblePrice +
        50000
    );
    console.log(totalPrice);
  };

  async function fetchCustomById(customId) {
    const response = await fetch(`/api/customs/${customId}`);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    async function fetchData() {
      const data1 = await fetchCustomById(1);
      const data2 = await fetchCustomById(2);
      const data3 = await fetchCustomById(3);
      const data4 = await fetchCustomById(4);

      setCustom1(data1);
      setCustom2(data2);
      setCustom3(data3);
      setCustom4(data4);
    }
    fetchData();
  }, []);

  useEffect(() => {
    handleTotalPriceChange();
  }, [
    checked,
    selectedCustom1,
    selectedCustom2,
    selectedCustom3,
    selectedCustom4,
  ]);

  const openModal = (content) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const handleCardSelect = (selectedCustom, custom) => {
    if (custom.convertible && !checked) {
      return;
    }
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

  function createCar(event) {
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carCustom),
    };
    const response = fetch("/api/cars", options);
    window.location = "/customcars";
  }

  return (
    <div className="customs">
      <div className="convertible-check">
        <label style={{ color: checked ? "white" : "" }}>
          {" "}
          <input
            type="checkbox"
            checked={checked}
            onChange={handleCheckChange}
          />
          Convertible
        </label>
      </div>
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
      <div className="create-car">
        <input
          type="text"
          className="name-input"
          name="name"
          placeholder="My New Car"
          value={carName}
          onChange={handleInputChange}
        ></input>
        <button className="create-car-button" onClick={createCar}>
          Create
        </button>
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
              openConvertibleWarning={openConvertibleWarning}
            />
          ))}
          <button onClick={closeModal}>Done</button>
        </div>
      )}
      {convertibleWarning && (
        <div className="modal">
          <h2 style={{ textAlign: "center" }}>
            Sorry, you can't put that roof on a coupe 😔 Please choose another
            option or check Convertible to switch to a convertible.
          </h2>
          <button onClick={closeConvertibleWarning}>Done</button>
        </div>
      )}

      <div className="create-car-price">{`💰 $${totalPrice}`}</div>
    </div>
  );
};

export default CreateCar;
