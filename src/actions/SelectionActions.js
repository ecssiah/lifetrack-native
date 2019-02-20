export const SELECT_FOCUS = 'selection:select-focus';

export function selectFocus(id) {
  return {
    type: SELECT_FOCUS,
    id,
  }
};