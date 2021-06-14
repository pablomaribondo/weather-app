import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import {
  WeatherAction,
  WeatherData,
  WeatherError,
  GET_WEATHER,
  SET_LOADING,
  SET_ERROR
} from '../types';

export const getWeather = (
  city: string
): ThunkAction<void, RootState, null, WeatherAction> => {
  return async dispatch => {
    try {
      const response = await fetch(
        `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
      );

      if (!response.ok) {
        const responseData: WeatherError = await response.json();
        throw new Error(responseData.message);
      }

      const responseData: WeatherData = await response.json();
      dispatch({
        type: GET_WEATHER,
        payload: responseData
      });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.message
      });
    }
  };
};

export const setLoading = (): WeatherAction => {
  return {
    type: SET_LOADING
  };
};

export const setError = (): WeatherAction => {
  return {
    type: SET_ERROR,
    payload: ''
  };
};
