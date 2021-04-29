import axios from '../core';

export default async (req, res) => {
    try {
        const { id } = req.query;
        const response = await axios.get(`https://api.twitch.tv/helix/videos?id=${id}`);
        res.status(200).json({ data: response.data.data[0] });
    } catch (e) {
        res.status(e.response.status).json({
            message: e.message,
        });
    }
};
