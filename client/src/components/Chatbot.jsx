import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./styles/Chatbot.css";

const Chatbot = ({ weatherData, airQualityData }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const chatContainerRef = useRef(null);

  const parseMessage = (message) => {
    return message.split("*").filter((item) => item.trim()).map((item, index) => (
      <li key={index}>
        {item.trim()}
      </li>
    ));
  };

  const addMessageToChatHistory = (role, message) => {
    setChatHistory(oldChatHistory => [
      ...oldChatHistory,
      {
        role,
        parts: [message],
      },
    ]);
  };

  useEffect(() => {
    const initializeChat = async () => {
      if (currentUser) {
        addMessageToChatHistory("model", `Hi, ${currentUser.username}! I am your AI assistant! I will ensure that your trip is smooth and memorable. Let me explain you my role in the trip.`);

        const airQualityMessage = airQualityData
          ? `The air quality at your location (${airQualityData.city_name}) has an AQI of ${airQualityData.data[0].aqi}. Predominant pollen type is ${airQualityData.data[0].predominant_pollen_type}.`
          : null;

        const weatherMessage = weatherData
          ? `The current weather at your location (${weatherData.location.name}) is ${weatherData.current.condition.text} with a temperature of ${weatherData.current.temp_c}°C.`
          : null;

        const initialMessages = [
          airQualityMessage,
          weatherMessage,
        ].filter(message => message !== null);

        const initialMessage = initialMessages.join(" ");

        try {
          const response = await fetch("/api/chatbot/gemini", {
            method: "POST",
            body: JSON.stringify({
              history: chatHistory,
              message: initialMessage,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();

          setChatHistory(oldChatHistory => [
            ...oldChatHistory,
            ...initialMessages.map(msg => ({ role: "model", parts: [msg] })),
            {
              role: "model",
              parts: [data.response],
            },
          ]);
        } catch (error) {
          console.error("Error sending initial data:", error);
        }
      }
    };

    initializeChat();
  }, [currentUser, weatherData, airQualityData]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const getResponse = async () => {
    if (!value) {
      setError("Error! Please ask a question!");
      return;
    }
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory,
          message: value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("/api/chatbot/gemini", options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setChatHistory(oldChatHistory => [
        ...oldChatHistory,
        {
          role: "user",
          parts: [value],
        },
        {
          role: "model",
          parts: [data.response],
        },
      ]);
      setValue("");
    } catch (error) {
      console.error("Error in getResponse:", error);
      setError("Something went wrong! Please try again later.");
    }
  };

  const clear = () => {
    setValue("");
    setError("");
    setChatHistory([]);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      getResponse();
    }
  };

  return (
    <div className="chat_bot">
      <div className="input-container">
        <input
          value={value}
          placeholder="Ask Your AI Trip Advisor"
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        {!error && <button onClick={getResponse}>Ask AI</button>}
        {error && <button onClick={clear}>Clear</button>}
      </div>
      {error && <p>{error}</p>}
      <div className="search-result" ref={chatContainerRef}>
        {chatHistory.map((chatItem, index) => (
          <div key={index}>
            <p className="answer">
              {chatItem.role === "user" ? currentUser.username : 'AI'} :
              <ul className="ChatResponse">
                {parseMessage(chatItem.parts.join(", "))}
              </ul>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatbot;
