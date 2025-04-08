import { useEffect, useState } from "react";
import axios from "axios";

export default function BankAccount() {
    const [bankAccounts, setBankAccounts] = useState([]);
    const [paymentMode, setPaymentMode] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const token = localStorage.getItem("token");

    // Fetch Bank Accounts
    const fetchBankAccounts = async () => {
        try {
            const response = await axios.get("/api/admin/account", {
                headers: { Authorization: `Bearer ${ token }` },
    });
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
        try {
            await axios.put(
                "/api/admin/account",
                { old_account: bankAccounts[editIndex].accountNumber, new_account: accountNumber },
                { headers: { Authorization: `Bearer ${ token }` } }
                );
fetchBankAccounts();
            } catch (err) {
    console.log("Error: " + err.message);
}
        } else {
    try {
        await axios.post(
            "/api/admin/account",
            { paymentMode, accountNumber },
            { headers: { Authorization:`Bearer ${ token }` } }
                );
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
    setPaymentMode(bankAccounts[index].paymentMode);
    setAccountNumber(bankAccounts[index].accountNumber);
    setEditIndex(index);
    setShowPopup(true);
};

// Handle Delete
const handleDelete = async (accountNumber) => {
    try {
        await axios.delete("/api/admin/account", {
            headers: { Authorization: `Bearer ${ token }` },
    data: { accountNumber },
});
fetchBankAccounts();
        } catch (err) {
    console.log("Error: " + err.message);
}
    };

return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-6">
        <div className="w-full max-w-4xl bg-white text-gray-800 p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-center text-blue-600 pb-4 border-b border-gray-300 mb-6">
                🏦 Bank Accounts
            </h2>

            {/* Table */}
            <div className="overflow-hidden rounded-lg shadow-md bg-white">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-blue-500 text-white uppercase">
                        <tr>
                            <th className="p-4 text-lg">#</th>
                            <th className="p-4 text-lg">Payment Mode</th>
                            <th className="p-4 text-lg">Account Number</th>
                            <th className="p-4 text-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bankAccounts.map((account, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-blue-100 transition">
                                <td className="p-4">{index + 1}</td>
                                <td className="p-4">{account.paymentMode}</td>
                                <td className="p-4">{account.accountNumber}</td>
                                <td className="p-4 flex space-x-3">
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                        onClick={() => handleEdit(index)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                        onClick={() => handleDelete(account.accountNumber)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Button */}
            <button
                className="mt-6 w-full px-6 py-3 text-lg font-semibold bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                onClick={() => {
                    setEditIndex(null);
                    setPaymentMode("");
                    setAccountNumber("");
                    setShowPopup(true);
                }}
            >
                Add New Bank Account
            </button>

            {/* Popup Modal */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-all scale-95 text-gray-800">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600">
                            {editIndex !== null ? "Edit Bank Account" : "Add New Bank Account"}
                        </h3>

                        {/* Dropdown (Only for New Account) */}
                        {editIndex === null && (
                            <select
                                className="w-full p-3 border border-gray-300 bg-gray-100 text-gray-800 rounded-lg mb-3"
                                value={paymentMode}
                                onChange={(e) => setPaymentMode(e.target.value)}
                            >
                                <option value="">Select Payment Mode</option>
                                <option value="Cash">💵 Cash</option>
                                <option value="Bank Transfer">🏦 Bank Transfer</option>
                                <option value="UPI">📲 UPI</option>
                            </select>
                        )}

                        {/* Account Number Input */}
                        <input
                            type="text"
                            placeholder="Enter Account Number"
                            className="w-full p-3 border border-gray-300 bg-gray-100 text-gray-800 rounded-lg mb-3"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                        />

                        <div className="flex justify-end space-x-3">
                            <button
                                className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                onClick={handleSaveBankAccount}
                            >
                                {editIndex !== null ? "Update" : "Add"}
                            </button>
                            <button
                                className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                                onClick={() => setShowPopup(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
);
}