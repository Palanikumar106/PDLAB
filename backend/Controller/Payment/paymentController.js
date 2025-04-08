// const Stripe = require("stripe");
// const db = require("../../config/mysqlConfig");
// const sendMail = require("../../miscellaneous/sendMail");
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// const initializePayment = async (req, res) => {
//   try {
//     const { studentId, amount } = req.body;

//     if (!studentId || !amount) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     console.log(`Processing  payment for Student: ${studentId}`);
//     const params = {
//       submit_type: "pay",
//       mode: "payment",
//       payment_method_types: ["card"],
//       billing_address_collection: "auto",
//       customer_email: `${studentId}@nec.edu.in`,
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: `Hostel Fees`,
//             },
//             unit_amount: amount * 100,
//           },
//           quantity: 1,
//         },
//       ],
//       metadata: {
//         studentId,
//         amount,
//       },
//       success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.FRONTEND_URL}/cancel?session_id={CHECKOUT_SESSION_ID}`,
//     };

//     const session = await stripe.checkout.sessions.create(params);
//     console.log("Session", session);
//     res.status(303).json(session);
//   } catch (error) {
//     console.error("Error creating payment session:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// const saveTransaction = async (req, res) => {
//   try {
//     const { sessionId } = req.query;
//     const session = await stripe.checkout.sessions.retrieve(sessionId);
//     const { studentId, amount } = session.metadata;
//     const Transaction_Id = session.payment_intent;
//     const status = session.payment_status;
//     const feestype = session.payment_method_types[0];
//     const email = "2212083@nec.edu.in"; //session.customer_email;

//     if (!Transaction_Id) {
//       console.log("No Transaction ID found. Payment failed or not initiated.");
//       await sendMail(
//         email,
//         "Payment Failed - College Fees Portal",
//         `Dear Student,\n\nYour payment attempt for ₹${amount} (${feestype}) has failed.\nPlease try again or contact support if the issue persists.\n\nBest Regards,\nCollege Finance Team`
//       );
//       return res.status(400).json({ error: "Payment not completed" });
//     }

//     const insertQuery = `
//       INSERT INTO transaction (Transaction_Id, student_id, feestype, amount)
//       VALUES (?, ?, ?, ?)
//     `;

//     db.query(
//       insertQuery,
//       [Transaction_Id, studentId, feestype, amount],
//       async (err) => {
//         if (err) {
//           console.error("Error saving transaction:", err);
//           await sendMail(
//             email,
//             "Payment Error - College Fees Portal",
//             `Dear Student,\n\nThere was an error recording your payment.\nTransaction ID: ${Transaction_Id}\nAmount: ₹${amount}\n\nPlease contact support for assistance.\n\nBest Regards,\nCollege Finance Team`
//           );
//           return res.status(500).json({ error: "Database error" });
//         }

//         if (status === "paid") {
//           await sendMail(
//             email,
//             "Payment Successful - College Fees Portal",
//             `Dear Student,\n\nYour payment of ₹${amount} for ${feestype} has been successfully recorded.\nTransaction ID: ${Transaction_Id}\n\nThank you!\n\nBest Regards,\nCollege Finance Team`
//           );
//           res.json({
//             success: true,
//             message: "Payment recorded successfully & Email Sent",
//           });
//         } else {
//           console.log("Hello ");
//           await sendMail(
//             email,
//             "Payment Pending - College Fees Portal",
//             `Dear Student,\n\nYour payment for ₹${amount} (${feestype}) is currently pending.\nTransaction ID: ${Transaction_Id}\n\nPlease check your bank for confirmation or contact support if needed.\n\nBest Regards,\nCollege Finance Team`
//           );
//           res.json({ success: true, message: "Payment pending, email sent" });
//         }
//       }
//     );
//   } catch (error) {
//     console.error("Error processing transaction:", error);
//     await sendMail(
//       "admin@college.com", // Send an email to admin
//       "Urgent: Payment Processing Error",
//       `An error occurred while processing a payment.\nError: ${error.message}`
//     );
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = saveTransaction;

// module.exports = { initializePayment, saveTransaction };

// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// const db = require("../../config/mysqlConfig");
// const sendMail = require("../../miscellaneous/sendMail");

