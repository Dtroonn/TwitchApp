import axios from './core';

//Будем по дефолту всегда отдавать 20 видео(если канал найдется), если нужно больше, то можно будет расширить функционал
// API twitch-a позволяет это сделать

const getVideos = (channelName, ids, after, before, limit) => {
    const userIdQuery = channelName ? `user_id=${channelName}` : '';
    const idQuery = ids ? `id=${ids}` : '';
    const afterQuery = after ? `after=${after}` : '';
    const beforeQuery = before ? `before=${before}` : '';
    return axios.get(
        'videos?' + `&${userIdQuery}` + `&${idQuery}` + `&${afterQuery}` + `&${beforeQuery}`,
    );
};

export default async (req, res) => {
    try {
        const { channelName, ids, after, before } = req.query;

        if (ids && channelName) {
            return res.status(400).json({
                message: 'channelName and ids cannot be at the same time',
            });
        }

        if (channelName) {
            const channelsRes = await axios.get(`search/channels?query=${channelName}&first=1`);
            const channels = channelsRes.data.data;
            if (channels.length) {
                const response = await getVideos(channels[0].id, null, after, before);
                return res.status(200).json(response.data);
            }
        }

        if (ids) {
            const response = await getVideos(null, ids, after, before);
            return res.status(200).json(response.data);
        }

        return res.status(200).json({ data: [], pagination: {} });
    } catch (e) {
        res.status(e.response.status).json({
            message: e.message,
        });
    }
};
