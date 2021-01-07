import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import useForm from '../utils/useForm';
import SEO from '../components/SEO';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';
import usePizza from '../utils/usePizza';
import calculateOrderTotal from '../utils/calculateOrderTotal';
import PizzaOrder from '../components/PizzaOrder';

export default function OrdersPage({ data }) {
  const pizzas = data.pizzas.nodes;
  const { values, updateValue } = useForm({
    name: '',
    email: '',
  });

  const { order, addToOrder, removeFromOrder } = usePizza({
    pizzas,
    inputs: values,
  });
  return (
    <>
      <SEO title="Order a Pizza" />
      <OrderStyles action="">
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={updateValue}
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              type="text"
              name="email"
              value={values.email}
              onChange={updateValue}
            />
          </label>
        </fieldset>
        <fieldset className="menu">
          <legend>Menu</legend>
          {pizzas.map((p) => (
            <MenuItemStyles className="" key={p.id}>
              <Img
                width="50"
                height="50"
                fluid={p.image.asset.fluid}
                alt={p.name}
              />
              <div className="">{p.name}</div>
              <div className="">
                {' '}
                {['S', 'M', 'L'].map((size) => (
                  <button
                    type="button"
                    onClick={() => addToOrder({ id: p.id, size })}
                    key={size}
                  >
                    {size} {formatMoney(calculatePizzaPrice(p.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order">
          <legend>Order</legend>
          <PizzaOrder
            order={order}
            removeFromOrder={removeFromOrder}
            pizzas={pizzas}
          />
        </fieldset>
        <fieldset>
          <h3>Your Total is {calculateOrderTotal(order, pizzas)}</h3>
          <button type="submit">Order Ahead</button>
        </fieldset>
      </OrderStyles>
    </>
  );
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
