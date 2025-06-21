import { useEffect, useState } from "react";

function NoInternetMessage() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <div style={{ color: "red", padding: "1rem", background: "#ffeaea" }}>
        No internet connection (ERR_INTERNET_DISCONNECTED)
      </div>
    );
  }

  return null;
}

export default NoInternetMessage;
