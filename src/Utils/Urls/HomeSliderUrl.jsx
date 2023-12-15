import { basedUrl } from '../Network/Network';

export const getHomeSliderUrl = basedUrl + '/slider/get-all';

export const addHomeSliderUrl = basedUrl + '/slider/create';

export const deleteHomeSliderUrl = (id) => basedUrl + `/slider/delete/${id}`;

export const updateHomeSliderUrl = (id) => basedUrl + `/slider/update/${id}`;

// === Homeslider Product ====

export const getHomeSliderProductUrl = basedUrl + '/slider/product/get-all';

export const addHomeSliderProductUrl = basedUrl + '/slider/product/create';

export const deleteHomeSliderProductUrl = (id) => basedUrl + `/slider/product/delete/${id}`;

export const updateHomeSliderProductUrl = (id) => basedUrl + `/slider/product/update/${id}`;

