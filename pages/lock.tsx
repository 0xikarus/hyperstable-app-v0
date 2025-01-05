import { useState } from 'react';
import Layout from '../components/layout';
import { NextPage } from 'next';

const Lock: NextPage = () => {
    const [amount, setAmount] = useState<string>('');
    const [duration, setDuration] = useState<number>(7); // Default 7 days
    const availablePeg = 204; // This should come from your contract/state management

    const handleCreateLock = async () => {
        console.log('Creating lock with:', { amount, duration });
    };

    return (
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6 h-[100vh] w-full">
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm">Amount to lock</span>
                    <span className="text-sm text-gray-500">Available {availablePeg} PEG</span>
                </div>

                <div className="mb-6">
                    <div className="flex items-center border rounded p-2">
                        <div className="flex items-center gap-2">
                            <span className="bg-gray-100 p-1 rounded">
                                <img src="/peg-icon.svg" alt="PEG" className="w-4 h-4" />
                            </span>
                            <span>PEG</span>
                        </div>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="flex-1 outline-none text-right"
                            placeholder="0.0"
                        />
                    </div>
                </div>

                {/* Lock Duration Text */}
                <div className="text-sm mb-4">
                    Locking for 7 months for 100 vePEG voting power.
                </div>

                {/* Duration Slider */}
                <div className="mb-6">
                    <input
                        type="range"
                        min="7"
                        max="365"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>7 days</span>
                        <span>6 months</span>
                        <span>1 year</span>
                    </div>
                </div>

                <button
                    onClick={handleCreateLock}
                    className="w-full bg-gray-100 text-gray-900 py-3 rounded font-medium hover:bg-gray-200"
                >
                    CREATE A LOCK
                </button>
            </div>

            {/* Right Panel - Instructions */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="font-medium mb-6">New Lock</h2>
                <ol className="list-decimal pl-5 space-y-2 mb-6">
                    <li>Select the amount of PEG you want to lock</li>
                    <li>Select the number of weeks. The minimum time is one week, and the maximum lock time is 1 year</li>
                    <li>Confirm the locking!</li>
                    <li>Your lock will be available in the dashboard.</li>
                </ol>
                <div className="bg-gray-50 p-4 rounded-lg flex gap-3">
                    <div className="flex-shrink-0">ℹ️</div>
                    <p className="text-sm">
                        Locking will give you an NFT, referred to as veNFT. You can increase the Lock amount or extend the Lock time at any point after.
                    </p>
                </div>
            </div>

            {/* Bottom Section - What are Locks */}
            <div className="md:col-span-2 bg-white rounded-lg p-6 shadow-sm">
                <h2 className="font-medium mb-4">WHAT ARE LOCKS?</h2>
                <p className="mb-4">
                    Vote Escrow is a mechanism used in decentralised governance to ensure fairness and transparency in decision-making.
                    Any PEG holder can vote escrow their tokens and receive vePEG in exchange.
                </p>
                <p className="mb-6">
                    With Hyperstable, we call this locking.
                </p>
                <button className="w-full bg-gray-100 text-gray-900 py-3 rounded font-medium hover:bg-gray-200">
                    LEARN MORE ABOUT LOCKS
                </button>
            </div>
        </div>
    );
};

export default Lock;
