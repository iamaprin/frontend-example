
export interface ApiResponse {
    code: number;
    message: string;
    data: any
}

export interface AjaxCallback {
    (apiResponse : ApiResponse): void
}
