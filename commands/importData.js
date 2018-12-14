import fs from 'fs';

import { Place, sequelize } from '../server/sequelize';

function importPlaces() {
  const PlacesData = JSON.parse(fs.readFileSync('.json_data/places.json', 'UTF-8'));

  PlacesData.map(place => Place
    .findOrCreate({
      where: {
        name: place.tags.name,
        lat: parseFloat(place.lat),
        lng: parseFloat(place.lon),
        type: place.tags.amenity
      }
    }));
}

sequelize.sync()
  .then(() => {
    importPlaces();
  })
  .then(() => {
    sequelize.close();
  });
