const Stripe = require("stripe");
//const db = require("../config/db");

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
            cancel_url: `${process.env.FRONTEND_URL}/student/cancel?session_id={CHECKOUT_SESSION_ID}`,
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
        const { studentId, feesType } = session.metadata;
        const amount = session.amount_total / 100;
        const transactionId = session.payment_intent;
        const status = session.payment_status;
        console.log(studentId, feesType, transactionId, amount, status);
        res.json({ success: true, message: "Payment recorded successfully" });
        // Store transaction in MySQL
        // db.query(
        //   "INSERT INTO transactions (student_id, fees_type, transaction_id, amount, status) VALUES (?, ?, ?, ?, ?)",
        //   [studentId, feesType, transactionId, amount, status],
        //   (err) => {
        //     if (err) {
        //       console.error("Error saving transaction:", err);
        //       return res.status(500).json({ error: "Database error" });
        //     }
        //     res.json({ success: true, message: "Payment recorded successfully" });
        //   }
        // );
    } catch (error) {
        console.error("Error saving transaction:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { initializePayment, saveTransaction };

