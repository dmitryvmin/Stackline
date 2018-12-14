import axios from 'axios';
import {
    FETCH_BEGIN,
    FETCH_SUCCESS,
    FETCH_FAILURE,
    PRODUCTS_ENDPOINT,
} from './../../Constants';

export const fetchProductsBegin = () => ({
    type: FETCH_BEGIN
});

export const fetchProductsSuccess = products => ({
    type: FETCH_SUCCESS,
    payload: { products }
});

export const fetchProductsFailure = error => ({
    type: FETCH_FAILURE,
    payload: { error }
});

export const fetchProducts = () => {
    return dispatch => {
        dispatch(fetchProductsBegin());

        return axios.get(PRODUCTS_ENDPOINT)
            .then(response => {
                dispatch(fetchProductsSuccess(response.data))
            })
            .catch(error => {
                dispatch(fetchProductsFailure(error))
            });
    };
}
