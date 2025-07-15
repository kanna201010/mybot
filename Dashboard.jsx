import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./Dashboard.css";

const socket = io("http://localhost:3000");

function Dashboard() {
  const [balances, setBalances] = useState({});
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    socket.on("updateBalances", (data) => setBalances(data));
    socket.on("tradeLogs", (data) => setLogs((prevLogs) => [...prevLogs, data]));
  }, []);

  return (
    <div className="dashboard">
      <h1>Arbitrage Sniper</h1>
      <div className="balances">
        <h2>Wallet Balances</h2>
        {Object.entries(balances).map(([token, balance]) => (
          <p key={token}>
            {token}: {balance}
          </p>
        ))}
      </div>
      <div className="logs">
        <h2>Trade Logs</h2>
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;