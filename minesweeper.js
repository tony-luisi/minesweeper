document.addEventListener('DOMContentLoaded', startGame)

function startGame () {
  var board = document.getElementsByClassName('board')
  var children = board[0].children
  for (var i = 0; i < children.length; i++){
    addListeners(children[i])
  }
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
