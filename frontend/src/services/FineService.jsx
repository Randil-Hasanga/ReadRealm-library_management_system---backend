import axios from "axios";

const baseUrl = `${import.meta.env.VITE_BASE_URL}/fines`;

const FineService = {
    getFineByBbId: async(bb_id) => {
        try {
            const response = await axios.get(`${baseUrl}/bb/${bb_id}`);
            return response.data.data || [];
          } catch (error) {
            console.error(`Error fetching fine with bb_ID ${bb_id}:`, error);
            throw error;
          }
    }
};

export default FineService;