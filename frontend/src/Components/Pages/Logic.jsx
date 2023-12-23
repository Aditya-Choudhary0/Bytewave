
import React, { useState } from "react";
import axios from "axios";

export const Logic = () => {
  const [text, setText] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const startingPrompt = {
    MERN: "Hi, let's start the interview for MERN...",
    JAVA: "Hi, let's start the interview for JAVA...",
  };

  const UpdateInterviewPrompt = "Give me a question. Provide 1 question at a time, and wait for the user's response.";

  const demoConversation = [
    { role: "assistant", content: "Are you ready for the interview " },
    { role: "user", content: "Yes Please start the interview" },
    { role: "assistant", content: "Ok here's  your first question" },
  ];

  const startInterview = async () => {
    try {
      setLoading(true);
      // Simulating a successful API response
      const response = await axios.post("https://byte-wave-backend.onrender.com//interview/start", {
        type: "MERN", // Replace with the actual interview type you want to start
      });

      setConversation([
        ...conversation,
        { role: "assistant", content: response.data.msg },
        { role: "assistant", content: response.data.question },
      ]);
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle error gracefully or display demo data
      setConversation([...demoConversation]);
    } finally {
      setLoading(false);
    }
  };

  const handleStop = async () => {
    try {
      setLoading(true);
      // Simulating a successful API response
      const response = await axios.post("https://byte-wave-backend.onrender.com//interview/end", {
        conversation: [...conversation, { role: "user", content: "endInterviewPrompt" }],
      });

      setConversation([
        ...conversation,
        { role: "assistant", content: response.data.endObj },
      ]);
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle error gracefully or display demo data
      setConversation([...demoConversation]);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    try {
      setLoading(true);
      let prompt = startingPrompt && UpdateInterviewPrompt;

      // Simulating a successful API response
      const response = await axios.patch("https://byte-wave-backend.onrender.com//update", {
        sessionToken: conversation[0]?.sessionToken,
        conversation: [
          ...conversation,
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      setConversation([
        ...conversation,
        { role: "assistant", content: response.data.nextQuestion },
      ]);
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle error gracefully or display demo data
      setConversation([...demoConversation]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;

    try {
      setLoading(true);
      // Simulating a successful API response
      const response = await axios.post("/gpt", {
        conversation: [...conversation, { role: "user", content: text.trim() }],
      });

      setConversation([
        ...conversation,
        { role: "user", content: text.trim() },
        { role: "assistant", content: response.data.answer },
      ]);
      setText(""); // Clear the input field
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle error gracefully or display demo data
      setConversation([...demoConversation]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     <div style={{ textAlign: 'left', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
  {conversation.map((item, index) => (
    <div key={index} className={item.role} style={{ marginBottom: '10px' }}>
      <strong>{item.role.charAt(0).toUpperCase() + item.role.slice(1)}:</strong> {item.content}
    </div>
  ))}
</div>


      <textarea
        rows="4"
        cols="50"
        placeholder="Type your response..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      
      <button
  onClick={startInterview}
  disabled={loading}
  style={{
    backgroundColor: '#3498db',
    color: '#ffffff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginRight: '10px',
  }}
>
  Start Interview
</button>

<button
  onClick={handleSubmit}
  disabled={loading}
  style={{
    backgroundColor: '#2ecc71',
    color: '#ffffff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginRight: '10px',
  }}
>
  Submit
</button>

<button
  onClick={handleNext}
  disabled={loading}
  style={{
    backgroundColor: '#3498db',
    color: '#ffffff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginRight: '10px',
  }}
>
  Next Question
</button>

<button
  onClick={handleStop}
  disabled={loading}
  style={{
    backgroundColor: '#e74c3c',
    color: '#ffffff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginRight: '10px',
  }}
>
  Stop
</button>

    </>
  );
};
