import { 
  INC_TRACKED, 
  DEC_TRACKED 
} from "../constants/Stats";
import { updateUntracked } from "./StatusHandlers";

export function incTracked(dispatch, stats) {
  let newStats = {...stats};

  newStats.tracked++;

  console.warn(newStats.tracked);

  if (newStats.tracked > 0) {
    const newUntracked = (Date.now() - newStats.untrackedStart) / 1000;

    newStats.untracked += Math.floor(newUntracked); 

    updateUntracked(dispatch, newStats.untracked);
  }

  dispatch({ type: INC_TRACKED });
};

export function decTracked(dispatch, stats) {
  let newStats = {...stats};
  
  newStats.tracked--;

  console.warn(newStats.tracked);

  if (newStats.tracked < 1) {
    newStats.untrackedStart = Date.now();
  }

  dispatch({ type: DEC_TRACKED });
};
