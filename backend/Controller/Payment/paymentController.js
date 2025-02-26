const Stripe = require("stripe");
const db = require("../../config/mysqlConfig");
const sendMail = require("../../miscellaneous/sendMail");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const initializePayment = async (req, res) => {
  try {
    const { studentId, amount } = req.body;

    if (!studentId || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log(`Processing  payment for Student: ${studentId}`);
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      customer_email: `${studentId}@nec.edu.in`,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Hostel Fees`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        studentId,
        amount,
      },
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    };

    const session = await stripe.checkout.sessions.create(params);
    console.log("Session", session);
    res.status(303).json(session);
  } catch (error) {
    console.error("Error creating payment session:", error);
    res.status(500).json({ error: error.message });
  }
};

const saveTransaction = async (req, res) => {
  try {
    const { sessionId } = req.query;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const { studentId, amount } = session.metadata;
    const Transaction_Id = session.payment_intent;
    const status = session.payment_status;
    const feestype = session.payment_method_types[0];
    const email = session.customer_email;

    if (!Transaction_Id) {
      console.log("No Transaction ID found. Payment failed or not initiated.");
      await sendMail(
        email,
        "Payment Failed - College Fees Portal",
        `Dear Student,\n\nYour payment attempt for ₹${amount} (${feestype}) has failed.\nPlease try again or contact support if the issue persists.\n\nBest Regards,\nCollege Finance Team`
      );
      return res.status(400).json({ error: "Payment not completed" });
    }

    const insertQuery = `
      INSERT INTO transaction (Transaction_Id, student_id, feestype, amount)
      VALUES (?, ?, ?, ?)
    `;

    db.query(
      insertQuery,
      [Transaction_Id, studentId, feestype, amount],
      async (err) => {
        if (err) {
          console.error("Error saving transaction:", err);
          await sendMail(
            email,
            "Payment Error - College Fees Portal",
            `Dear Student,\n\nThere was an error recording your payment.\nTransaction ID: ${Transaction_Id}\nAmount: ₹${amount}\n\nPlease contact support for assistance.\n\nBest Regards,\nCollege Finance Team`
          );
          return res.status(500).json({ error: "Database error" });
        }

        if (status === "paid") {
          await sendMail(
            email,
            "Payment Successful - College Fees Portal",
            `Dear Student,\n\nYour payment of ₹${amount} for ${feestype} has been successfully recorded.\nTransaction ID: ${Transaction_Id}\n\nThank you!\n\nBest Regards,\nCollege Finance Team`
          );
          res.json({
            success: true,
            message: "Payment recorded successfully & Email Sent",
          });
        } else {
          console.log("Hello ");
          await sendMail(
            email,
            "Payment Pending - College Fees Portal",
            `Dear Student,\n\nYour payment for ₹${amount} (${feestype}) is currently pending.\nTransaction ID: ${Transaction_Id}\n\nPlease check your bank for confirmation or contact support if needed.\n\nBest Regards,\nCollege Finance Team`
          );
          res.json({ success: true, message: "Payment pending, email sent" });
        }
      }
    );
  } catch (error) {
    console.error("Error processing transaction:", error);
    await sendMail(
      "admin@college.com", // Send an email to admin
      "Urgent: Payment Processing Error",
      `An error occurred while processing a payment.\nError: ${error.message}`
    );
    res.status(500).json({ error: error.message });
  }
};

module.exports = saveTransaction;

module.exports = { initializePayment, saveTransaction };
