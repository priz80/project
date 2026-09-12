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
  init: function () {
    appData.addTitle();
    appData.setupRangeSlider();
    
    calculateButton.addEventListener("click", appData.start);
    plusButton.addEventListener("click", appData.addScreenBlock);
  },

  addTitle: function () {
    document.title = titleProject.textContent;
  },

  setupRangeSlider: function () {
    inputTypeRange.addEventListener('input', function() {
      const val = this.value;
      rangeValueElement.textContent = val + '%';
      appData.rollback = +val;
    });
  },

  start: function () {
    const hasValidScreen = Array.from(screens).some(screen => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      return select.value !== "" && input.value !== "";
    });

    if (!hasValidScreen) {
      alert("Пожалуйста, выберите тип экрана и укажите его количество хотя бы в одном блоке.");
      return;
    }

    appData.addScreens();
    appData.addServices();
    appData.addPrices();

    appData.showResult();
  },
  
  showResult: function () {
    totalInputs.value = appData.screenPrice;
    totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    totalCountRollback.value = appData.fullPriceWithRollback;
    totalCount.value = appData.totalCountAll;
  },

  addScreens: function () {
    screens = document.querySelectorAll(".screen");

    appData.screens = [];
    appData.totalCountAll = 0;

    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      
      if (select.value === "" || input.value === "") {
        return;
      }

      const selectName = select.options[select.selectedIndex].textContent;
      const count = +input.value;
      
      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: count
      });
      
      appData.totalCountAll += count;
    });
  },

  addServices: function () {
    percentItems.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    numberItems.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);

    screens[screens.length - 1].after(cloneScreen);
  },

  addPrices: function () {
    appData.screenPrice = 0;
    appData.servicePricesNumber = 0;
    appData.servicePricesPercent = 0;
    appData.fullPrice = 0;
    appData.fullPriceWithRollback = 0;

    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }
    
    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;

    appData.fullPriceWithRollback = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
  },
};

appData.init();