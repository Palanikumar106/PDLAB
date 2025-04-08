import React from 'react';
import dolar from '../../../../../assets/dolar.png';
import smile from '../../../../../assets/smile.jpg';
import user from '../../../../../assets/user.png';
import MasterCard from '../Card/MasterCard';
import { Link } from 'react-router-dom';

const MasterHome = () => {
    const imgArr = [dolar, smile, user, smile];
    const optArr = ["Year", "Header", "Ledger", "BankAccount"];
    const path = ["year", "headType", "ledgerType", "bankAccount"];
    const colors = [
        "from-blue-400 to-blue-600",
        "from-green-400 to-green-600",
        "from-purple-400 to-purple-600",
        "from-yellow-400 to-yellow-600"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 flex items-center justify-center py-10">
            {/* Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-5xl">
                {imgArr.map((img, index) => (
                    <Link
                        key={index}
                        to={`/admin/${path[index]}`}  // Fixed template literal
                className={`block bg-gradient-to-r ${colors[index]} text-white rounded-lg shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-105 p-6 `}  // Fixed className
                    >
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 mb-4 rounded-full overflow-hidden border-4 border-white shadow-md">
                        <img
                            src={img}
                            alt={`Icon for ${optArr[index]}`}  // Fixed alt attribute
                        className="w-full h-full object-cover"
                                />
                    </div>
                    <h2 className="text-xl font-bold tracking-wider uppercase">
                        {optArr[index]}
                    </h2>
                </div>
            </Link>
                ))}
        </div>
        </div >
    );
};

export default MasterHome;