const initialState = {
  gameSetting: {
    userId: "",
    row: 0,
    column: 0,
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
  gameOver: false,
};

export default initialState;
