export default (positionLatitude, positionLongitude, zoomLevel) => ({
  type: 'UPDATE_MAP_COORDINATES',
  positionLatitude,
  positionLongitude,
  zoomLevel,
});
