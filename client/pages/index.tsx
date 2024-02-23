import React, { useState } from "react";

function UserInput() {
  const [numA, setNumA] = useState("");
  const [result, setResult] = useState("Result will be displayed here");

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numA }),
      });

      const data = await response.json();
      setResult(`Result: ${data.result}`);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResult("Error fetching data");
    }
  };

  return (
    <div>
      <div>
        <label>
          Number A:
          <input
            type="string"
            value={numA}
            onChange={(e) => setNumA(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button onClick={fetchData}>Enter</button>
      </div>
      <div>{result}</div>
    </div>
  );
}

export default UserInput;

