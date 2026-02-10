import axios from "axios";

export async function askQuestion(question) {
  const res = await axios.post("http://localhost:5000/ask", {
    question,
  });

  return res.data;
}
