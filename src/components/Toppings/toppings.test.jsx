import axios from "axios";
import { useEffect, useState } from "react";

const Toppings = () => {
  const [data, setData] = useState([]);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4090/toppings")
      .then((res) => setData(res.data));
  }, []);

  const handleChange = (isChecked, item) => {
    if (isChecked) {
      setBasket([...basket, item]);
    } else {
      setBasket(basket.filter((i) => i.name !== item.name));
    }
  };

  return (
    <div>
      <h1>Sos Çeşitleri</h1>
      <p>
        Tanesi <span className="text-success">3</span>
      </p>
      <h3>
        Soslar Ücreti <span data-testid="total">{basket.length * 3}</span>
      </h3>

      <div className="row p-3 mt-4 gap-3">
        {data.map((item) => (
          <div className="top-card col" key={item.id}>
            <label htmlFor={item.name}>
              <img src={item.imagePath} height={100} alt={item.name} />
              <p className="text-nowrap text-center">{item.name}</p>
            </label>

            <input
              onChange={(e) => handleChange(e.target.checked, item)}
              id={item.name}
              type="checkbox"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toppings;
