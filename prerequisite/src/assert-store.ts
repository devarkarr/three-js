import { GLTF } from "three/examples/jsm/Addons.js";
import { createStore } from "zustand/vanilla";

const assertToStore = [
  {
    id: "Earth",
    type: "texture",
    path: "",
  },
  {
    id: "Sum",
    type: "texture",
    path: "",
  },
  {
    id: "Moon",
    type: "texture",
    path: "",
  },
  {
    id: "Mars",
    type: "texture",
    path: "",
  },
  {
    id: "Jupiter",
    type: "texture",
    path: "",
  },
  {
    id: "Venus",
    type: "texture",
    path: "",
  },
  {
    id: "Boom",
    type: "gltf",
    path: "/boombox/BoomBox.gltf",
  },
];

export interface AssertStoreSlice {
  assertToStore: {
    id: string;
    type: string;
    path: string;
  }[];
  loadedAsserts: any[];
  setAssertToStore: (assert: GLTF, id: string) => void;
}

export const assertStore = createStore<AssertStoreSlice>((set) => ({
  assertToStore,
  loadedAsserts: [],
  setAssertToStore: (assert, id) =>
    set((state) => ({
      loadedAsserts: {
        ...state.loadedAsserts,
        [id]: assert,
      },
    })),
}));
