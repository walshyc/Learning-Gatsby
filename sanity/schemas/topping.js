import { FaPepperHot as icon } from 'react-icons/fa';
export default {
  name: 'topping',
  title: 'Toppings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Topping Name',
      type: 'string',
      description: 'What is the name of the topping',
    },
    {
      name: 'vegetarian',
      title: 'Vegetarian',
      type: 'boolean',
      description: 'Is this topping Vegetarian?',
      options: { layout: 'switch' },
    },
  ],
  preview: {
    select: { name: 'name', vegetarian: 'vegetarian' },
    prepare: (fields) => ({
      title: `${fields.name} ${fields.vegetarian ? '🥗' : ''}`,
    }),
  },
};
