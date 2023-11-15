export class UiManager {
    constructor() {
        this.clickCount = 0
        this.click_counter = document.getElementById("click-counter");
        this.searchModal = document.getElementById("searchModal");
        this.introModal = document.getElementById("introModal");
        this.alertModal = document.getElementById("alertModal");
        this.delayedMessage = document.getElementById("delayedMessage");
        this.addClickEvent();
        this.addDelayedMessage();
    }

    addClickEvent() {
        document.body.addEventListener("click", () => {
            this.clickCount++;
            this.click_counter.textContent = `Kliknięcia: ${this.clickCount}`;

            if (this.clickCount === 30) {
                this.openAlertModal();
            }
        });

        window.onclick = (event) => {
            if (event.target === this.alertModal) {
                this.closeAlertModal();
            } else if (event.target === this.introModal) {
                this.closeIntroModal();
            } else if (event.target === this.searchModal) {
                this.closeSearchModal();
            }
        };
    }

    addDelayedMessage() {
        document.addEventListener("DOMContentLoaded", function () {
            setInterval(()=> {
                this.delayedMessage.classList.remove("hidden");

                setTimeout(function () {
                    this.delayedMessage.classList.add("hidden");
                }, 5000);
            }, 35000);
        });
    }

    openModal(modal) {
        modal.style.display = "block";
    }

    closeModal(modal) {
        modal.style.display = "none";
    }

    openSearchModal() {
        this.openModal(this.searchModal);
    }

    closeSearchModal() {
        this.closeModal(this.searchModal);
    }

    openIntroModal() {
        this.openModal(this.introModal);
    }

    closeIntroModal() {
        this.closeModal(this.introModal);
    }

    openAlertModal() {
        this.openModal(this.alertModal);
    }

    closeAlertModal() {
        this.closeModal(this.alertModal);
    }
}
