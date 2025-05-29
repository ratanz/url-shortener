import axios from "axios"

export const createShortUrl = async (url) => {
  const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/create`, { url })
  return data
}

