import axios from "axios";
import env from "src/config/env.json";

export const getData = async () => {
    return await axios.get(env.dataUrl);
};