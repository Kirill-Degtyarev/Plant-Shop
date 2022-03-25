"use strict";

let forms = document.querySelector(".header-body__btn");
let popUp = document.querySelector(".popup");
let rood = document
  .querySelector(".popup-content__close")
  .addEventListener("click", openForm);
let close = document
  .querySelector(".cancel")
  .addEventListener("click", openForm);

forms.addEventListener("click", openForm);

//открытие формы
function openForm() {
  if (popUp.style.display == "none" || popUp.style.display == "") {
    popUp.style.display = "flex";
    document.body.style.overflow = "hidden";
  } else {
    popUp.style.display = "none";
    document.body.style.overflow = "";
  }
}

//Отправка и получение данных
async function send() {
  fetch("https://jsonplaceholder.typicode.com/todos", { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      generateTable(json);
    })
    .catch((error) => {
      showError(error);
    });
}
function showError(error) {
  let popUpContent = document.getElementsByClassName("popup-body__content");
  popUpContent = popUpContent[0];
  while (popUpContent.children.length > 1) {
    popUpContent.removeChild(popUpContent.lastChild);
  }
  let h2 = document.createElement("h2");
  h2.innerText = "Произошла ошибка";
  popUpContent.appendChild(h2);
}
function generateTable(data) {
  //очищаем модальное окно
  let popUpContent = document.getElementsByClassName("popup-body__content");
  popUpContent = popUpContent[0];
  while (popUpContent.children.length > 1) {
    popUpContent.removeChild(popUpContent.lastChild);
  }

  //генерирование таблицы
  let table = document.createElement("table");
  let thead = document.createElement("thead");
  thead.innerText = "Полученные данные";
  table.appendChild(thead);
  let tbody = document.createElement("tbody");
  //фильтрация данных
  data = data.filter((item) => item.userId === 5 && !item.completed);
  /* data.forEach(item=>{
      let tr = document.createElement('tr')
      let tdId = document.createElement('td')
      tdId.innerText = item.id
      let tdUserId = document.createElement('td')
      tdUserId.innerText = item.userId
      let tdTitle = document.createElement('td')
      tdTitle.innerText = item.title
      let tdCompleted = document.createElement('td')
      tdCompleted.innerText = item.completed

      tr.appendChild(tdId);
      tr.appendChild(tdUserId);
      tr.appendChild(tdTitle);
      tr.appendChild(tdCompleted);
      tbody.appendChild(tr)
  }) */
  data.forEach((item) => {
    tbody.innerHTML += `<tr><td>${item.id}</td><td>${item.userId}</td><td>${item.title}</td><td>${item.completed}</td></tr>`;
  });
  table.appendChild(tbody);
  popUpContent.appendChild(table);
}

//
//Проверка номера
window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll(".tel"), function (input) {
    let keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      let pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      let matrix = "+7 (___) ___-__-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i);
      }
      let reg = matrix
        .substr(0, this.value.length)
        .replace(/_+/g, function (a) {
          return "\\d{1," + a.length + "}";
        })
        .replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (
        !reg.test(this.value) ||
        this.value.length < 5 ||
        (keyCode > 47 && keyCode < 58)
      )
        this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = "";
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
  });
});
