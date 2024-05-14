import { useState, useEffect } from "react";

const useWebSocket = (url: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(newData);
    };

    ws.onerror = (event) => {
      setError(event as any);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.close(); // Close WebSocket connection when component unmounts
    };
  }, [url]);

  return data;
};

export default useWebSocket;
