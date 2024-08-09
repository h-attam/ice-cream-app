const Card = ({ item, addToBasket, removeFromBasket, amount }) => {
  return (
    <div
      style={{ width: "200px" }}
      className="border rounded p-3 d-flex flex-column align-items-center gap-1"
    >
      <img src={item.imagePath} alt="çeşit-resim" height={100} />
      <span>{item.name}</span>

      <div className="d-flex gap-2 mt-4 align-items-center">
        <button
          disabled={amount === 0}
          onClick={() => removeFromBasket(item.id)}
          className="btn btn-sm btn-outline-danger"
        >
          Azalt
        </button>
        <span data-testid="amount" className="fs-2">
          {amount}
        </span>
        <button
          onClick={() => addToBasket(item)}
          className="btn btn-sm btn-outline-success"
        >
          Ekle
        </button>
      </div>
    </div>
  );
};

export default Card;