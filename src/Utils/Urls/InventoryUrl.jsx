import { basedUrl } from "../Network/Network";

export const getInventroyProductUrl = basedUrl + '/inventory/get-all'

export const addInventroyProductUrl = basedUrl + '/inventory/create'

export const deleteInventroyProductUrl = (id) => basedUrl + `/inventory/delete/${id}`

export const updateInventroyProductUrl = (id) => basedUrl + `/inventory/update/${id}`