// // Initialize Razorpay
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Setup routes
// // payment.post("/student/pay-fees", PaymentController.initializePayment);
// // payment.post("/student/save-transaction", PaymentController.saveTransaction);

// // Create Razorpay order
// const initializePayment = async (req, res) => {
//   try {
//     const { studentId, amount, selectedFees } = req.body;

//     if (!studentId || !amount) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const feesName = selectedFees
//       .map((fee) => fee.feeType)
//       .reduce((acc, type) => {
//         if (acc) acc = acc + "," + type;
//         else acc = type;
//         return acc;
//       }, "");

//     // Create order
//     const options = {
//       amount: amount * 100, // Razorpay amount is in paisa
//       currency: "INR",
//       receipt: `receipt_${studentId}_${Date.now()}`,
//       notes: {
//         studentId,
//         feesName,
//         selectedFees: JSON.stringify(selectedFees),
//       },
//     };

//     const order = await razorpay.orders.create(options);

//     res.status(200).json(order);
//   } catch (error) {
//     console.error("Error creating payment order:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// // Verify and save transaction
// const saveTransaction = async (req, res) => {
//   try {
//     const {
//       razorpay_payment_id,
//       razorpay_order_id,
//       razorpay_signature,
//       studentId,
//       amount,
//       selectedFees,
//     } = req.body;

//     // Verify signature
//     const text = razorpay_order_id + "|" + razorpay_payment_id;
//     const generated_signature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(text)
//       .digest("hex");

//     if (generated_signature !== razorpay_signature) {
//       await sendMail(
//         `${studentId}@nec.edu.in`,
//         "Payment Failed - College Fees Portal",
//         `Dear Student,\n\nYour payment attempt for ₹${amount} has failed due to signature verification issue.\nPlease try again or contact support if the issue persists.\n\nBest Regards,\nCollege Finance Team`
//       );
//       return res.status(400).json({ error: "Invalid signature" });
//     }

//     // Get payment details from Razorpay
//     const payment = await razorpay.payments.fetch(razorpay_payment_id);

//     // Get order details from Razorpay to access metadata
//     const order = await razorpay.orders.fetch(razorpay_order_id);

//     const feesName = order.notes.feesName;
//     const selectedFeesArray = JSON.parse(order.notes.selectedFees);
//     const Transaction_Id = razorpay_payment_id;
//     const status = payment.status;
//     const feestype = "razorpay";
//     const email = `${studentId}@nec.edu.in`;

//     // Save transaction to database
//     const insertQuery = `
//       INSERT INTO transaction (Transaction_Id, student_id, feestype, amount, feesName)
//       VALUES (?, ?, ?, ?, ?)
//     `;

//     db.query(
//       insertQuery,
//       [Transaction_Id, studentId, feestype, amount, feesName],
//       async (err) => {
//         if (err) {
//           console.error("Error saving transaction:", err);
//           await sendMail(
//             email,
//             "Payment Error - College Fees Portal",
//             `Dear Student,\n\nThere was an error recording your payment.\nTransaction ID: ${Transaction_Id}\nAmount: ₹${amount}\n\nPlease contact support for assistance.\n\nBest Regards,\nCollege Finance Team`
//           );
//           return res.status(500).json({ error: "Database error" });
//         }

//         if (status === "captured" || status === "authorized") {
//           const fees_Id = selectedFeesArray.map((fee) => fee.fees_id);

//           if (fees_Id.length > 0) {
//             const query = `UPDATE fees_allotment SET feeStatus='paid' WHERE Allotment_Id IN (?)`;

//             db.query(query, [fees_Id], (err, result) => {
//               if (err) {
//                 console.error("Error updating fees status:", err);
//               } else {
//                 console.log("Fees status updated successfully:", result);
//               }
//             });
//           }

//           await sendMail(
//             email,
//             "Payment Successful - College Fees Portal",
//             `Dear Student,\n\nYour payment of ₹${amount} has been successfully recorded.\nTransaction ID: ${Transaction_Id}\n\nThank you!\n\nBest Regards,\nCollege Finance Team`
//           );

