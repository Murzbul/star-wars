import { AxiosInstance, AxiosResponse } from 'axios';
import Logger from '../Helpers/Logger';

interface AxiosSendPayload
{
    method: string,
    url: string,
    data?: any,
    config: any
}

class AxiosHandler
{
    private axios: AxiosInstance;

    constructor(axios: AxiosInstance)
    {
        this.axios = axios;
    }

    public async send(payload: AxiosSendPayload)
    {
        try
        {
            const { method, url, data, config } = payload;

            let response: AxiosResponse<any> = await this.axios.request({
                method,
                url,
                data: data ?? undefined
            });

            // if (method === 'get' || method === 'delete' || method === 'head' || method === 'options')
            // {
            //     response = await call(url, config);
            // }
            // else
            // {
            //     response = await call(url, data, config);
            // }

            return response.data;
        }
        catch (e: any)
        {
            await Logger.error(e.response.data);
        }
    }
}

export default AxiosHandler;
