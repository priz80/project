"use strict";

let titleProject = document.getElementsByTagName("h1")[0];

let calculateButton = document.getElementsByClassName("handler_btn")[0];
let resetButton = document.getElementsByClassName("handler_btn")[1];

let plusButton = document.querySelector(".screen-btn");

const percentItems = document.querySelectorAll(".other-items.percent");
const numberItems = document.querySelectorAll(".other-items.number");

let inputTypeRange = document.querySelector('.rollback input[type="range"]');
const rangeValueElement = document.querySelector(".rollback .range-value");

let totalInputs = document.getElementsByClassName("total-input")[0];
let totalCount = document.getElementsByClassName("total-input")[1];
let totalCountOther = document.getElementsByClassName("total-input")[2];
let fullTotalCount = document.getElementsByClassName("total-input")[3];
let totalCountRollback = document.getElementsByClassName("total-input")[4];

let screens = document.querySelectorAll(".screen");

const cmsOpenCheckbox = document.getElementById("cms-open");
const hiddenCmsVariants = document.querySelector(".hidden-cms-variants");
// select и блок "Другое" ищем СТРОГО внутри hidden-cms-variants,
// т.к. одноимённых блоков (.main-controls__input) в проекте много
const cmsSelect = hiddenCmsVariants.querySelector("select");
const cmsOtherInput = hiddenCmsVariants.querySelector(".main-controls__input");
const cmsCheckboxes = hiddenCmsVariants.querySelectorAll('input[type="checkbox"]');

