const navLinks = document.querySelectorAll("[data-page]");
const pageSections = document.querySelectorAll(".page");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-links");
const API_URL = "http://localhost:5000";

function showPage(pageId) {
  pageSections.forEach((section) => {
    section.classList.toggle("active", section.id === pageId);
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.page === pageId);
  });

  navMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

navLinks.forEach((item) => {
  item.addEventListener("click", () => {
    showPage(item.dataset.page);
  });
});

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.getElementById("donorForm").addEventListener("submit", async function (event) {
  event.preventDefault();
  const message = document.getElementById("donorMessage");
  message.textContent = "Saving donor...";

  const donorData = {
    name: document.getElementById("donorName").value,
    age: Number(document.getElementById("donorAge").value),
    bloodGroup: document.getElementById("donorBloodGroup").value,
    city: document.getElementById("donorCity").value,
    phone: document.getElementById("donorPhone").value,
    availability: true
  };

  try {
    const response = await fetch(`${API_URL}/api/donors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(donorData)
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to register donor");
    }

    message.textContent = "Donor registered successfully.";
    this.reset();
  } catch (error) {
    message.textContent = error.message;
  }
});

document.getElementById("requestForm").addEventListener("submit", async function (event) {
  event.preventDefault();
  const message = document.getElementById("requestMessage");
  message.textContent = "Submitting request...";

  const requestData = {
    patientName: document.getElementById("patientName").value,
    bloodGroup: document.getElementById("requestBloodGroup").value,
    hospital: document.getElementById("hospital").value,
    city: document.getElementById("requestCity").value,
    contact: document.getElementById("requestContact").value
  };

  try {
    const response = await fetch(`${API_URL}/api/requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to submit blood request");
    }

    message.textContent = "Blood request submitted successfully.";
    this.reset();
  } catch (error) {
    message.textContent = error.message;
  }
});

document.getElementById("searchButton").addEventListener("click", async () => {
  const group = document.getElementById("bloodGroup").value;
  const city = document.getElementById("searchCity").value.trim();
  const result = document.getElementById("searchResult");
  const donorList = document.getElementById("donorList");
  donorList.innerHTML = "";

  if (!group || !city) {
    result.textContent = "Please select a blood group and enter city.";
    return;
  }

  result.textContent = "Searching donors...";

  try {
    const query = new URLSearchParams({
      bloodGroup: group,
      city
    });
    const response = await fetch(`${API_URL}/api/donors/search?${query}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to search donors");
    }

    if (data.count === 0) {
      result.textContent = "No available donors found.";
      return;
    }

    result.textContent = `${data.count} available donor(s) found.`;
    donorList.innerHTML = data.donors
      .map((donor) => (
        `<article class="donor-item">
          <strong>${donor.name}</strong>
          <span>${donor.bloodGroup} | ${donor.city}</span>
          <span>Phone: ${donor.phone}</span>
        </article>`
      ))
      .join("");
  } catch (error) {
    result.textContent = error.message;
  }
});
