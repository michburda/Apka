import { Countdown } from "./countdown.js";
import { Calendar } from "./calendar.js";
import { Clock } from "./clock.js";
import { DataListManager } from "./data_manager.js";
import { UiManager } from "./ui_manager.js";

class App {
  constructor() {
    this.dataListManager = new DataListManager("dataList");
    this.uiManager = new UiManager();
    this.countdown = new Countdown("countdown");
    this.clock = new Clock("clock")
    this.calendar = new Calendar("calendarContainer");
  }

  start() {
    this.clock.start();
    this.countdown.startCountdown();
    this.add_listeners();
  }

  add_listeners() {
    document.addEventListener("DOMContentLoaded", () => {
      let sendButton = document.getElementById("sendOpinionButton");
      sendButton.addEventListener("click", () => {
        alert("Pamiętaj Twoja opinia może być krzywdząca i nieobiektywna");
      });

      let searchButton = document.getElementById("search_button");
      searchButton.addEventListener("click", () => {
        this.uiManager.openSearchModal();
      });

      let searchModalButton = document.getElementById("search_modal_button");
      searchModalButton.addEventListener("click", () => {
        this.dataListManager.searchData();
        this.uiManager.closeSearchModal();
      });

      let fetchAllButton = document.getElementById("fetch_all_button");
      fetchAllButton.addEventListener("click", () => {
        this.dataListManager.getData();
      });

      let clearButton = document.getElementById("clear_button");
      clearButton.addEventListener("click", () => {
        this.dataListManager.clearData();
      });

      let addMoreButton = document.getElementById("add_more_button");
      addMoreButton.addEventListener("click", () => {
        this.dataListManager.addOneMoreData();
      });

      let introModalButton = document.getElementById("intro_button");
      introModalButton.addEventListener("click", () => {
        this.uiManager.openIntroModal();
      });

      let getVariantButton = document.getElementById("get_variant_button");
      getVariantButton.addEventListener("click", () => {
        this.dataListManager.getDataWithVariant();
      });

      let closeAlertModalButton = document.querySelector("#alertModal .close");
      closeAlertModalButton.addEventListener("click", () => {
        this.uiManager.closeAlertModal();
      });

      let closeIntroButton = document.querySelector("#introModal .close");
      closeIntroButton.addEventListener("click", () => {
        this.uiManager.closeIntroModal();
      });

      let closeSearchButton = document.querySelector("#searchModal .close");
      closeSearchButton.addEventListener("click", () => {
        this.uiManager.closeSearchModal();
      });
    });
  }
}

let app = new App();
app.start();
