var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $result = document.querySelector('#result')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')

var score = 0
var isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick) // будет вызываться функция при клике по данной области
$gameTime.addEventListener('input', setGameTime) // будет отслеживать инпут, а не кликание

function show($el) {
  $el.classList.remove('hide')
}

function hide($el) {
  $el.classList.add('hide')
}

function startGame() {
  score = 0
  setGameTime()
  $gameTime.setAttribute('disabled', true) // заблокировали ввод

  // show($timeHeader)
  // $timeHeader.classList.remove('hide') // показали заголовок

  // hide($resultHeader)
  // $resultHeader.classList.add('hide') // спрятали заголовок

  $game.style.backgroundColor = '#fff' // поле будет белым

  hide($start)
  // $start.classList.add('hide') // кнопка пропала

  isGameStarted = true // показывает, что игра началась

  var interval = setInterval(function () {
    // интервальная функция
    var time = parseFloat($time.textContent) // получили число

    if (time <= 0) {
      clearInterval(interval) // останавливаем интервал
      endGame() // останавливаем игру
    } else {
      $time.textContent = (time - 0.1).toFixed(1) // получили таймер с одним знаком после запятой
    }
  }, 100) // задаем функцию с интервалом , второй параметр показывает значение таймера
  renderBox() // функция для появления квадратов
}

function setGameScore() {
  $result.textContent = score.toString() // выдаст счетчик кликов
}

function setGameTime() {
  // устанавливает время для игры
  // var time = 5 // сами задаем время пока
  var time = +$gameTime.value // установили время
  $time.textContent = time.toFixed(1)
  show($timeHeader)
  hide($resultHeader)
}

function endGame() {
  isGameStarted = false // завершение игры
  setGameScore() // выдаст счетчик кликов

  show($start)
  // $start.classList.remove('hide') // кнопка появится

  $game.innerHTML = '' // очистили квадраты
  $game.style.backgroundColor = '#ccc' // фон появится

  hide($timeHeader)
  // $timeHeader.classList.add('hide') // спрятали заголовок

  show($resultHeader)
  // $resultHeader.classList.remove('hide') // появился заголовок

  $gameTime.removeAttribute('disabled') // разблокировали ввод
}

function handleBoxClick(event) {
  // console.log(event.target.dataset) // проверка, где кликнули
  if (!isGameStarted) {
    return
  }

  if (event.target.dataset.box) {
    score++ // увеличиваем счетчик
    renderBox() // будем снова генерировать наш квадрат
  }
}

function renderBox() {
  // console.log(getRandom(30, 100)) // проверили работу функции при нажатии на квадрат
  $game.innerHTML = '' // очищаем старые квадраты из области
  var box = document.createElement('div') // создали элемент и поместили его в переменную, далее определяем элемент
  var boxSize = getRandom(30, 100) // задает величину квадрата
  var gameSize = $game.getBoundingClientRect() // выдаст нам высоту и ширину поля, где квадраты появляются
  // console.log(gameSize) // узнали параметры поля
  var maxTop = gameSize.height - boxSize // получили максимальное отклонение по высоте
  var maxLeft = gameSize.width - boxSize // получили максимальное отклонение по ширине
  // box.style.height = box.style.width = '50px' // задали параметр элемента

  box.style.height = box.style.width = boxSize + 'px' // получили квадрат разного размера

  box.style.position = 'absolute' // будет абсолютно позиционироваться в данном диве
  // box.style.backgroundColor = '#000' // выставили значение цвета для элемента

  // box.style.top = '50px' // позиция для элемента статическая
  box.style.top = getRandom(0, maxTop) + 'px' // получаем рандомную позицию квадрата

  // box.style.left = '70px' // позиция для элемента статическая
  box.style.left = getRandom(0, maxLeft) + 'px' // получаем рандомную позицию квадрата

  box.style.cursor = ' pointer' // курсор изменит свой вид
  box.setAttribute('data-box', 'true') // определяем, что клик прошел по квадрату -

  // ===============================================================
  box.style.backgroundColor =
    '#' + color() + color() + color()
  // рандомный цвет у квадрата
  // =================================================================
  // console.log(box.style.backgroundColor)

  $game.insertAdjacentElement('afterbegin', box) // помещаем объект box в элемент game
}

function getRandom(min, max) {
  // функция для рандомных чисел
  return Math.floor(Math.random() * (max - min) + min)
}

function color() {
  // функция рандомного числа
  var get = getRandom(0, 255).toString(16)

  if (get.length < 2) {
    get = '0' + get
  }

  return get
}
