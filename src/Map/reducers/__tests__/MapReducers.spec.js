/* eslint-disable no-undef */
import { listOfRestaurantsReducer, mapCoordinatesReducer, onMapAlertReducer } from '..';

describe('Test Map Reducers', () => {
  describe('Test listOfRestaurantsReducer', () => {
    let state;

    beforeEach(() => {
      state = {
        list: [],
        loading: false,
        error: null,
      };
    });

    it('FETCH_RESTAURANTS_BEGIN case reducer for listOfRestaurants', () => {
      state = listOfRestaurantsReducer(state, { type: 'FETCH_RESTAURANTS_BEGIN' });
      expect(state).toEqual({
        list: [],
        loading: true,
        error: null,
      });
    });

    it('FETCH_RESTAURANTS_SUCCESS case reducer for listOfRestaurants', () => {
      state = listOfRestaurantsReducer(state, { type: 'FETCH_RESTAURANTS_SUCCESS', restaurants: [] });
      expect(state).toEqual({
        list: [],
        loading: false,
        error: null,
      });
    });

    it('FETCH_RESTAURANTS_FAILURE case reducer for listOfRestaurants', () => {
      state = listOfRestaurantsReducer(state, { type: 'FETCH_RESTAURANTS_FAILURE', error: 'message erreur' });
      expect(state).toEqual({
        list: [],
        loading: false,
        error: 'message erreur',
      });
    });

    it('RESET_LIST_OF_RESTAURANTS case reducer for listOfRestaurants', () => {
      state = listOfRestaurantsReducer(undefined, { type: 'RESET_LIST_OF_RESTAURANTS' });
      expect(state).toEqual(state);
    });

    it('default case reducer for listOfRestaurants', () => {
      state = listOfRestaurantsReducer(undefined, { type: 'DUMMY_ACTION' });
      expect(state).toEqual(state);
    });
  });

  describe('Test mapCoordinatesReducer', () => {
    let state;

    beforeEach(() => {
      state = {
        positionLatitude: 44.833,
        positionLongitude: -0.59,
        zoomLevel: 12,
      };
    });

    it('UPDATE_MAP_COORDINATES case reducer for mapCoordinatesReducer', () => {
      state = mapCoordinatesReducer(state, {
        type: 'UPDATE_MAP_COORDINATES',
        positionLatitude: 40,
        positionLongitude: -0.8,
        zoomLevel: 14,
      });
      expect(state).toEqual({
        positionLatitude: 40,
        positionLongitude: -0.8,
        zoomLevel: 14,
      });
    });

    it('UPDATE_ZOOM_LEVEL case reducer for mapCoordinatesReducer', () => {
      state = mapCoordinatesReducer(state, {
        type: 'UPDATE_ZOOM_LEVEL',
        zoomLevel: 16,
      });
      expect(state).toEqual({
        positionLatitude: 44.833,
        positionLongitude: -0.59,
        zoomLevel: 16,
      });
    });

    it('default case reducer for mapCoordinatesReducer', () => {
      state = mapCoordinatesReducer(undefined, { type: 'DUMMY_ACTION' });
      expect(state).toEqual(state);
    });
  });

  describe('Test onMapAlertReducer', () => {
    let state;

    beforeEach(() => {
      state = {
        status: false,
        message: '',
        messageType: '',
      };
    });

    it('ON_MAP_ALERT case reducer for onMapAlertReducer', () => {
      state = onMapAlertReducer(state, { type: 'ON_MAP_ALERT', messageType: 'danger', message: 'le ciel est rouge !' });
      expect(state).toEqual({ status: true, messageType: 'danger', message: 'le ciel est rouge !' });
    });

    it('OFF_MAP_ALERT case reducer for onMapAlertReducer', () => {
      state = onMapAlertReducer(state, { type: 'OFF_MAP_ALERT' });
      expect(state).toEqual({ status: false, messageType: '', message: '' });
    });

    it('default case reducer for topAlert', () => {
      state = onMapAlertReducer(undefined, { type: 'DUMMY_ACTION' });
      expect(state).toEqual(state);
    });
  });
});
