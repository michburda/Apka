export class Clock {
    constructor(elementId) {
        this.clock = document.getElementById(elementId);
    }

    start() {
        setInterval(() => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, "0");
            const minutes = String(now.getMinutes()).padStart(2, "0");
            const seconds = String(now.getSeconds()).padStart(2, "0");
            this.clock.textContent = `${hours}:${minutes}:${seconds}`;
          }, 1000);
    }
}
