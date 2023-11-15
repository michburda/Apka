export class Countdown {
    constructor(elementId) {
        this.countdownElement = document.getElementById(elementId);
        this.startCountdown();
    }

    startCountdown() {
        setInterval(()=>this.updateCountdown(), 1000);
    }

    updateCountdown() {
        const now = new Date();
        const currentDay = now.getDay();

        const targetDay = currentDay >= 6 ? 13 - currentDay : 6 - currentDay;
        const targetDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + targetDay,
            0,
            0,
            0
        );

        const diff = targetDate - now;

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        this.countdownElement.textContent = `${hours
            .toString()
            .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
                .toString()
                .padStart(2, "0")}`;
    }
}