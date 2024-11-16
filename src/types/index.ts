import store from "../store";

export type CoverState = "flag" | "question" | "open" | "covered";
export type BombCount = number;
export type UnderState = "bomb" | BombCount;
export type GameMode = "single" | "Challenge";
export type BombRate = 0.12 | 0.15 | 0.2;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
