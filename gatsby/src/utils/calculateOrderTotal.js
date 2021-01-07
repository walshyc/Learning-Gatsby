import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

export default function calculateOrderTotal(order, pizzas) {
  const total = order.reduce((acc, item) => {
    const pizza = pizzas.find((pizza) => pizza.id === item.id);

    return acc + calculatePizzaPrice(pizza.price, item.size);
  }, 0);

  return formatMoney(total);
}
