document.addEventListener('DOMContentLoaded', startGame)

var board = {
  cells: []
}

function startGame () {
  var children = getCells()
  for (var i = 0; i < children.length; i++) {
    addListeners(children[i])
    addCellToBoard(children[i])
  }
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countMines(board.cells[i])
  }
}

function getCells(){
  var boardElement = document.getElementsByClassName('board')
  return boardElement[0].children
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

function checkForWin() {
  checkForLoss()
  var allMinesMarked = true
  var allCellsUnhidden = true
  var cells = board.cells
  for (var i = 0; i < cells.length; i++) {
    if (!cells[i].isMarked && cells[i].isMine) {
      allMinesMarked = false
    }
  }
  if (!allMinesMarked) {
    return
  }
  var domCells = getCells()
  for (var i = 0; i < domCells.length; i++) {
    if (domCells[i].classList.contains('hidden')) {
      allCellsUnhidden = false
    }
  }
  if (allCellsUnhidden) {
    alert("You won!")
  }
}

function checkForLoss(){

}

function showCell(evt) {
  evt.target.classList.remove('hidden')
  if (evt.target.classList.contains('mine')) {
    showAllMines()
  }
  showSurrounding(evt.target)
  checkForWin()
}

function showAllMines(){
  var cells = getCells()
  for (var i = 0; i < cells.length; i++) {
    cells[i].classList.remove('hidden')
  }
}

function markCell(evt) {
  evt.preventDefault()
  evt.target.classList.toggle('marked')
  evt.target.classList.toggle('hidden')
  var filteredCells = board.cells
    .filter(function(cell){
      return cell.row === getRow(evt.target)
    })
    .filter(function(cell){
      return cell.col === getCol(evt.target)
    })
  filteredCells[0].isMarked = true
  checkForWin()
}
