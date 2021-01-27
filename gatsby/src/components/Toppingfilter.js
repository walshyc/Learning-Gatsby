import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    padding: 5px;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    background: var(--grey);
    align-items: center;
    border-radius: 2px;
    text-decoration: none;
    font-size: clamp(1.5rem, 1.4vw, 2.5rem);
    .count {
      background: white;
      padding: 2px 5px;
    }
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

const countPizzasInToppings = (pizzas) => {
  const counts = pizzas
    .map((p) => p.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if this exists already, increment by 1 if so, otherwise create new entry
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        existingTopping.count += 1;
      } else {
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      return acc;
    }, {});

  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );

  return sortedToppings;
};

const Toppingfilter = ({ activeTopping }) => {
  // Get a list of all toppings
  // Get a list of all pizzas with toppings
  const { toppings, pizzas } = useStaticQuery(graphql`
    query ToppingQuery {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          name
          toppings {
            id
            name
          }
        }
      }
    }
  `);
  // Count how many pizzas are on each topping
  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
  // Loop over list of toppings and display count of pizzas with that topping
  return (
    <ToppingsStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map((t) => (
        <Link
          to={`/topping/${t.name}`}
          key={t.id}
          className={t.name === activeTopping ? 'active' : ''}
        >
          <span className="name">{t.name}</span>
          <span className="count">{t.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
};

export default Toppingfilter;
