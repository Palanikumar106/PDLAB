import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SuccessPage = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");

    useEffect(() => {
        // };
        
    //     saveTransaction();
    //     const saveTransaction = async () => {
    //         if (!sessionId) return;
    
    //     //     try {
    //     //         const response = await fetch(
    //     //             `http://localhost:8080/api/student/save-transaction?sessionId=${sessionId}`,
    //     //             {
    //     //                 method: "GET", // Use GET with query parameters
    //     //                 headers: { "Content-Type": "application/json" },
    //     //             }
    //     //         );
    
    //     //         const data = await response.json();
    //     //         console.log("Transaction Saved:", data);
    //     //     } catch (error) {
    //     //         console.error("Error saving transaction:", error);
    //     //     }
    // }, [sessionId]);
});

    return (
        <div>
            <h2>Payment Successful!</h2>
            <p>Your transaction has been recorded.</p>
        </div>
    );
}
export default SuccessPage
