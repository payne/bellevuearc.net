// Nets Data Integration
const NETS_JSON_URL = 'https://raw.githubusercontent.com/payne/ham-radio-data/refs/heads/main/nets.json';

// Fetch nets data from GitHub
async function fetchNetsData() {
  try {
    const response = await fetch(NETS_JSON_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching nets data:', error);
    displayNetsError('Unable to load nets data. Please try again later.');
    return null;
  }
}

// Display error message
function displayNetsError(message) {
  const netsContainer = document.getElementById('nets-container');
  if (netsContainer) {
    netsContainer.innerHTML = `<div class="nets-error">${message}</div>`;
  }
}

// Format frequency display
function formatFrequency(frequency, mode) {
  let display = frequency;
  if (mode) {
    display += ` (${mode})`;
  }
  return display;
}

// Render nets by day of week
function renderNets(netsData) {
  const netsContainer = document.getElementById('nets-container');
  if (!netsContainer) return;

  if (!netsData || !netsData.schedule) {
    displayNetsError('No nets data available.');
    return;
  }

  const daysOfWeek = [
    { key: 'sunday', label: 'Sunday' },
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' }
  ];

  let html = '<div class="nets-schedule">';

  daysOfWeek.forEach(day => {
    const dayNets = netsData.schedule[day.key] || [];

    html += `
      <div class="day-section">
        <h3 class="day-title">${day.label}</h3>
    `;

    if (dayNets.length === 0) {
      html += '<p class="no-nets">No nets scheduled</p>';
    } else {
      html += '<div class="nets-list">';

      dayNets.forEach(net => {
        const time = net.time || 'Time TBD';
        const frequency = formatFrequency(net.frequency || 'Freq TBD', net.mode);
        const type = net.type || '';
        const organization = net.organization || '';
        const callsign = net.repeater_callsign || '';

        html += `
          <div class="net-item">
            <div class="net-time">${escapeHtml(time)}</div>
            <div class="net-details">
              <div class="net-frequency">${escapeHtml(frequency)}</div>
              ${type ? `<div class="net-type">${escapeHtml(type)}</div>` : ''}
              ${organization ? `<div class="net-org">${escapeHtml(organization)}</div>` : ''}
              ${callsign ? `<div class="net-callsign">Repeater: ${escapeHtml(callsign)}</div>` : ''}
            </div>
          </div>
        `;
      });

      html += '</div>';
    }

    html += '</div>';
  });

  html += '</div>';
  netsContainer.innerHTML = html;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Get current day highlight
function highlightCurrentDay() {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = new Date().getDay();
  const todayName = days[today];

  const daySections = document.querySelectorAll('.day-section');
  daySections.forEach((section, index) => {
    if (index === today) {
      section.classList.add('current-day');
    }
  });
}

// Initialize nets on page load
document.addEventListener('DOMContentLoaded', async function() {
  // Only run on nets page
  if (!document.getElementById('nets-container')) return;

  // Show loading message
  const netsContainer = document.getElementById('nets-container');
  if (netsContainer) {
    netsContainer.innerHTML = '<p class="loading">Loading nets schedule...</p>';
  }

  // Fetch and display nets
  const netsData = await fetchNetsData();
  renderNets(netsData);

  // Highlight current day
  setTimeout(highlightCurrentDay, 100);
});
