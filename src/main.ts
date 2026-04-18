/**
 * My Subway Builder Mod
 * Entry point for the mod.
 */

const MOD_ID = 'com.yz.lightrail-tram';
const MOD_VERSION = '0.1.0';
const TAG = '[yztrams]';

const api = window.SubwayBuilderAPI;

if (!api) {
  console.error(`${TAG} SubwayBuilderAPI not found!`);
} else {
  console.log(`${TAG} v${MOD_VERSION} | API v${api.version}`);

  // Guard against double initialization (onMapReady can fire multiple times)
  let initialized = false;

  // Initialize mod when map is ready
  api.hooks.onMapReady((_map) => {
    if (initialized) return;
    initialized = true;

    try {
      // Added trams
      api.trains.registerTrainType({
          id: 'tram',
          name: 'Tram',
          description: "Trams. Modeled after Melbourne's Alstom Citadis 305.",
          stats: {
              maxAcceleration: 1.3,
              maxDeceleration: 1.2,
              maxSpeed: 22.2, // 80kmph
              maxSpeedLocalStation: 12,
              capacityPerCar: 225,
              carLength: 33.5,
              minCars: 1,
              maxCars: 2,
              carsPerCarSet: 1,
              carCost: 1_000_000,
              trainWidth: 2.65,
              minStationLength: 33.5,
              maxStationLength: 67,
              baseTrackCost: 20_000,
              baseStationCost: 15_000_000,
              trainOperationalCostPerHour: 200,
              carOperationalCostPerHour: 30,
              scissorsCrossoverCost: 5_000_000
          },
          compatibleTrackTypes: ['light-rail', 'tram'],
          appearance: {
              color: '#04ff00'
          }
      });

      // Added Light Rail
      api.trains.registerTrainType({
          id: 'light-rail',
          name: 'Light Rail',
          description: "Trams with right of way. Modeled after Sydney Light Rail's Alstom Citadis 305.",
          stats: {
              maxAcceleration: 1.3,
              maxDeceleration: 1.2,
              maxSpeed: 22.2, // 80kmph
              maxSpeedLocalStation: 12,
              capacityPerCar: 225,
              carLength: 33.5,
              minCars: 1,
              maxCars: 2,
              carsPerCarSet: 1,
              carCost: 1_000_000,
              trainWidth: 2.65,
              minStationLength: 33.5,
              maxStationLength: 67,
              baseTrackCost: 20_000,
              baseStationCost: 15_000_000,
              trainOperationalCostPerHour: 200,
              carOperationalCostPerHour: 30,
              scissorsCrossoverCost: 5_000_000
          },
          compatibleTrackTypes: ['light-rail', 'tram'],
          appearance: {
              color: '#ff0000'
          }
      });

      console.log(`${TAG} Initialized successfully.`);
    } catch (err) {
      console.error(`${TAG} Failed to initialize:`, err);
      api.ui.showNotification(`${MOD_ID} failed to load. Check console for details.`, 'error');
    }
  });
}
