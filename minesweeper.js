document.addEventListener('DOMContentLoaded', startGame)

var board = {
  cells: []
}

function startGame () {
  var boardElement = document.getElementsByClassName('board')
  var children = boardElement[0].children
  for (var i = 0; i < children.length; i++) {
    addListeners(children[i])
    getRow(children[i])
  }
}

function getRow (cell) {
  return cell.classList[0].split("-")[1]
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
