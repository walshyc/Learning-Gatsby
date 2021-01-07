const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `
  <div>
  <h2>Your Recent Order for ${total}</h2>
  <p>Please start walking over, we will have your order ready in the next 20 mins.</p>
  <ul>
    ${order
      .map(
        (item) => `<li>
                    <img src = "${item.thumbnail}" alt="${item.name}"/>
                    ${item.size} ${item.name} - ${item.price}
                  </li>`
      )
      .join('')}
  </ul>
  <p>Your total is <strong>${total}</strong> due at pickup</p>
  </div>
  <style>
  ul {
    list-style: none;
  }
  </style>
  `;
}

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const wait = (ms) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  // validate the data coming in is correct
  const requiredFields = ['email', 'name', 'order'];
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops you are missing the ${field} field!`,
        }),
      };
    }
  }
  // make sure an order has items

  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Why would you order nothing?!`,
      }),
    };
  }

  // send the email
  const info = await transporter.sendMail({
    from: 'Slicks Slices <slick@example.com>',
    to: `${body.name} <${body.email}>, conorwalsh0703@gmail.com`,
    subject: 'New Order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  // send the success or error message

  // Test send an email
  return { statusCode: 200, body: JSON.stringify({ message: 'Success' }) };
};
