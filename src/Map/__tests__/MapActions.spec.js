/* eslint-disable no-undef */
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  fetchRestaurants,
  offMapAlert,
  onMapAlert,
  resetListOfRestaurants,
  updateMapCoordinates,
  updateZoomLevel,
} from '../actions';

describe('Test Map Actions', () => {
  describe('Test Map synchronous Actions', () => {
    it('actionCreator off map alert', () => {
      const alert = offMapAlert();
      expect(alert).toEqual({ type: 'OFF_MAP_ALERT' });
    });

    it('actionCreator on map alert', () => {
      const alert = onMapAlert('danger', 'le ciel est rouge !');
      expect(alert).toEqual({
        type: 'ON_MAP_ALERT',
        messageType: 'danger',
        message: 'le ciel est rouge !',
      });
    });

    it('actionCreator reset list of restaurants', () => {
      const list = resetListOfRestaurants();
      expect(list).toEqual({ type: 'RESET_LIST_OF_RESTAURANTS' });
    });

    it('actionCreator update map coordinates', () => {
      const update = updateMapCoordinates(44.8605579, -0.5528455, 14);
      expect(update).toEqual({
        type: 'UPDATE_MAP_COORDINATES',
        positionLatitude: 44.8605579,
        positionLongitude: -0.5528455,
        zoomLevel: 14,
      });
    });

    it('actionCreator update zoom level', () => {
      const update = updateZoomLevel(14);
      expect(update).toEqual({
        type: 'UPDATE_ZOOM_LEVEL',
        zoomLevel: 14,
      });
    });
  });

  describe('Test Map asynchronous Actions', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('actionCreator fetch restaurants success', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: { message: 'success' },
        });
      });
      const expectedActions = [
        { type: 'FETCH_RESTAURANTS_BEGIN' },
        { type: 'FETCH_RESTAURANTS_SUCCESS', restaurants: { message: 'success' } },
      ];
      const store = mockStore({});
      return store.dispatch(fetchRestaurants(44.8605579, -0.5528455, 44.8605579, -0.5528455))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('actionCreator fetch restaurants failure', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 404
        });
      });
      const expectedActions = [
        { type: 'FETCH_RESTAURANTS_BEGIN' },
        { type: 'FETCH_RESTAURANTS_FAILURE', error: new Error('Request failed with status code 404') },
      ];
      const store = mockStore({});
      return store.dispatch(fetchRestaurants(44.8605579, -0.5528455, 44.8605579, -0.5528455))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
