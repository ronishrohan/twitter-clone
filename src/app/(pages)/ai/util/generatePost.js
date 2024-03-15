import axios from "axios";

export async function generatePost(query) {
  const res = await axios.post("/api/generate", { query: query });
  console.log(res.data);
  if (res.data.response) {
    return res.data.response;
  }
}
