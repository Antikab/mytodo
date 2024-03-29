const container = document.querySelector('#container');
const list = container.querySelector('.list');
let input = container.querySelector('.input');
const btn = container.querySelector('.btn');
let todoList = []; // Массив для хранения элементов списка дел
const btnSort = container.querySelector('.btnSort');
let ascendingOrder = true; // Переменная для отслеживания текущего направления сортировки

const sortToggle = () => {
  todoList.sort((a, b) => {
    const textA = a.querySelector('span').textContent.toLowerCase();
    const textB = b.querySelector('span').textContent.toLowerCase();

    // Пытаемся преобразовать текст в числа
    const numberA = parseInt(textA);
    const numberB = parseInt(textB);

    // В зависимости от текущего направления сортировки
    if (ascendingOrder) {
      // Если в порядке возрастания
      if (numberA && numberB) {
        return numberA - numberB;
      }
      return textA.localeCompare(textB);
    } else {
      // Если в порядке убывания
      if (numberA && numberB) {
        return numberB - numberA;
      }
      return textB.localeCompare(textA);
    }
  });

  // Переключаем направление сортировки для следующего раза
  ascendingOrder = !ascendingOrder;
};

function addEmptyListItem() {
  // Создаем элемент "Задач нет"
  const emptyLi = document.createElement('span');
  emptyLi.textContent = 'Задач нет';
  list.append(emptyLi);
}

document.addEventListener('DOMContentLoaded', () => {
  if (todoList.length === 0) {
    // Если список пуст, добавляем элемент "Задач нет"
    addEmptyListItem();
  }
});

btn.addEventListener('click', () => {
  let li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = input.value;

  let btnDel = document.createElement('button');
  btnDel.textContent = 'X';
  btnDel.classList.add('btn-del');

  if (input.value !== '') {
    todoList.push(li); // Добавляем элемент списка в массив
    list.append(li);
    li.append(span);
    li.append(btnDel);
    input.value = ''; // Очистка и обновление списка

    // Очистка и обновление списка
    list.innerHTML = '';
    todoList.forEach(item => {
      list.append(item);
    });
  }

  btnDel.addEventListener('click', () => {
    li.remove();
    btnDel.remove();
    todoList = todoList.filter(item => item !== li); // Удаляем элемент из массива

    if (todoList.length === 0) {
      // Если список пуст, добавляем элемент "Задач нет"
      addEmptyListItem();
    }
  });
});

btnSort.addEventListener('click', () => {
  sortToggle();

  // Очистка и обновление списка
  list.innerHTML = '';
  todoList.forEach(item => {
    list.append(item);
  });
});
