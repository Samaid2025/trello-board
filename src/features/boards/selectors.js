export const makeSelectBoards = (state) => {
  const {persistedReducer :{boardReducer}} = state; 
  return boardReducer.boards;
}

export const makeSelectBoardById = (state, id) => {
  const {persistedReducer :{boardReducer:{boards}}} = state; 
  return boards.find((board) =>  board.id === id)
}
