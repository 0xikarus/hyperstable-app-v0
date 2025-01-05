import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Layout from '../components/layout';

interface Pool {
    name: string;
    volume: string;
    tvl: string;
    votes: {
        amount: number;
        percentage: number;
    };
    incentives: string | null;
    vAPR: number;
}

export default function Vote() {
    const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
    const [selectedPool, setSelectedPool] = useState<Pool | null>(null);
    const [voteAmount, setVoteAmount] = useState<number>(0);
    const [hasVePegLock, setHasVePegLock] = useState(false); // Replace with actual check

    // Mock data - replace with actual data from your API/contract
    const votingInfo = {
        currentRound: {
            endsIn: '7 days',
            totalVotingPower: '703,596,511',
            totalFees: '-$7,155,642',
            totalIncentives: '-$32,064',
            totalRewards: '-$7,187,707',
            newEmissions: '8,069,149'
        }
    };

    const pools: Pool[] = [
        {
            name: 'USDH-USDC',
            volume: '$1,234,567.89',
            tvl: '$42,069,420',
            votes: {
                amount: 115524852,
                percentage: 16.42
            },
            incentives: '$38.66',
            vAPR: 41.51
        },
        {
            name: 'USDH-FRAX',
            volume: '$1,234,567.89',
            tvl: '$42,069,420',
            votes: {
                amount: 33767625,
                percentage: 4.79
            },
            incentives: null,
            vAPR: 67.89
        },
        {
            name: 'USDH-DAI',
            volume: '$1,234,567.89',
            tvl: '$42,069,420',
            votes: {
                amount: 33767625,
                percentage: 4.79
            },
            incentives: null,
            vAPR: 42.3
        }
    ];

    const handleVoteClick = (pool: Pool) => {
        //if (!hasVePegLock) return;
        setSelectedPool(pool);
        setIsVoteModalOpen(true);
    };

    const handleVoteSubmit = () => {
        // Implement vote submission logic
        console.log('Submitting vote:', { pool: selectedPool?.name, amount: voteAmount });
        setIsVoteModalOpen(false);
    };

    return (
        <div className="max-w-6xl w-full h-[100vh] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Current Voting Round Info */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-lg font-medium">
                        Current voting round ends in {votingInfo.currentRound.endsIn}
                    </span>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                    Voters earn incentives for helping govern how emissions are distributed.
                </p>
                <div className="grid grid-cols-5 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Total voting power</p>
                        <p className="text-lg font-semibold">{votingInfo.currentRound.totalVotingPower}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Total fees</p>
                        <p className="text-lg font-semibold">{votingInfo.currentRound.totalFees}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Total incentives</p>
                        <p className="text-lg font-semibold">{votingInfo.currentRound.totalIncentives}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Total Rewards</p>
                        <p className="text-lg font-semibold">{votingInfo.currentRound.totalRewards}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">New Emissions</p>
                        <p className="text-lg font-semibold">{votingInfo.currentRound.newEmissions}</p>
                    </div>
                </div>
            </div>

            {/* Pools Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <h2 className="text-xl font-semibold p-6">Select Liquidity Pools for Voting</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Pools
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Volume
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Votes
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Incentives
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    vAPR
                                </th>
                                <th className="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {pools.map((pool) => (
                                <tr key={pool.name}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{pool.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{pool.volume}</div>
                                        <div className="text-sm text-gray-500">TVL {pool.tvl}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">Votes {pool.votes.amount.toLocaleString()}</div>
                                        <div className="text-sm text-gray-500">{pool.votes.percentage}%</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {pool.incentives ? (
                                            <div className="text-sm text-gray-900">{pool.incentives}</div>
                                        ) : (
                                            <button className="text-sm text-blue-600 hover:text-blue-800">
                                                Add incentive
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {pool.vAPR}%
                                            <svg className="w-4 h-4 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="relative inline-block">
                                            <button
                                                onClick={() => handleVoteClick(pool)}
                                                className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200"
                                                title={!hasVePegLock ? "You need an active vePEG lock to vote" : undefined}
                                            >
                                                VOTE
                                            </button>
                                            {!hasVePegLock && (
                                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                                    Create a vePEG lock to vote
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Vote Modal */}
            <Transition appear show={isVoteModalOpen} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => setIsVoteModalOpen(false)}>
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-30" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                                <div className="flex justify-between items-center mb-4">
                                    <Dialog.Title className="text-lg font-medium">
                                        Vote for {selectedPool?.name}
                                    </Dialog.Title>
                                    <button
                                        onClick={() => setIsVoteModalOpen(false)}
                                        className="text-gray-400 hover:text-gray-500"
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {/* vePEG Lock Selector */}
                                    <div>
                                        <select className="w-full p-2 border border-gray-300 rounded-md">
                                            <option value="">Select vePEG Lock</option>
                                        </select>
                                    </div>

                                    {/* Vote Amount Slider */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-2xl font-medium">{voteAmount}</span>
                                            <span className="text-gray-500">vePEG</span>
                                        </div>
                                        <div className="text-sm text-gray-600">{voteAmount} vePEG</div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="1000"
                                            value={voteAmount}
                                            onChange={(e) => setVoteAmount(Number(e.target.value))}
                                            className="w-full"
                                        />
                                        <div className="flex justify-between text-sm text-gray-500">
                                            <span>0.0</span>
                                            <span>1000.0 MAX</span>
                                        </div>
                                    </div>

                                    {/* Vote Button */}
                                    <button
                                        onClick={handleVoteSubmit}
                                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        Vote
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
