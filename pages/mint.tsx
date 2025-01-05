import { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

interface Position {
  id: number;
  type: string;
  valueUSD: number;
  USDH: number;
  CR: number;
  LTV: number;
}

type TabType = 'deposit' | 'withdraw' | 'mint' | 'burn';

export default function Mint() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [selectedCollateral, setSelectedCollateral] = useState('stETH');
  const [activeCollateralTab, setActiveCollateralTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [activeUSDHTab, setActiveUSDHTab] = useState<'mint' | 'burn'>('mint');
  const [collateralAmount, setCollateralAmount] = useState('734.2');
  const [usdhAmount, setUSDHAmount] = useState('100');

  const handleCreatePosition = () => {
    const newPosition: Position = {
      id: positions.length + 1,
      type: 'stHYPE',
      valueUSD: 180,
      USDH: 100,
      CR: 180,
      LTV: 55,
    };
    setPositions([...positions, newPosition]);
    setIsCreateModalOpen(false);
  };

  const handleManageClick = (position: Position) => {
    setSelectedPosition(position);
    setIsManageModalOpen(true);
  };

  const TabButton = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className={`flex-1 py-2 text-center ${active ? 'bg-indigo-900 text-white' : 'bg-gray-100'}`}
    >
      {children}
    </button>
  );

  return (
    <div className="h-[100vh] w-full max-w-6xl mx-auto pt-8 space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl">MANAGE POSITIONS</h1>
        </div>

        {positions.length === 0 ? (
          <div className="p-6 text-center">
            <h2 className="text-lg mb-2">YOU DO NOT HAVE A POSITION YET</h2>
            <p className="text-gray-600 mb-6">
              Positions are collateral-specific NFTs that are necessary to<br />
              mint USDH. After getting a Position, you can begin depositing<br />
              collateral onto it and start minting USDH.
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded text-gray-800"
            >
              CREATE A POSITION
            </button>
          </div>
        ) : (
          <div className="p-4">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-4 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
              >
                CREATE
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm">
                  <th className="p-2">ID</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Value / USD</th>
                  <th className="p-2">USDH</th>
                  <th className="p-2">CR / %</th>
                  <th className="p-2">LTV / %</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {positions.map((position) => (
                  <tr key={position.id} className="border-t border-gray-100">
                    <td className="p-2">{position.id}</td>
                    <td className="p-2 text-blue-600">{position.type}</td>
                    <td className="p-2">{position.valueUSD}</td>
                    <td className="p-2">{position.USDH}</td>
                    <td className="p-2">{position.CR}</td>
                    <td className="p-2">{position.LTV}</td>
                    <td className="p-2">
                      <button 
                        onClick={() => handleManageClick(position)}
                        className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
                      >
                        MANAGE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4">
          <h2 className="text-xl mb-4">WHAT ARE POSITIONS?</h2>
          <p className="text-gray-600 mb-2">
            Positions are necessary to borrow USDH. Anyone can mint a Position NFT for any supported collateral type.<br />
            After getting a collateral specific Position, you can begin depositing this collateral onto it.<br />
            Supported collateral types currently are stHYPE, wstETH, and tBTC.
          </p>
          <p className="text-gray-600 mb-4">
            Metadata attached to the Position can monitor a user's deposits and their borrowed USDH amounts.
          </p>
          <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded text-gray-800">
            LEARN MORE ABOUT POSITIONS
          </button>
        </div>
      </div>

      <Dialog
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <DialogPanel className="w-full max-w-md transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all">
            <div className="flex justify-between items-center mb-4">
              <DialogTitle className="text-lg">Create Position</DialogTitle>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-2">
                Select collateral type
              </label>
              <select
                value={selectedCollateral}
                onChange={(e) => setSelectedCollateral(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="stETH">stETH</option>
              </select>
            </div>

            <button
              onClick={handleCreatePosition}
              className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded"
            >
              Create
            </button>
          </DialogPanel>
        </div>
      </Dialog>

      <Dialog
        open={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white shadow-2xl transition-all">
            <div className="flex justify-between items-center p-4">
              <DialogTitle className="text-xl font-medium">Manage #{selectedPosition?.id}</DialogTitle>
              <button
                onClick={() => setIsManageModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8 p-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Collateral</h3>
                <div className="flex rounded-md overflow-hidden mb-6">
                  <TabButton
                    active={activeCollateralTab === 'deposit'}
                    onClick={() => setActiveCollateralTab('deposit')}
                  >
                    Deposit
                  </TabButton>
                  <TabButton
                    active={activeCollateralTab === 'withdraw'}
                    onClick={() => setActiveCollateralTab('withdraw')}
                  >
                    Withdraw
                  </TabButton>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                  <div className="text-center mb-6">
                    <h4 className="text-sm text-gray-600 mb-3">You deposit</h4>
                    <div className="flex items-center justify-between bg-white rounded-lg p-3 mb-2 shadow-sm">
                      <input
                        type="text"
                        value={collateralAmount}
                        onChange={(e) => setCollateralAmount(e.target.value)}
                        className="w-full text-3xl text-left outline-none"
                      />
                      <span className="text-gray-500 ml-2">stHYPE</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      734.2 stHYPE / 1000.0 MAX
                    </div>
                  </div>
                  <div className="mb-6">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value="734.2"
                      className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Collateral deposited</span>
                      <div>15.2 ⟹ 749.4</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Collateral Value</span>
                      <div>15.2 ⟹ 749.4</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Collateral Ratio</span>
                      <div>15.2 ⟹ 749.4</div>
                    </div>
                  </div>
                </div>
                <button className="w-full py-3 mt-4 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium">
                  Deposit
                </button>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">USDH</h3>
                <div className="flex rounded-md overflow-hidden mb-6">
                  <TabButton
                    active={activeUSDHTab === 'mint'}
                    onClick={() => setActiveUSDHTab('mint')}
                  >
                    Mint
                  </TabButton>
                  <TabButton
                    active={activeUSDHTab === 'burn'}
                    onClick={() => setActiveUSDHTab('burn')}
                  >
                    Burn
                  </TabButton>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                  <div className="text-center mb-6">
                    <h4 className="text-sm text-gray-600 mb-3">You mint</h4>
                    <div className="flex items-center justify-between bg-white rounded-lg p-3 mb-2 shadow-sm">
                      <input
                        type="text"
                        value={usdhAmount}
                        onChange={(e) => setUSDHAmount(e.target.value)}
                        className="w-full text-3xl text-left outline-none"
                      />
                      <span className="text-gray-500 ml-2">USDH</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Loan to Value (LTV) 53% / 67.6% MAX
                    </div>
                  </div>
                  <div className="mb-6">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value="53"
                      className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">USDH Minted</span>
                      <div>1003 ⟹ 1103</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Collateral Ratio</span>
                      <div>215 ⟹ 167</div>
                    </div>
                  </div>
                </div>
                <button className="w-full py-3 mt-4 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium">
                  Mint
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
