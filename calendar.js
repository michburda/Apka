export class Calendar {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.today = new Date();
        this.month = this.today.getMonth();
        this.year = this.today.getFullYear();
        this.days = ["Nie", "Pon", "Wto", "Śro", "Czw", "Pią", "Sob"];
        this.init();
    }

    init() {
        const firstDayOfMonth = new Date(this.year, this.month, 1);
        const lastDayOfMonth = new Date(this.year, this.month + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();
        const startingDay = firstDayOfMonth.getDay();

        const table = document.createElement("table");
        this.createHeaderRow(table);
        this.createDateCells(table, daysInMonth, startingDay);

        this.container.appendChild(table);
    }

    createHeaderRow(table) {
        const headerRow = document.createElement("tr");
        this.days.forEach(day => {
            const headerCell = document.createElement("th");
            headerCell.textContent = day;
            headerRow.appendChild(headerCell);
        });
        table.appendChild(headerRow);
    }

    createDateCells(table, daysInMonth, startingDay) {
        const todayDate = this.today.getDate();
        let date = 1;

        for (let i = 0; i < 6; i++) {
            const weekRow = document.createElement("tr");
            for (let j = 0; j < 7; j++) {
                const dateCell = document.createElement("td");
                if ((i === 0 && j < startingDay) || date > daysInMonth) {
                    weekRow.appendChild(dateCell);
                } else {
                    dateCell.textContent = date;

                    if (date === todayDate && this.month === this.today.getMonth() && this.year === this.today.getFullYear()) {
                        dateCell.classList.add("today");
                    }

                    weekRow.appendChild(dateCell);
                    date++;
                }
            }
            table.appendChild(weekRow);
        }
    }
}