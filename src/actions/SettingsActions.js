export const LOAD_SETTINGS = 'settings:load-settings';

export function loadSettings(settings) {
  return {
    type: LOAD_SETTINGS,
    settings,
  };
};