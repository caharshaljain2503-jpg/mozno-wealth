// COMMENTED OUT - IPO Section disabled
/*
import axios from "axios";

const RAPIDAPI_IPO_HOST = "indian-ipo-wallah.p.rapidapi.com";

/**
 * @param {{ limit?: number; offset?: number }} params
 * @returns {Promise<Record<string, unknown>[]>}
 */
export async function fetchMainIpoPublic({ limit = 5, offset = 0 } = {}) {
  const key = import.meta.env.VITE_RAPIDAPI_KEY?.trim();
  if (!key) {
    throw new Error("Set VITE_RAPIDAPI_KEY in your .env file.");
  }

  const { data } = await axios.get(
    `https://${RAPIDAPI_IPO_HOST}/main_ipo_public`,
    {
      params: { limit, offset },
      headers: {
        "x-rapidapi-key": key,
        "x-rapidapi-host": RAPIDAPI_IPO_HOST,
        "Content-Type": "application/json",
        apikey: key,
      },
      timeout: 45_000,
    },
  );

  return Array.isArray(data) ? data : [];
}
*/
// END COMMENTED OUT - IPO Section disabled