const appData = {
  title: " ",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  fullPriceWithRollback: 0,
  totalCountAll: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  cmsPercent: 0,
  cmsPrice: 0,

  // ----- методы объекта (обычные функции, чтобы this === appData) -----

  init() {
    this.addTitle();
    this.setupRangeSlider();
    this.setupCmsToggle();
    this.setupCmsSelect();

    // кнопка "Сброс" изначально скрыта
    resetButton.style.display = "none";

    // блок с CMS-вариантами и вложенный блок "Другое" изначально скрыты
    hiddenCmsVariants.style.display = "none";
    cmsOtherInput.style.display = "none";

    // при использовании ссылки на метод объекта в качестве обработчика
    // контекст теряется, поэтому явно привязываем appData через bind
    calculateButton.addEventListener("click", this.start.bind(this));
    resetButton.addEventListener("click", this.reset.bind(this));
    plusButton.addEventListener("click", this.addScreenBlock.bind(this));
  },

  setupCmsToggle() {
    // стрелочная функция — this внутри неё это appData (лексически из init)
    cmsOpenCheckbox.addEventListener("change", () => {
      // по заданию именно display: flex, а не display: block
      hiddenCmsVariants.style.display = cmsOpenCheckbox.checked ? "flex" : "none";
    });
  },

  setupCmsSelect() {
    cmsSelect.addEventListener("change", () => {
      cmsOtherInput.style.display = cmsSelect.value === "other" ? "flex" : "none";
    });
  },

  addTitle() {
    document.title = titleProject.textContent;
  },

  setupRangeSlider() {
    // стрелочная функция наследует this из setupRangeSlider (appData),
    // поэтому bind здесь не требуется
    inputTypeRange.addEventListener("input", (event) => {
      const val = event.target.value;
      rangeValueElement.textContent = val + "%";
      this.rollback = +val;
    });
  },

  start() {
    const hasValidScreen = Array.from(screens).some((screen) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      return select.value !== "" && input.value !== "";
    });

    if (!hasValidScreen) {
      alert("Пожалуйста, выберите тип экрана и укажите его количество хотя бы в одном блоке.");
      return;
    }

    this.addScreens();
    this.addServices();
    this.addPrices();

    this.showResult();
    this.lockInputs();
    this.toggleButtons(true);
  },

  showResult() {
    totalInputs.value = this.screenPrice;
    totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.fullPriceWithRollback;
    totalCount.value = this.totalCountAll;
  },

  addScreens() {
    screens = document.querySelectorAll(".screen");

    this.screens = [];
    this.totalCountAll = 0;

    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");

      if (select.value === "" || input.value === "") {
        return;
      }

      const selectName = select.options[select.selectedIndex].textContent;
      const count = +input.value;

      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: count,
      });

      this.totalCountAll += count;
    });
  },

  addServices() {
    percentItems.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    numberItems.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });

    this.addCmsPercent();
  },

  // считаем суммарный процент по отмеченным чекбоксам внутри hidden-cms-variants
  addCmsPercent() {
    this.cmsPercent = 0;

    cmsCheckboxes.forEach((checkbox) => {
      const value = +checkbox.value;

      if (checkbox.checked && !Number.isNaN(value) && value !== 0) {
        this.cmsPercent += value;
      }
    });
  },

  addScreenBlock() {
    const cloneScreen = screens[0].cloneNode(true);

    // на случай если клонируется уже заблокированный блок
    cloneScreen.querySelector("select").disabled = false;
    cloneScreen.querySelector("input").disabled = false;

    screens[screens.length - 1].after(cloneScreen);

    screens = document.querySelectorAll(".screen");
  },

  addPrices() {
    this.screenPrice = 0;
    this.servicePricesNumber = 0;
    this.servicePricesPercent = 0;
    this.cmsPrice = 0;
    this.fullPrice = 0;
    this.fullPriceWithRollback = 0;

    for (let screen of this.screens) {
      this.screenPrice += +screen.price;
    }

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

    // CMS-вариант (например WordPress, value="50") — это процент,
    // который ДОБАВЛЯЕТСЯ к уже посчитанной общей стоимости работы
    this.cmsPrice = this.fullPrice * (this.cmsPercent / 100);
    this.fullPrice += this.cmsPrice;

    this.fullPriceWithRollback = this.fullPrice - this.fullPrice * (this.rollback / 100);
  },

  // ----- блокировка / разблокировка левой части и переключение кнопок -----

  lockInputs() {
    const leftSideControls = document.querySelectorAll(
      '.screen select, .screen input[type="text"]'
    );

    leftSideControls.forEach((el) => {
      el.disabled = true;
    });

    plusButton.disabled = true;
  },

  unlockInputs() {
    const leftSideControls = document.querySelectorAll(
      '.screen select, .screen input[type="text"]'
    );

    leftSideControls.forEach((el) => {
      el.disabled = false;
    });

    plusButton.disabled = false;
  },

  toggleButtons(isCalculated) {
    if (isCalculated) {
      calculateButton.style.display = "none";
      resetButton.style.display = "";
    } else {
      resetButton.style.display = "none";
      calculateButton.style.display = "";
    }
  },

  // ----- сброс всего приложения в исходное состояние -----

  reset() {
    const allScreens = document.querySelectorAll(".screen");

    allScreens.forEach((screen, index) => {
      if (index === 0) {
        screen.querySelector("select").value = "";
        screen.querySelector("input").value = "";
      } else {
        screen.remove();
      }
    });

    screens = document.querySelectorAll(".screen");

    percentItems.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const input = item.querySelector("input[type=text]");
      check.checked = false;
      input.value = "";
    });

    numberItems.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const input = item.querySelector("input[type=text]");
      check.checked = false;
      input.value = "";
    });

    inputTypeRange.value = inputTypeRange.defaultValue;
    rangeValueElement.textContent = inputTypeRange.defaultValue + "%";

    // возвращаем блок с CMS-вариантами в исходное состояние
    cmsOpenCheckbox.checked = false;
    hiddenCmsVariants.style.display = "none";

    cmsSelect.value = "";
    cmsOtherInput.style.display = "none";

    const cmsOtherTextField = cmsOtherInput.querySelector("input");
    if (cmsOtherTextField) {
      cmsOtherTextField.value = "";
    }

    cmsCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    this.cmsPercent = 0;
    this.cmsPrice = 0;

    this.screens = [];
    this.screenPrice = 0;
    this.rollback = +inputTypeRange.defaultValue;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.fullPrice = 0;
    this.fullPriceWithRollback = 0;
    this.totalCountAll = 0;
    this.servicePercentPrice = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};

    totalInputs.value = "";
    totalCountOther.value = "";
    fullTotalCount.value = "";
    totalCountRollback.value = "";
    totalCount.value = "";

    this.unlockInputs();
    this.toggleButtons(false);
  },
};

appData.init();
