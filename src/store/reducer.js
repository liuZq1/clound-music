import { combineReducers } from 'redux-immutable';
import {reducer as recomendReducer } from '../application/Recommend/store/index';

export default combineReducers ({
    recommend : recomendReducer
});