// Repeaters Data Integration

// Fetch repeaters data from JSON file
async function fetchRepeatersData() {
  try {
    const response = await fetch('/_data/repeaters.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching repeaters data:', error);
    displayRepeatersError('Unable to load repeaters data. Please try again later.');
    return null;
  }
}

// Display error message
function displayRepeatersError(message) {
  const repeatersContainer = document.getElementById('repeaters-container');
  if (repeatersContainer) {
    repeatersContainer.innerHTML = `<div class="repeaters-error">${message}</div>`;
  }
}

// Format frequency for display
function formatFrequency(freq) {
  return `${freq} MHz`;
}

// Format tone for display
function formatTone(tone) {
  return tone ? `${tone} Hz` : 'None';
}

// Group repeaters by band
function groupRepeatersByBand(repeaters) {
  const bands = {
    '2m': [],
    '1.25m': [],
    '70cm': [],
    '23cm': []
  };

  repeaters.forEach(repeater => {
    const freq = parseFloat(repeater.output_freq);
    if (freq >= 144 && freq < 148) {
      bands['2m'].push(repeater);
    } else if (freq >= 222 && freq < 225) {
      bands['1.25m'].push(repeater);
    } else if (freq >= 420 && freq < 450) {
      bands['70cm'].push(repeater);
    } else if (freq >= 1240 && freq < 1300) {
      bands['23cm'].push(repeater);
    }
  });

  return bands;
}

// Render repeaters by band
function renderRepeaters(repeatersData) {
  const repeatersContainer = document.getElementById('repeaters-container');
  if (!repeatersContainer) return;

  if (!repeatersData || !repeatersData.repeaters) {
    displayRepeatersError('No repeaters data available.');
    return;
  }

  const bandedRepeaters = groupRepeatersByBand(repeatersData.repeaters);
  const bandNames = {
    '2m': '2 Meter Band (144-148 MHz)',
    '1.25m': '1.25 Meter Band (222-225 MHz)',
    '70cm': '70 Centimeter Band (420-450 MHz)',
    '23cm': '23 Centimeter Band (1240-1300 MHz)'
  };

  let html = '<div class="repeaters-by-band">';

  Object.keys(bandNames).forEach(band => {
    const repeaters = bandedRepeaters[band];
    if (repeaters.length === 0) return;

    html += `
      <div class="band-section">
        <h3 class="band-title">${bandNames[band]}</h3>
        <div class="repeaters-table-container">
          <table class="repeaters-table">
            <thead>
              <tr>
                <th>Output</th>
                <th>Input</th>
                <th>Offset</th>
                <th>Tones (UL/DL)</th>
                <th>Callsign</th>
                <th>Location</th>
                <th>Modes</th>
              </tr>
            </thead>
            <tbody>
    `;

    repeaters.forEach(repeater => {
      const upTone = repeater.uplink_tone || '-';
      const downTone = repeater.downlink_tone || '-';
      const tones = (upTone === '-' && downTone === '-') ? 'None' : `${upTone}/${downTone}`;

      html += `
        <tr>
          <td class="freq-output">${escapeHtml(repeater.output_freq)}</td>
          <td class="freq-input">${escapeHtml(repeater.input_freq)}</td>
          <td class="offset">${escapeHtml(repeater.offset)}</td>
          <td class="tones">${escapeHtml(tones)}</td>
          <td class="callsign">${escapeHtml(repeater.callsign)}</td>
          <td class="location">${escapeHtml(repeater.location)}</td>
          <td class="modes">${escapeHtml(repeater.modes)}</td>
        </tr>
      `;
    });

    html += `
            </tbody>
          </table>
        </div>
      </div>
    `;
  });

  html += '</div>';

  // Add summary
  const totalCount = repeatersData.repeaters.length;
  html = `<div class="repeaters-summary">Found ${totalCount} repeaters in the area</div>` + html;

  repeatersContainer.innerHTML = html;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initialize repeaters on page load
document.addEventListener('DOMContentLoaded', async function() {
  // Only run on repeaters page
  if (!document.getElementById('repeaters-container')) return;

  // Show loading message
  const repeatersContainer = document.getElementById('repeaters-container');
  if (repeatersContainer) {
    repeatersContainer.innerHTML = '<p class="loading">Loading repeaters data...</p>';
  }

  // Fetch and display repeaters
  const repeatersData = await fetchRepeatersData();
  renderRepeaters(repeatersData);
});
