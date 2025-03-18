import { useEffect, useState } from "react";
import axios from "axios";
import './bankAccount.css'
export default function BankAccount() {
    const [bankAccounts, setBankAccounts] = useState([]);
    const [paymentMode, setPaymentMode] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    // Fetch Bank Accounts
    const fetchBankAccounts = async () => {
        try {
            const response = await axios.get("api/admin/account");
            setBankAccounts(response.data);
        } catch (err) {
            console.log("Error Occurred", err);
        }
    };

    useEffect(() => {
        fetchBankAccounts();
    }, []);

    // Save or Update Bank Account
    const handleSaveBankAccount = async () => {
        if (accountNumber.trim() === "" || (editIndex === null && paymentMode.trim() === "")) return;

        if (editIndex !== null) {
            // Update existing account
            try {
                await axios.put("api/admin/account", {
                    old_account: bankAccounts[editIndex].accountNumber,
                    new_account:accountNumber
                });
                fetchBankAccounts();
            } catch (err) {
                console.log("Error: " + err.message);
            }
        } else {
            // Add new account
            try {
                await axios.post("api/admin/account", { paymentMode, accountNumber });
                fetchBankAccounts();
            } catch (err) {
                console.log("Error: " + err.message);
            }
        }

        setPaymentMode("");
        setAccountNumber("");
        setEditIndex(null);
        setShowPopup(false);
    };

    // Handle Edit
    const handleEdit = (index) => {
        setPaymentMode(bankAccounts[index].paymentMode); // Keep existing value
        setAccountNumber(bankAccounts[index].accountNumber);
        setEditIndex(index);
        setShowPopup(true);
    };

    // Handle Delete
    const handleDelete = async (accountNumber) => {
        try {
            await axios.delete("api/admin/account", { data: {accountNumber:accountNumber } });
            fetchBankAccounts();
        } catch (err) {
            console.log("Error: " + err.message);
        }
    };

    return (
        <div className="bank-container">
            <h2 className="bank-title">Bank Accounts</h2>

            <table className="bank-table">
                <thead>
                    <tr>
                        <th className="bank-table-header">#</th>
                        <th className="bank-table-header">Payment Mode</th>
                        <th className="bank-table-header">Account Number</th>
                        <th className="bank-table-header">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bankAccounts.map((account, index) => (
                        <tr key={index}>
                            <td className="bank-table-data">{index + 1}</td>
                            <td className="bank-table-data">{account.paymentMode}</td>
                            <td className="bank-table-data">{account.accountNumber}</td>
                            <td className="bank-table-data">
                                <button className="bank-button bank-edit-button" onClick={() => handleEdit(index)}>
                                    Edit
                                </button>
                                <button className="bank-button bank-delete-button" onClick={() => handleDelete(account.accountNumber)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add New Bank Account Button */}
            <button
                className="bank-button bank-add-button"
                onClick={() => {
                    setEditIndex(null);
                    setPaymentMode("");
                    setAccountNumber("");
                    setShowPopup(true);
                }}
            >
                + Add New Bank Account
            </button>

            {/* Popup Modal */}
            {showPopup && (
                <div className="bank-modal">
                    <div className="bank-modal-content">
                        <h3>{editIndex !== null ? "Edit Bank Account" : "Add New Bank Account"}</h3>

                        {/* Show dropdown only when adding a new account */}
                        {editIndex === null && (
                            <select
                                className="bank-modal-select"
                                value={paymentMode}
                                onChange={(e) => setPaymentMode(e.target.value)}
                            >
                                <option value="">Select Payment Mode</option>
                                <option value="Cash">Cash</option>
                                <option value="Bank Transfer">Bank Transfer</option>
                                <option value="UPI">UPI</option>
                            </select>
                        )}

                        {/* Account Number Input */}
                        <input
                            type="text"
                            placeholder="Enter Account Number"
                            className="bank-modal-input"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                        />

                        <div className="bank-modal-buttons">
                            <button className="bank-button bank-save-button" onClick={handleSaveBankAccount}>
                                {editIndex !== null ? "Update" : "Add"}
                            </button>
                            <button className="bank-button bank-cancel-button" onClick={() => setShowPopup(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
