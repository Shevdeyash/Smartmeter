// appliances.js

// 0. Immediately bind sidebar toggle so it never gets blocked
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('sidebarToggle');
  const sidebar   = document.getElementById('sidebar');
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
    console.log('Sidebar toggle bound');
  } else {
    console.warn('Sidebar toggle or sidebar element not found');
  }
});

// 1. Initialize Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// 2. On DOM ready, set up the appliance UI
$(function() {
  const $list      = $("#applianceList");
  const $addBtn    = $("#addApplianceBtn");
  const $removeBtn = $("#removeApplianceBtn");

  if (!$list.length) {
    console.error("appliances.js: #applianceList not found, aborting.");
    return;
  }

  let applianceData = {};

  // 3. Render table rows
  function updateUI() {
    $list.empty();
    Object.entries(applianceData).forEach(([name, state]) => {
      const isOn = state === "1";
      const row = $(`
        <tr>
          <td><input type="checkbox" class="select-appliance" data-id="${name}"></td>
          <td>${name}</td>
          <td><span class="status ${isOn ? 'on' : 'off'}">
                ${isOn ? 'ON' : 'OFF'}
              </span></td>
          <td>
            <button class="toggle-btn" data-id="${name}">
              ${isOn ? 'Turn Off' : 'Turn On'}
            </button>
          </td>
        </tr>
      `);
      $list.append(row);
    });
  }

  // 4. Listen for Firebase changes
  database.ref().on("value", snap => {
    applianceData = snap.val() || {};
    updateUI();
  }, err => console.error("Firebase read error:", err));

  // 5. Toggle one appliance
  $list.on("click", ".toggle-btn", function() {
    const key = $(this).data("id");
    const next = (applianceData[key] === "1" ? "0" : "1");
    database.ref(key).set(next)
      .catch(e => console.error(`Failed to toggle ${key}:`, e));
  });

  // 6. Add new appliance
  $addBtn.on("click", () => {
    const name = prompt("Enter a unique appliance name:");
    if (!name) return;
    if (applianceData.hasOwnProperty(name)) {
      alert("That appliance already exists!");
      return;
    }
    database.ref(name).set("0")
      .then(() => console.log(`Added ${name}`))
      .catch(e => console.error(`Failed to add ${name}:`, e));
  });

  // 7. Remove selected appliances
  $removeBtn.on("click", () => {
    $(".select-appliance:checked").each(function() {
      const key = $(this).data("id");
      database.ref(key).remove()
        .then(() => console.log(`Removed ${key}`))
        .catch(e => console.error(`Failed to remove ${key}:`, e));
    });
  });
});
