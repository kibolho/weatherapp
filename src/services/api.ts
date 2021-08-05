import { OPEN_WEATHER_BASE_URL } from '../constants';
import axios from 'axios';

export const api = axios.create({
  baseURL: OPEN_WEATHER_BASE_URL
});