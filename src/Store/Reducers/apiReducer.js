import {
    FETCH_BEGIN,
    FETCH_SUCCESS,
    FETCH_FAILURE
} from './../../Constants';
import _ from 'lodash';

import json from './../../Webdev_data2.json';

const initialState = {
    products: [],
    loading: false,
    error: null,
    json: _.first(json),
};

export default function apiReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload.products
            };

        case FETCH_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                products: []
            };

        default:
            return state;
    }
}