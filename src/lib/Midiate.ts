import { Player } from "midi-player-js";

import { getMeasures, Measure } from "../tools/Measure";
import { getTimeSignatures } from "../tools/TimeSignature";
import {
  Note,
  getNoteEventTracks,
  generateNotesForMeasures
} from "../tools/Notes";

const player = new Player();

export class Midiate {
  constructor(arrayBuffer: ArrayBuffer) {
    player.loadArrayBuffer(arrayBuffer);
  }

  public calculateMeasures = (): Measure[] => {
    const timeSignatures = getTimeSignatures(player.getEvents());
    return getMeasures(player.division, player.totalTicks, timeSignatures);
  };

  public calculateNotes = (): Note[][] => {
    const measures = this.calculateMeasures();
    const noteEventTracks = getNoteEventTracks(player.getEvents(), measures);
    return generateNotesForMeasures(noteEventTracks);
  };
}
