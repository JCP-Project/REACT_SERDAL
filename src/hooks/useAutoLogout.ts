
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAutoLogout(timeoutSeconds: number = 1000) {
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();

  const resetTimer = () => setSeconds(0);

  // Increase seconds every 1s
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Auto logout trigger
  useEffect(() => {
    if (seconds >= timeoutSeconds) {
      localStorage.clear();
      window.location.reload();
      navigate('/');
    }
  }, [seconds]);

  // Listen for user activity
  useEffect(() => {
    const handleActivity = () => resetTimer();

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("click", handleActivity);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("click", handleActivity);
    };
  }, []);

  return { seconds, resetTimer };
}
