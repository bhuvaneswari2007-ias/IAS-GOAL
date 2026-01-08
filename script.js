let data = JSON.parse(localStorage.getItem("iasData")) || [];

function addEntry() {
    const date = document.getElementById("date").value;
    const hours = Number(document.getElementById("hours").value);
    const subject = document.getElementById("subject").value;

    if (!date) {
        alert("Please select date");
        return;
    }

    const status = hours > 0 ? "Studied ✅" : "Missed ❌";

    data.push({ date, hours, subject, status });
    localStorage.setItem("iasData", JSON.stringify(data));

    alert("Saved successfully ✅");
}

function loadRecords() {
    const tableBody = document.getElementById("tableBody");
    if (!tableBody) return;

    tableBody.innerHTML = "";
    data.forEach(d => {
        tableBody.innerHTML += `
        <tr>
            <td>${d.date}</td>
            <td>${d.hours}</td>
            <td>${d.subject}</td>
            <td>${d.status}</td>
        </tr>`;
    });
}

loadRecords();
