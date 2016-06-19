document.addEventListener('DOMContentLoaded', startGame)

var board = {
  cells: []
}

function startGame () {
  var boardElement = document.getElementsByClassName('board')
  var children = boardElement[0].children
  for (var i = 0; i < children.length; i++) {
    addListeners(children[i])
    addCellToBoard(children[i])
  }
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countMines(board.cells[i])
  }
}

function countMines(cell) {
  var surroundingCells = getSurroundingCells(cell.row, cell.col)
  var mineCount = 0
  for (var i = 0; i < surroundingCells.length; i++) {
    if (surroundingCells[i].isMine) {
      mineCount++
    }
  }
  return mineCount
}

function addCellToBoard(cell) {
  var newCell = {
    row: getRow(cell),
    col: getCol(cell),
    isMine: cell.classList.contains('mine')
  }
  board.cells.push(newCell)
}

function getRow (cell) {
  return Number(cell.classList[0].split('-')[1])
}

function getCol (cell) {
  return Number(cell.classList[1].split('-')[1])
}

function addListeners(cell) {
  cell.addEventListener('click', showCell)
  cell.addEventListener('contextmenu', markCell)
}

function showCell(evt) {
  evt.target.classList.remove('hidden')
  showSurrounding(evt.target)
}

function markCell(evt) {
  evt.preventDefault()
  evt.target.classList.toggle('marked')
  evt.target.classList.toggle('hidden')
}
