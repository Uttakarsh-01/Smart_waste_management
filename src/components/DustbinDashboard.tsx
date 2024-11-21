import React, { useState, useEffect, useCallback, useRef } from "react";
import "./DustbinDashboard.css";

const DustbinDashboard: React.FC = () => {
  const [alertEnabled, setAlertEnabled] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const intervalRef = useRef<number>();
  const audioContextRef = useRef<AudioContext>();

  const createBeep = useCallback(() => {
    audioContextRef.current = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.type = "sine";
    oscillator.frequency.value = 800;
    gainNode.gain.value = 0.1;

    oscillator.start();
    setTimeout(() => oscillator.stop(), 200);
  }, []);

  const resetMonitoring = useCallback(() => {
    setAlertEnabled(false);
    setCurrentLevel(0);
    setTimeLeft(20);
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
  }, []);

  const handleAlertToggle = useCallback(() => {
    if (!alertEnabled) {
      setAlertEnabled(true);
      setCurrentLevel(0);
      setTimeLeft(20);
    } else {
      resetMonitoring();
    }
  }, [alertEnabled, resetMonitoring]);

  useEffect(() => {
    if (alertEnabled) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            createBeep();
            setTimeout(resetMonitoring, 1000);
            return 0;
          }
          return prev - 1;
        });

        setCurrentLevel((prev) => Math.min(100, prev + 5));
      }, 1000);

      return () => {
        if (intervalRef.current) {
          window.clearInterval(intervalRef.current);
        }
      };
    }
  }, [alertEnabled, createBeep, resetMonitoring]);

  return (
    <div className="dashboard">
      <h1 className="header">Smart Dustbin Monitor</h1>

      <div className="grid">
        <div className="card">
          <h2>Dustbin Status</h2>
          <div className="dustbin-level">
            <div
              className="level-fill"
              style={{ height: `${currentLevel}%` }}
            />
          </div>
          <div className="stats">
            <div className="stat-item">
              <h3>Fill Level</h3>
              <p>{currentLevel}%</p>
            </div>
            <div className="stat-item">
              <h3>Last Updated</h3>
              <p>Just now</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h2>Alert Settings</h2>
          <button
            className={`alert-btn ${alertEnabled ? "active" : ""} ${
              timeLeft === 0 ? "beeping" : ""
            }`}
            onClick={handleAlertToggle}
          >
            Start Monitoring
          </button>
          <div className="stats">
            <div className="stat-item">
              <h3>Alert Status</h3>
              <p>{alertEnabled ? "Active" : "Inactive"}</p>
            </div>
            <div className="stat-item">
              <h3>Time Remaining</h3>
              <p>{timeLeft}s</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DustbinDashboard;
