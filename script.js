let data = JSON.parse(localStorage.getItem("iasData")) || [];

const tableBody = document.getElementById("tableBody");
const alertBox = document.getElementById("alert");
const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d");

function addEntry() {
    const date = document.getElementById("date").value;
    const hours = Number(document.getElementById("hours").value);
    const subject = document.getElementById("subject").value;

    if (!date) {
        showAlert("⚠️ Please select a date");
        return;
    }

    const status = hours > 0 ? "Studied ✅" : "Missed ❌";

    data.push({ date, hours, subject, status });
    localStorage.setItem("iasData", JSON.stringify(data));

    showAlert("Saved successfully ✅", false);
    renderTable();
    drawGraph();
}

function renderTable() {
    tableBody.innerHTML = "";
    data.forEach(d => {
        const row = `<tr>
            <td>${d.date}</td>
            <td>${d.hours}</td>
            <td>${d.subject}</td>
            <td>${d.status}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function showAlert(message, error = true) {
    alertBox.textContent = message;
    alertBox.classList.remove("hidden");
    alertBox.style.background = error ? "#ffcccb" : "#c8e6c9";
    setTimeout(() => alertBox.classList.add("hidden"), 3000);
}

// Simple graph
function drawGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const maxHours = 10;
    const barWidth = 30;
    const gap = 10;

    data.forEach((d, i) => {
        const height = (d.hours / maxHours) * 150;
        ctx.fillStyle = d.hours === 0 ? "red" : "green";
        ctx.fillRect(i * (barWidth + gap), 180 - height, barWidth, height);
    });
}

// Missed day check
(function checkToday() {
    const today = new Date().toISOString().split("T")[0];
    const found = data.find(d => d.date === today);

    if (!found) {
        showAlert("🚨 You have not logged today’s IAS study!");
    }
})();

renderTable();
drawGraph();
