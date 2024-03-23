import { useCart } from "../../hooks/useCart";

const Cart = () => {
  const { cart, cartTotal } = useCart();
  return (
    <div>
      <h3>Cart</h3>
      <ul>
        {Object.entries(cart).map(([itemCode, quantity]) => {
          if (!quantity) {
            return null;
          }
          return (
            <li key={itemCode}>
              {itemCode} - {quantity}
            </li>
          );
        })}
      </ul>
      <h4>Total {cartTotal}</h4>
    </div>
  );
};

export default Cart;
