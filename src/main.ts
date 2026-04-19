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
          description: "Trams on roads. Modeled after Melbourne's E-Class trams",
          stats: {
              maxAcceleration: 1.3,
              maxDeceleration: 1.2,
              maxSpeed: 4.4, // 16kmph, slow due to mixed traffic
              maxSpeedLocalStation: 4.4,
              capacityPerCar: 214,
              carLength: 33.5,
              minCars: 1,
              maxCars: 1,
              carsPerCarSet: 1,
              carCost: 1_500_000,
              trainWidth: 2.65,
              minStationLength: 33.5,
              maxStationLength: 34,
              baseTrackCost: 20_000,
              baseStationCost: 15_000_000,
              trainOperationalCostPerHour: 200,
              carOperationalCostPerHour: 30,
              scissorsCrossoverCost: 5_000_000,
              stopTimeSeconds: 10,
              maxLateralAcceleration: 2,
              parallelTrackSpacing: 2.5,
              trackClearance: 2,
              maxSlopePercentage: 5.25,
              minTurnRadius: 18,
              minStationTurnRadius: 25,
              trackMaintenanceCostPerMeter: 150,
              stationMaintenanceCostPerYear: 60_000
          },
          compatibleTrackTypes: ['light-rail', 'tram'],
          allowAtGradeRoadCrossing: true,
          appearance: {
              color: '#04ff00'
          },
          elevationMultipliers: {
              STANDARD_TUNNEL: 1_000_000, 
              DEEP_BORE: 1_000_000, // should only be built at-grade, switch to light rail if not
              ELEVATED: 1_000_000,
              CUT_AND_COVER: 1_000_000
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
              maxSpeed: 19.4, // 70kmph
              maxSpeedLocalStation: 12,
              capacityPerCar: 225,
              carLength: 33.5,
              minCars: 1,
              maxCars: 2,
              carsPerCarSet: 1,
              carCost: 1_500_000,
              trainWidth: 2.65,
              minStationLength: 33.5,
              maxStationLength: 67,
              baseTrackCost: 40_000,
              baseStationCost: 30_000_000,
              trainOperationalCostPerHour: 400,
              carOperationalCostPerHour: 60,
              scissorsCrossoverCost: 10_000_000,
              stopTimeSeconds: 10,
              maxLateralAcceleration: 2,
              parallelTrackSpacing: 2.5,
              trackClearance: 2,
              maxSlopePercentage: 5.25,
              minTurnRadius: 18,
              minStationTurnRadius: 25,
              trackMaintenanceCostPerMeter: 300,
              stationMaintenanceCostPerYear: 120_000
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
