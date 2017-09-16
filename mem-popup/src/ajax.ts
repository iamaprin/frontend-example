import * as $ from 'jquery';

export interface ApiResponse<T = any> {
    code: number;
    message: string;
    data: T
}

export interface AjaxCallback<T> {
    (apiResponse : ApiResponse<T>): void
}

export class Ajax {

    request<T>(url: string, data?: any, method: AjaxMethod = AjaxMethod.GET): Promise<T> {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                data: data,
                method: method
            }).done((resp: ApiResponse<T>) => {
                if (resp.code) {
                    return;
                }
                resolve(resp.data);
            }).fail(() => {
                reject();
            });
        })
    }

    get<T>(url: string, data?: any): Promise<T> {
        return this.request(url, data);
    }

    post<T>(url: string, data?: any): Promise<T> {
        return this.request(url, data, AjaxMethod.POST);
    }
}

export enum AjaxMethod {
    POST = 'post',
    GET = 'get'
}