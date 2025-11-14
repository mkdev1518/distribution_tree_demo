import { useState } from "react";
import "./App.css";

interface Result {
  level: number,
  percent: number,
  members: number,
  totalShare: string,
  perMember: string,
  remaining: string
}

const levelInfo = [
  { level: 1, percent: 30, members: 2 },
  { level: 2, percent: 25, members: 6 },
  { level: 3, percent: 20, members: 12 },
  { level: 4, percent: 15, members: 24 },
  { level: 5, percent: 10, members: 24 },
  // { level: 6, percent: 5, members: 24 },
  // { level: 7, percent: 3, members: 24 },
  // { level: 8, percent: 2, members: 24 },
  // { level: 9, percent: 1, members: 24 },
];
const levels = [
  { level: 9, percent: 1 },
  { level: 8, percent: 2 },
  { level: 7, percent: 3 },
  { level: 6, percent: 5 },
  { level: 5, percent: 10 },
  { level: 4, percent: 15 },
  { level: 3, percent: 20 },
  { level: 2, percent: 25 },
  { level: 1, percent: 30 },
];

export default function App() {
  const [amount, setAmount] = useState<string | any>("");
  const [activeAmount, setActiveAmount] = useState();
  const [distribution, setDistribution] = useState<Result[]>([]);

  const calculateDistribution = () => {
    if (!amount || amount <= 0) {
      alert('Enter Valid Amount')
      return;
    };

    let remaining = parseFloat(amount);
    let results: Result[] = [];

    levelInfo.forEach((lvl) => {
      const totalShare = (amount * lvl.percent) / 100;
      const perMember = totalShare / lvl.members;
      results.push({
        ...lvl,
        totalShare: totalShare.toFixed(2),
        perMember: perMember.toFixed(2),
        remaining: (remaining - totalShare).toFixed(2),
      });
      remaining -= totalShare;
    });

    setDistribution(results);
    setActiveAmount(amount)
  };

  return (
    <div className="p-8 flex-col items-center justify-center w-full text-center bg-neutral-50 ">
      <h2 className="text-xl font-extrabold">Level Money Distribution Flow</h2>

      <div className="flex items-center justify-center">
        <div className="bg-green-700 p-5 rounded-lg shadow-2xl my-5 flex items-center justify-center lg:w-1/3  w-full">
          <div className="w-2/3 flex flex-col items-center justify-center gap-3">
            {levels?.map((lvl) => (
              <div className="flex items-center justify-center gap-5 w-full">
                <h4 className="font-extrabold text-white w-1/2 flex items-start justify-start ">Level - {lvl?.level}</h4>
                <span className="font-extrabold text-white">=</span>
                <h4 className="font-extrabold text-white w-1/3">{lvl?.percent}%</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:flex items-center justify-center gap-5">
        <input
          type="text"
          inputMode="numeric"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter total amount (e.g. 500)"
          className=" p-3 border rounded-xl"
        />
        <div>
          <button onClick={calculateDistribution} className="lg:mt-0 mt-5 bg-green-700 shadow-2xl px-5 py-4 rounded-xl text-sm font-medium text-white">
            Generate Flow
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center mt-5">
        {activeAmount && <div className="flex flex-col items-center">
          <div className="text-sm text-[#007bff] font-semibold">
            <p className="text-[#555] my-2 font-semibold">
              Admin | Total Amount: ₹{amount}
            </p>
          </div>
          <div className="flex flex-wrap justify-center max-w-[80%] gap-5">

            <div className="border rounded-full border-[#007bff] shadow-xl w-16 h-16 max-w-20 max-h-20 flex items-center justify-center flex-col">
              👤<br />
              <small className="text-[#333] font-medium">₹{activeAmount}</small>
            </div>

          </div>
          <div className="text-[#28a745] text-5xl">↓</div>
        </div>}
      </div>
      {distribution.length > 0 && (
        <div className="flex flex-col items-center justify-center gap-5">
          {distribution.map((lvl, i) => (
            <div key={lvl.level} className="flex flex-col items-center">
              <div className="text-sm text-[#007bff] font-semibold">
                <h3>
                  Level {lvl.level} — {lvl.percent}% → ₹{lvl.totalShare}
                </h3>
                <p className="text-[#555] my-2 font-semibold">
                  {lvl.members} members | ₹{lvl.perMember} each | Remaining: ₹
                  {lvl.remaining}
                </p>
              </div>
              <div className="flex flex-wrap justify-center max-w-[80%] gap-5">
                {[...Array(lvl.members)].map((_, idx) => (
                  <div key={idx} className="border rounded-full border-[#007bff] shadow-xl w-16 h-16 max-w-20 max-h-20 flex items-center justify-center flex-col">
                    👤<br />
                    <small className="text-[#333] font-medium">₹{lvl.perMember}</small>
                  </div>
                ))}
              </div>
              {i < distribution.length - 1 && <div className="text-[#28a745] text-5xl">↓</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
