import { 
  ALERT, CONFIRM_ALERT 
} from "../constants/Alert";

export function alert(message) {
  return {
    type: ALERT,
    message,
  };
};

export function confirmAlert() {
  return {
    type: CONFIRM_ALERT,
  };
};