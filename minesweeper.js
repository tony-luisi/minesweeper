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
  return cell.classList[0].split('-')[1]
}

function getCol (cell) {
  return cell.classList[1].split('-')[1]
}

function addListeners(cell) {
  cell.addEventListener('click', showCell)
  cell.addEventListener('contextmenu', markCell)
}

function showCell(evt) {
  evt.target.classList.remove('hidden')
}

function markCell(evt) {
  evt.preventDefault()
  evt.target.classList.toggle('marked')
}
