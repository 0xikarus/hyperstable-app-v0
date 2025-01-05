import { useState } from 'react';
import Layout from '../components/layout';
import { Dialog, Tab } from '@headlessui/react';

interface Pool {
    id: string;
    name: string;
    tvl: number;
    volume: number;
    apr: number;
    poolBalance: {
        token1: number;
        token2: number;
        token1Symbol: string;
        token2Symbol: string;
    };
    userBalance: number;
}

export default function Liquidity() {
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const [selectedPool, setSelectedPool] = useState<Pool | null>(null);
    const [balancedProportion, setBalancedProportion] = useState(false);
    const [slippage, setSlippage] = useState('0.03');
    const [token1Amount, setToken1Amount] = useState('');
    const [token2Amount, setToken2Amount] = useState('');
    const [lpTokenAmount, setLpTokenAmount] = useState('');
    const [activeTab, setActiveTab] = useState('deposit'); // 'deposit', 'stake', 'deposit_and_stake'
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [claimableAmount, setClaimableAmount] = useState('0'); // Mock claimable amount

    // Mock data - replace with actual data from your API/contract
    const pools: Pool[] = [
        {
            id: '1',
            name: 'USDH-USDC',
            tvl: 100000,
            volume: 10000,
            apr: 3.95,
            poolBalance: {
                token1: 10000,
                token2: 10000,
                token1Symbol: 'USDC',
                token2Symbol: 'USDH',
            },
            userBalance: 0,
        },
        {
            id: '2',
            name: 'USDH-FRAX',
            tvl: 100000,
            volume: 10000,
            apr: 3.95,
            poolBalance: {
                token1: 10000,
                token2: 10000,
                token1Symbol: 'FRAX',
                token2Symbol: 'USDH',
            },
            userBalance: 0,
        },
    ];

    const metrics = {
        totalLiquidity: '1,000,000',
        pegEmissions: '100,000',
        hsRevenue: '50,000',
    };

    const handleDeposit = (pool: Pool) => {
        setSelectedPool(pool);
        setIsDepositModalOpen(true);
        setActiveTab('deposit');
    };

    const handleStake = (pool: Pool) => {
        setSelectedPool(pool);
        setIsDepositModalOpen(true);
        setActiveTab('stake');
    };

    const handleApproveAndDeposit = () => {
        // Implement approve and deposit logic
        console.log('Approving and depositing...');
    };

    const handleApproveAndStake = () => {
        // Implement approve and stake logic
        console.log('Approving and staking...');
    };

    const handleMaxLpTokens = () => {
        // Set max LP tokens available
        setLpTokenAmount(selectedPool?.userBalance.toString() || '0');
    };

    const handleWithdraw = () => {
        // Implement withdraw logic
        console.log('Withdrawing...');
    };

    const handleClaim = () => {
        // Implement claim logic
        console.log('Claiming rewards...');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[100vh]">
            <h1 className="text-3xl font-bold mb-8">Deposit Liquidity and Stake LP tokens to earn PEG</h1>

            {/* How it works section */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">How it works</h2>
                <p className="text-gray-600 mb-6">
                    Liquidity providers obtain PEG emissions, while vePEG lockers earn protocol revenue
                    generated via interest, liquidation fees, and voting incentives.
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Total Liquidity</p>
                        <p className="text-2xl font-bold">${metrics.totalLiquidity}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">PEG Emissions</p>
                        <p className="text-2xl font-bold">${metrics.pegEmissions}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">HS Revenue</p>
                        <p className="text-2xl font-bold">${metrics.hsRevenue}</p>
                    </div>
                </div>
            </div>

            {/* Liquidity Pools Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <h2 className="text-xl font-semibold p-6">Liquidity Pools</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Liquidity pool
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    TVL
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Volume
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    APR
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Pool Balance
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Your Pool Balance
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {pools.map((pool) => (
                                <tr key={pool.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{pool.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">${pool.tvl.toLocaleString()}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">${pool.volume.toLocaleString()}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{pool.apr}%</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {pool.poolBalance.token1.toLocaleString()} {pool.poolBalance.token1Symbol} /{' '}
                                            {pool.poolBalance.token2.toLocaleString()} {pool.poolBalance.token2Symbol}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{pool.userBalance}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleDeposit(pool)}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            Deposit
                                        </button>
                                        <button
                                            onClick={() => handleStake(pool)}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            Stake
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Updated Deposit Modal */}
            <Dialog
                open={isDepositModalOpen}
                onClose={() => setIsDepositModalOpen(false)}
                className="fixed z-10 inset-0 overflow-y-auto"
            >
                <div className="flex items-center justify-center min-h-screen">
                    <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />

                    <div className="relative bg-white rounded-lg max-w-md w-full mx-4 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <Dialog.Title className="text-lg font-medium">
                                Manage Liquidity
                            </Dialog.Title>
                            <button
                                onClick={() => setIsDepositModalOpen(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Close</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <Tab.Group>
                            <Tab.List className="flex mb-4 border-b">
                                <Tab className={({ selected }) =>
                                    `w-1/2 py-2.5 text-sm font-medium leading-5 text-gray-700
                    ${selected ? 'border-b-2 border-blue-600' : ''}`
                                }>
                                    Deposit
                                </Tab>
                                <Tab className={({ selected }) =>
                                    `w-1/2 py-2.5 text-sm font-medium leading-5 text-gray-700
                    ${selected ? 'border-b-2 border-blue-600' : ''}`
                                }>
                                    Withdraw/Claim
                                </Tab>
                            </Tab.List>

                            <Tab.Panels>
                                <Tab.Panel>
                                    <div className="space-y-4">
                                        {/* Action Tabs */}
                                        <div className="flex space-x-4 mb-2">
                                            <button
                                                onClick={() => setActiveTab('deposit')}
                                                className={`px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border-b-2 
                            ${activeTab === 'deposit' ? 'border-blue-600' : 'border-transparent hover:border-gray-300'}`}
                                            >
                                                Deposit
                                            </button>
                                            <button
                                                onClick={() => setActiveTab('stake')}
                                                className={`px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border-b-2 
                            ${activeTab === 'stake' ? 'border-blue-600' : 'border-transparent hover:border-gray-300'}`}
                                            >
                                                Stake
                                            </button>
                                            <button
                                                onClick={() => setActiveTab('deposit_and_stake')}
                                                className={`px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border-b-2 
                            ${activeTab === 'deposit_and_stake' ? 'border-blue-600' : 'border-transparent hover:border-gray-300'}`}
                                            >
                                                Deposit & Stake
                                            </button>
                                        </div>

                                        {activeTab === 'deposit' && (
                                            <>
                                                {/* Existing Deposit Form */}
                                                <div className="space-y-3">
                                                    <div className="relative">
                                                        <input
                                                            type="number"
                                                            value={token1Amount}
                                                            onChange={(e) => setToken1Amount(e.target.value)}
                                                            className="w-full p-3 border border-gray-300 rounded-lg"
                                                            placeholder={`${selectedPool?.poolBalance.token1Symbol || ''} Avail. 0`}
                                                        />
                                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                            <div className="w-6 h-6 bg-gray-200 rounded-md"></div>
                                                        </div>
                                                    </div>

                                                    <div className="relative">
                                                        <input
                                                            type="number"
                                                            value={token2Amount}
                                                            onChange={(e) => setToken2Amount(e.target.value)}
                                                            className="w-full p-3 border border-gray-300 rounded-lg"
                                                            placeholder={`${selectedPool?.poolBalance.token2Symbol || ''} Avail. 0`}
                                                        />
                                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                            <div className="w-6 h-6 bg-gray-200 rounded-md"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Balanced Proportion Toggle */}
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={balancedProportion}
                                                        onChange={(e) => setBalancedProportion(e.target.checked)}
                                                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                                                    />
                                                    <label className="ml-2 text-sm text-gray-700">
                                                        Add all coins in a balanced proportion
                                                    </label>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="space-y-2 pt-4">
                                                    <button
                                                        onClick={handleApproveAndDeposit}
                                                        className="w-full py-2 px-4 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
                                                    >
                                                        1. Approve Spending
                                                    </button>
                                                    <button
                                                        className="w-full py-2 px-4 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
                                                    >
                                                        2. Deposit
                                                    </button>
                                                </div>
                                            </>
                                        )}

                                        {activeTab === 'stake' && (
                                            <>
                                                {/* LP Token Input with MAX button */}
                                                <div className="relative">
                                                    <input
                                                        type="number"
                                                        value={lpTokenAmount}
                                                        onChange={(e) => setLpTokenAmount(e.target.value)}
                                                        className="w-full p-3 pr-20 border border-gray-300 rounded-lg"
                                                        placeholder="LP Tokens Avail. 0"
                                                    />
                                                    <button
                                                        onClick={handleMaxLpTokens}
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                    >
                                                        MAX
                                                    </button>
                                                </div>

                                                {/* Estimated TX cost */}
                                                <div className="flex justify-between items-center text-sm text-gray-600">
                                                    <span>Estimated TX cost:</span>
                                                    <span>-</span>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="space-y-2 pt-4">
                                                    <button
                                                        onClick={handleApproveAndStake}
                                                        className="w-full py-2 px-4 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
                                                    >
                                                        1. Approve Spending
                                                    </button>
                                                    <button
                                                        className="w-full py-2 px-4 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
                                                    >
                                                        2. Stake
                                                    </button>
                                                </div>
                                            </>
                                        )}

                                        {activeTab === 'deposit_and_stake' && (
                                            // Similar to deposit form but with both deposit and stake steps
                                            <div>
                                                {/* Implementation for deposit and stake */}
                                            </div>
                                        )}
                                    </div>
                                </Tab.Panel>

                                <Tab.Panel>
                                    <div className="space-y-4">
                                        {/* Withdraw Input */}
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={withdrawAmount}
                                                onChange={(e) => setWithdrawAmount(e.target.value)}
                                                className="w-full p-3 pr-20 border border-gray-300 rounded-lg"
                                                placeholder="LP Tokens Avail. 0"
                                            />
                                            <button
                                                onClick={handleMaxLpTokens}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                MAX
                                            </button>
                                        </div>

                                        {/* Estimated TX cost */}
                                        <div className="flex justify-between items-center text-sm text-gray-600">
                                            <span>Estimated TX cost:</span>
                                            <span>-</span>
                                        </div>

                                        {/* Withdraw Button */}
                                        <button
                                            onClick={handleWithdraw}
                                            className="w-full py-2 px-4 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
                                        >
                                            Withdraw
                                        </button>

                                        {/* Divider */}
                                        <div className="relative py-4">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-300"></div>
                                            </div>
                                            <div className="relative flex justify-center">
                                                <span className="px-2 bg-white text-sm text-gray-500">or</span>
                                            </div>
                                        </div>

                                        {/* Claim Section */}
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="text-sm font-medium text-gray-700">Claimable Rewards</span>
                                                <span className="text-sm font-medium text-gray-900">{claimableAmount} PEG</span>
                                            </div>
                                            <button
                                                onClick={handleClaim}
                                                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                                disabled={Number(claimableAmount) <= 0}
                                            >
                                                Claim Rewards
                                            </button>
                                        </div>
                                    </div>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
