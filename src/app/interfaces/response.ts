
export interface IResponse {
	response: any
}
export interface IResponseCustom {
	response: any
}
export interface IHealthUploadResponse {
	response: {healthItems: any, syncDate: string}
}
export interface IHealthResponse {
	response: {
		cursor: string
		heathType: string
		more: boolean
		page: number
		pageCount: number
		records: {}
		source: string
		totalRecordsCount: number
		totalValidRecordsCount: number
	}
}

export interface IHealthUploadResponseItem {
	action: string
	code: string
	id: string
	message: string
	tempId: string

}
