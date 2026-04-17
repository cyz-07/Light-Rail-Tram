/**
 * My Subway Builder Mod
 * Entry point for the mod.
 */

import { ExamplePanel } from './ui/ExamplePanel';

const MOD_ID = 'com.author.modname';
const MOD_VERSION = '1.0.0';
const TAG = '[MyMod]';

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
      // Example: Add a floating panel with a React component
      api.ui.addFloatingPanel({
        id: 'my-mod-panel',
        title: 'My Mod',
        icon: 'Puzzle',
        render: ExamplePanel,
      });

      // Example: Add a button to the escape menu
      api.ui.addButton('escape-menu', {
        id: 'my-mod-button',
        label: 'My Mod Button',
        onClick: () => {
          api.ui.showNotification('Hello from My Mod!', 'info');
        },
      });

      api.trains.registerTrainType({
        id: 'light-rail',
        name: 'Light Rail',
        description: 'Modern light rail for urban transit',
        stats: {
          maxAcceleration: 1.2,
          maxDeceleration: 1.3,
          maxSpeed: 25,
          maxSpeedLocalStation: 12,
          capacityPerCar: 80,
          carLength: 20,
          minCars: 1,
          maxCars: 4,
          carsPerCarSet: 1,
          carCost: 1_500_000,
          trainWidth: 2.65,
          minStationLength: 50,
          maxStationLength: 100,
          baseTrackCost: 20_000,
          baseStationCost: 15_000_000,
          trainOperationalCostPerHour: 200,
          carOperationalCostPerHour: 30,
          scissorsCrossoverCost: 5_000_000
        },
        compatibleTrackTypes: ['light-rail'],
        appearance: {
          color: '#10b981'
        },
        elevationMultipliers: {
          AT_GRADE: 0.7,
          ELEVATED: 1.5
        },
        allowAtGradeRoadCrossing: true
      });

      console.log(`${TAG} Initialized successfully.`);
    } catch (err) {
      console.error(`${TAG} Failed to initialize:`, err);
      api.ui.showNotification(`${MOD_ID} failed to load. Check console for details.`, 'error');
    }
  });
}
