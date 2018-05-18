/* @flow */
import type { Track, EncodedTrack } from "./types";

import samples from "./samples.json";



export function initTracks(loopLength): Track[] {
  return [
    {id: 1, name: "-- choose sample --", vol: 1, muted: false, beats: initBeats(loopLength)},
    {id: 2, name: "-- choose sample --", vol: 1, muted: false, beats: initBeats(loopLength)},
    {id: 3, name: "-- choose sample --", vol: 1, muted: false, beats: initBeats(loopLength)},
    {id: 4, name: "-- choose sample --", vol: 1, muted: false, beats: initBeats(loopLength)},
  ];
}

export function initBeats(loopLength: number): boolean[] {
  return new Array(loopLength).fill(false);
}

export function addTrack(tracks: Track[], loopLength: number) {
  const id = Math.max.apply(null, tracks.map(t => t.id)) + 1;
  return [
    ...tracks, {
      id,
      name: "-- choose sample --",
      vol: 1,
      muted: false,
      beats: initBeats(loopLength),
    }
  ];
}

export function clearTrack(tracks: Track[], id: number,loopLength: number): Track[] {
  return tracks.map((track) => {
    if (track.id !== id) {
      return track;
    } else {
      return {...track, beats: initBeats(loopLength)};
    }
  });
}

export function deleteTracks(tracks: Track[], id: number): Track[] {
  return tracks.filter((track) => track.id !== id);
}

export function toggleTrackBeat(tracks: Track[], id: number, beat: number): Track[] {
  return tracks.map((track) => {
    if (track.id !== id) {
      return track;
    } else {
      return {
        ...track,
        beats: track.beats.map((v, i) => i !== beat ? v : !v)
      };
    }
  });
}

export function setTrackVolume(tracks: Track[], id: number, vol: number): Track[] {
  return tracks.map((track) => {
    if (track.id !== id) {
      return track;
    } else {
      return {...track, vol};
    }
  });
}

export function muteTrack(tracks: Track[], id: number): Track[] {
  return tracks.map((track) => {
    if (track.id !== id) {
      return track;
    } else {
      return {...track, muted: !track.muted};
    }
  });
}

export function updateTrackSample(tracks: Track[], id: number, sample: string): Track[] {
  return tracks.map((track) => {
    if (track.id !== id) {
      return track;
    } else {
      return {...track, name: sample};
    }
  });
}

function encodeBeats(beats: boolean[]): string {
  return beats.map(beat => beat ? "1" : "0").join("");
}

function decodeBeats(encodedBeats: string): boolean[] {
  return encodedBeats.split("").map(beat => beat === "1");
}

export function encodeTracks(tracks: Track[]): EncodedTrack[] {
  return tracks.map(({beats, ...track}) => {
    return {...track, beats: encodeBeats(beats)};
  });
}

export function decodeTracks(encodedTracks: EncodedTrack[]): Track[] {
  return encodedTracks.map(({beats, ...encodedTrack}) => {
    return {...encodedTrack, beats: decodeBeats(beats)};
  });
}

export function randomTracks(loopLength: number): Track[] {
  const nT = Math.floor(3 + (Math.random() * 10));
  return new Array(nT).fill().map((_, i) => {
    return {
      id: i + 1,
      name: samples[Math.floor(Math.random() * samples.length)],
      vol: Math.random(),
      muted: false,
      beats: initBeats(loopLength).map(_ => Math.random() > .75),
    }
  });
}

export function randomSong(loopLength: number): {bpm: number, tracks: Track[]} {
  return {
    bpm: Math.floor(Math.random() * 75) + 75,
    tracks: randomTracks(loopLength),
  };
}

export function updateTracksLength(tracks: Tracks[], loopLength: number) : Track[] {
  return tracks.map((track) => {
    if (track.beats.length > loopLength) {
      return {...track, beats: track.beats.slice(0,loopLength)};
    }
    else {
      const newBeats = Array(loopLength-track.beats.length).fill(false);
      return {...track, beats: track.beats.concat(newBeats)}
    }
  })
}

export function setPreset(tracks: Tracks[], samples: string[], grid: boolean[]): {track: Track[]} {
  let numberOfTrack = grid.length;
  let newTracks = new Array(numberOfTrack).fill({id: 1, name: "hihat-reso", vol: 1, muted: false, beats: initBeats(16)});
  return newTracks.map((track,i) => {
    return {id: i, name: samples[i], vol: 1, muted: false, beats: grid[i]}
  })
}

export function presetHandler(presetName: string): {samples: string[], grid: boolean[]} {
  let path = "./presets/"+ presetName +".json";
  let preset = require(path);
  return {samples: preset.samples, grid: preset.grid}
}

export function tracksToJSON(tracks: Tracks[]): {samples: string[], grid: boolean[]} {
  let samples = [];
  let grid = [];
  for (var i = 0; i < tracks.length; i++) {
    samples.push(tracks[i].name);
    grid.push(tracks[i].beats) 
  }    
  return {samples: samples, grid: grid}
}