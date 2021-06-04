import { boards } from "./model"
import {
  addBoard, addColumn, addCard, dragEnd, editCard, addLabel
} from "./actions"
const initialState = boards;
export default function boardReducer(state = initialState, action) {
  switch (action.type) {
    case addBoard().type:
      return {
        ...state,
        boards: [...state.boards, action.payload]
      }
    case addColumn().type:
      const { id, name, boardId, cards, labels } = action.payload;
      const boardsCopy = state.boards;
      const updatedBoards = boardsCopy.map((item) => {
        if (item.id === boardId) {
          const columns = item.columns.concat({ id, name, cards, labels })
          return {
            ...item,
            columns
          }
        } else {
          return item
        }
      })
      return {
        ...state,
        boards: [...updatedBoards]
      }
    case addCard().type:
      {
        const { id, name, boardId, columnId, description } = action.payload;
        const boardsCopy = state.boards;
        const updatedBoards = boardsCopy.map((item) => {
          if (item.id === boardId) {
            const updatedColumns = item.columns.map(col => {
              if (col.id === columnId) {
                const updatedCards = col.cards.concat({ id, name, description })
                return {
                  ...col,
                  cards: updatedCards
                }
              } else {
                return col
              }
            })
            return {
              ...item,
              columns: updatedColumns
            }
          } else {
            return item
          }
        })
        return {
          ...state,
          boards: [...updatedBoards]
        }
      }
    case dragEnd().type:
      {
        const { destination, source, draggableId, boardId } = action.payload;
        const boardsCopy = state.boards;
        let movedCard ={}
        // remove dragged card from source column
        const updatedBoards = boardsCopy.map(board => {
          if (board.id === boardId) {
            let updatedColumns = board.columns.map(col => {
              if (col.id === source.droppableId) {
                col.cards.forEach( card => {if(card.id === draggableId) movedCard = card})
                const updatedCards = col.cards.filter(card => card.id !== draggableId)
                return {
                  ...col,
                  cards: updatedCards
                }
              } else {
                return col
              }
            })
            const updatedBoardC = {
              ...board,
              columns: updatedColumns
            }
            // add dragged card to destination column
            updatedColumns = updatedBoardC.columns.map(col => {
              if (col.id === destination.droppableId) {
                const cards = col.cards;
                const part1 = cards.slice(0, destination.index);
                const part2 = cards.slice(destination.index);
                const updatedCards = [...part1,movedCard,...part2]
                return {
                  ...col,
                  cards: updatedCards
                }
              } else {
                return col
              }
            })
            return {
              ...board,
              columns: updatedColumns
            }
          } else {
            return board
          }
        })
        return {
          ...state,
          boards: [...updatedBoards]
        }
      }
      case editCard().type:
        {
          const { id, name, boardId, columnId, description } = action.payload;
          const boardsCopy = state.boards;
          const updatedBoards = boardsCopy.map(board => {
            if (board.id === boardId) {
              const updatedColumns = board.columns.map(col => {
                if (col.id === columnId) {
                  const updatedCards = col.cards.map(card => {
                    if(card.id === id){
                      return {id, name, description}
                    }else{
                      return card
                    }
                  })
                  return {
                    ...col,
                    cards: updatedCards
                  }
                } else {
                  return col
                }
              })
              return {
                ...board,
                columns: updatedColumns
              }
            } else {
              return board
            }
          })
          return {
            ...state,
            boards: [...updatedBoards]
          }
        }
      case addLabel().type:
        {
          const { name, boardId, columnId } = action.payload;
          const boardsCopy = state.boards;
          const updatedBoard = boardsCopy.map(board => {
            if(board.id === boardId){
              const updatedColumns = board.columns.map(col => {
                if (col.id === columnId) {
                  const labels = col.labels.concat(name)
                  return {
                    ...col,
                    labels
                  }
                } else {
                  return col
                }
              })
          return {
            ...board,
            columns:updatedColumns
          }
            }
          })
          return {
            ...state,
            boards: [...updatedBoard]
          }
        }
    default:
      return state
  }
};