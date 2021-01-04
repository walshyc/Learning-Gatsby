import React from 'react';
import { Link } from 'gatsby';

const SinglePizza = ({ pizza }) => (
  <div>
    <Link to={`/pizza/${pizza.slug.current}`}>
      <h2>
        <span className="mark">{pizza.name}</span>
      </h2>
      <p>{pizza.toppings.map((t) => t.name).join(', ')}</p>
    </Link>
  </div>
);

const PizzaList = ({ pizzas }) => (
  <div>
    {pizzas.map((p) => (
      <SinglePizza key={p.id} pizza={p} />
    ))}
  </div>
);

export default PizzaList;