import axios from "axios";

export const createCheckoutSession = async (req, res) => {
  const { title, price } = req.body;

  try {
    const response = await axios.post(
      "https://api.commerce.coinbase.com/charges",
      {
        name: title,
        description: `Purchase beat: ${title}`,
        pricing_type: "fixed_price",
        local_price: {
          amount: price,
          currency: "USD",
        },
        redirect_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
      },
      {
        headers: {
          "X-CC-Api-Key": process.env.COINBASE_API_KEY,
          "X-CC-Version": "2018-03-22",
        },
      }
    );

    res.status(200).json({ hostedUrl: response.data.data.hosted_url });
  } catch (error) {
    console.error("Checkout Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};
