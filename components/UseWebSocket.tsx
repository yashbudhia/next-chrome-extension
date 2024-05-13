import { useState, useEffect } from "react";

const useWebSocket = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(newData);
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
