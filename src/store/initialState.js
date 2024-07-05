const initialState = {
  gameSetting: {
    userId: "",
    row: 0,
    column: 0,
    bombRate: 0
  },
  viewMode: "entrance",
  field: {
    coverField: [],
    underField: []
  },
  timer: {
    timeId: 0,
    timeCount: 0,
  },
  isGameEnd: false,
};

export default initialState;