//           res.json({
//             success: true,
//             message: "Payment recorded successfully & Email Sent",
//           });
//         } else {
//           await sendMail(
//             email,
//             "Payment Pending - College Fees Portal",
//             `Dear Student,\n\nYour payment for ₹${amount} is currently pending.\nTransaction ID: ${Transaction_Id}\n\nPlease check your bank for confirmation or contact support if needed.\n\nBest Regards,\nCollege Finance Team`
//           );

//           res.json({ success: true, message: "Payment pending, email sent" });
//         }
//       }
//     );
//   } catch (error) {
//     console.error("Error processing transaction:", error);
//     await sendMail(
//       "admin@college.com", // Send email to admin
//       "Urgent: Payment Processing Error",
//       `An error occurred while processing a payment.\nError: ${error.message}`
//     );
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = {
//   initializePayment,
//   saveTransaction,
// };
const Razorpay = require("razorpay");
const crypto = require("crypto");
const db = require("../../config/mysqlConfig");
const sendMail = require("../../miscellaneous/sendMail");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Initialize Razorpay Payment
const initializePayment = async (req, res) => {
  try {
    const { studentId, amount, selectedFees } = req.body;
    if (!studentId || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const feesName = selectedFees.map((fee) => fee.feeType).join(",");

    const options = {
      amount: amount * 100, // Convert amount to paise
      currency: "INR",
      receipt: `receipt_${studentId}_${Date.now()}`,
      payment_capture: 1,
      notes: {
        studentId,
        feesName,
        selectedFees: JSON.stringify(selectedFees),
      },
    };

    const order = await razorpay.orders.create(options);
    res.json({ order, amount: options.amount });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Save Transaction After Payment
const saveTransaction = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // ✅ Fetch Order from Razorpay to get studentId and fees
    const order = await razorpay.orders.fetch(razorpay_order_id);
    const studentId = order.notes.studentId;
    const feesName = order.notes.feesName;
    const selectedFeesArray = JSON.parse(order.notes.selectedFees);
    const amount = order.amount / 100; // Convert back from paise
    const email = `${studentId}@nec.edu.in`;

    // ✅ Verify Signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      await sendMail(
        email,
        "Payment Failed - College Fees Portal",
        `Dear Student,\n\nYour payment attempt for ₹${amount} failed due to signature verification issue.\nPlease try again.\n\nBest Regards,\nCollege Finance Team`
      );
      return res.status(400).json({ error: "Invalid signature" });
    }

    // ✅ Save Transaction to Database
    const insertQuery = `
      INSERT INTO transaction (Transaction_Id, student_id, feestype, amount, feesName)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      insertQuery,
      [razorpay_payment_id, studentId, "razorpay", amount, feesName],
      async (err) => {
        if (err) {
          console.error("Error saving transaction:", err);
          await sendMail(
            email,
            "Payment Error - College Fees Portal",
            `Dear Student,\n\nThere was an error recording your payment.\nTransaction ID: ${razorpay_payment_id}\nAmount: ₹${amount}\n\nPlease contact support.\n\nBest Regards,\nCollege Finance Team`
          );
          return res.status(500).json({ error: "Database error" });
        }

        // ✅ Update Fees Status
        const fees_Id = selectedFeesArray.map((fee) => fee.fees_id);
        if (fees_Id.length > 0) {
          const query = `UPDATE fees_allotment SET feeStatus='paid' WHERE Allotment_Id IN (?)`;
          db.query(query, [fees_Id], (err) => {
            if (err) console.error("Error updating fees status:", err);
          });
        }

        // ✅ Send Success Email
        await sendMail(
          email,
          "Payment Successful - College Fees Portal",
          `Dear Student,\n\nYour payment of ₹${amount} has been successfully recorded.\nTransaction ID: ${razorpay_payment_id}\n\nThank you!\n\nBest Regards,\nCollege Finance Team`
        );

        res.json({
          success: true,
          message: "Payment recorded successfully & Email Sent",
        });
      }
    );
  } catch (error) {
    console.error("Error processing transaction:", error);
    await sendMail(
      "admin@college.com",
      "Urgent: Payment Processing Error",
      `An error occurred while processing a payment.\nError: ${error.message}`
    );
    res.status(500).json({ error: error.message });
  }
};

// const { jsPDF } = require("jspdf");
// const autoTable = require("jspdf-autotable");
// const fs = require("fs");
// const path = require("path");

// const saveTransaction = async (req, res) => {
//   try {
//     const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

//     if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // ✅ Fetch Order from Razorpay to get studentId and fees
//     const order = await razorpay.orders.fetch(razorpay_order_id);
//     const studentId = order.notes.studentId;
//     const feesName = order.notes.feesName;
//     const selectedFeesArray = JSON.parse(order.notes.selectedFees);
//     const amount = order.amount / 100; // Convert back from paise
//     const email = `${studentId}@nec.edu.in`;

//     // ✅ Verify Signature
//     const text = `${razorpay_order_id}|${razorpay_payment_id}`;
//     const generated_signature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(text)
//       .digest("hex");

//     if (generated_signature !== razorpay_signature) {
//       await sendMail(
//         email,
//         "Payment Failed - College Fees Portal",
//         `Dear Student,\n\nYour payment attempt for ₹${amount} failed due to signature verification issue.\nPlease try again.\n\nBest Regards,\nCollege Finance Team`
//       );
//       return res.status(400).json({ error: "Invalid signature" });
//     }

//     // ✅ Save Transaction to Database
//     const insertQuery = `
//       INSERT INTO transaction (Transaction_Id, student_id, feestype, amount, feesName)
//       VALUES (?, ?, ?, ?, ?)
//     `;
//     db.query(
//       insertQuery,
//       [razorpay_payment_id, studentId, "razorpay", amount, feesName],
//       async (err) => {
//         if (err) {
//           console.error("Error saving transaction:", err);
//           await sendMail(
//             email,
//             "Payment Error - College Fees Portal",
//             `Dear Student,\n\nThere was an error recording your payment.\nTransaction ID: ${razorpay_payment_id}\nAmount: ₹${amount}\n\nPlease contact support.\n\nBest Regards,\nCollege Finance Team`
//           );
//           return res.status(500).json({ error: "Database error" });
//         }

//         // ✅ Update Fees Status
//         const fees_Id = selectedFeesArray.map((fee) => fee.fees_id);
//         if (fees_Id.length > 0) {
//           const query = `UPDATE fees_allotment SET feeStatus='paid' WHERE Allotment_Id IN (?)`;
//           db.query(query, [fees_Id], (err) => {
//             if (err) console.error("Error updating fees status:", err);
//           });
//         }

//         // ✅ Generate PDF for the Receipt
//         const pdfBuffer = generatePDF(studentId, feesName, amount, razorpay_payment_id);

//         // ✅ Send Success Email with PDF Attachment
//         await sendMail(
//           email,
//           "Payment Successful - College Fees Portal",
//           `Dear Student,\n\nYour payment of ₹${amount} has been successfully recorded.\nTransaction ID: ${razorpay_payment_id}\n\nThank you!\n\nBest Regards,\nCollege Finance Team`,
//           pdfBuffer
//         );

//         res.json({
//           success: true,
//           message: "Payment recorded successfully & Email Sent",
//         });
//       }
//     );
//   } catch (error) {
//     console.error("Error processing transaction:", error);
//     await sendMail(
//       "admin@college.com",
//       "Urgent: Payment Processing Error",
//       `An error occurred while processing a payment.\nError: ${error.message}`
//     );
//     res.status(500).json({ error: error.message });
//   }
// };

// // Function to generate PDF Buffer
// const generatePDF = (studentId, feesName, amount, transactionId) => {
//   const doc = new jsPDF();

//   // Add Header (College Info)
//   doc.setFillColor(13, 71, 161);
//   doc.rect(0, 0, 210, 30, 'F');
//   doc.setFontSize(16);
//   doc.setTextColor(255, 255, 255);
//   doc.setFont("helvetica", "bold");
//   doc.text("National Engineering College", 105, 15, { align: 'center' });
//   doc.setFontSize(10);
//   doc.text("An Autonomous Institution (Affiliated to Anna University)", 105, 22, { align: 'center' });
//   doc.text("K.R.Nagar, Kovilpatti - 628503", 105, 28, { align: 'center' });

//   // Receipt Title
//   doc.setFillColor(245, 245, 245);
//   doc.rect(20, 40, 170, 10, 'F');
//   doc.setFontSize(14);
//   doc.setTextColor(13, 71, 161);
//   doc.text("PAYMENT RECEIPT", 105, 46, { align: 'center' });

//   // Student Info
//   doc.setFontSize(10);
//   doc.setTextColor(0, 0, 0);
//   doc.text(`Receipt No: ${transactionId}`, 20, 60);
//   doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, 20, 65);
//   doc.text(`Time: ${new Date().toLocaleTimeString('en-IN')}`, 20, 70);
//   doc.text(`Student ID: ${studentId}`, 120, 60);

//   // Payment Details Table
//   autoTable(doc, {
//     startY: 80,
//     head: [['Description', 'Details']],
//     body: [
//       ['Fees Type', feesName],
//       ['Transaction ID', transactionId],
//       ['Amount', `₹${Number(amount).toLocaleString('en-IN')}`],
//       ['Status', 'Completed'],
//     ],
//     theme: 'grid',
//     headStyles: {
//       fillColor: [13, 71, 161],
//       textColor: 255,
//       fontStyle: 'bold',
//       halign: 'center',
//     },
//     bodyStyles: {
//       halign: 'left',
//     },
//     alternateRowStyles: {
//       fillColor: [245, 245, 245],
//     },
//     styles: {
//       cellPadding: 5,
//       fontSize: 10,
//       valign: 'middle',
//     },
//     columnStyles: {
//       0: { cellWidth: 60, fontStyle: 'bold' },
//       1: { cellWidth: 'auto' },
//     },
//   });

//   // Convert PDF to Buffer
//   const pdfBuffer = doc.output('arraybuffer');
//   return Buffer.from(pdfBuffer);
// };

// module.exports = saveTransaction;


module.exports = {
  initializePayment,
  saveTransaction,
};


// // Save Transaction
// // const saveTransaction = async (req, res) => {
// //   try {
// //     const { razorpay_payment_id, order_id } = req.query;

// //     if (!razorpay_payment_id || !order_id) {
// //       return res.status(400).json({ error: "Invalid payment details" });
// //     }

// //     const payment = await razorpay.payments.fetch(razorpay_payment_id);
// //     console.log(payment);
// //     const { email, amount, method, status } = payment;
// //     const Transaction_Id = razorpay_payment_id;

// //     if (status !== "captured") {
// //       console.log("Payment not completed.");
// //       await sendMail(
// //         email,
// //         "Payment Failed - College Fees Portal",
// //         `Dear Student,\n\nYour payment of ₹${
// //           amount / 100
// //         } (${method}) has failed.\nPlease try again or contact support.\n\nBest Regards,\nCollege Finance Team`
// //       );
// //       return res.status(400).json({ error: "Payment not completed" });
// //     }

// //     const insertQuery = `INSERT INTO transaction (Transaction_Id, student_id, feestype, amount) VALUES (?, ?, ?, ?)`;

// //     db.query(
// //       insertQuery,
// //       [Transaction_Id, studentId, method, amount / 100],
// //       async (err) => {
// //         if (err) {
// //           console.error("Error saving transaction:", err);
// //           await sendMail(
// //             email,
// //             "Payment Error - College Fees Portal",
// //             `Dear Student,\n\nThere was an error recording your payment.\nTransaction ID: ${Transaction_Id}\nAmount: ₹${
// //               amount / 100
// //             }\n\nPlease contact support.\n\nBest Regards,\nCollege Finance Team`
// //           );
// //           return res.status(500).json({ error: "Database error" });
// //         }

// //         await sendMail(
// //           email,
// //           "Payment Successful - College Fees Portal",
// //           `Dear Student,\n\nYour payment of ₹${
// //             amount / 100
// //           } has been successfully recorded.\nTransaction ID: ${Transaction_Id}\n\nThank you!\n\nBest Regards,\nCollege Finance Team`
// //         );

// //         res.json({
// //           success: true,
// //           message: "Payment recorded successfully & Email Sent",
// //         });
// //       }
// //     );
// //   } catch (error) {
// //     console.error("Error processing transaction:", error);
// //     res.status(500).json({ error: error.message });
// //   }
// // };
