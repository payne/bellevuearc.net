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

// Store repeater data by band for sorting
let repeatersByBand = {};

// Render repeaters by band
function renderRepeaters(repeatersData) {
  const repeatersContainer = document.getElementById('repeaters-container');
  if (!repeatersContainer) return;

  if (!repeatersData || !repeatersData.repeaters) {
    displayRepeatersError('No repeaters data available.');
    return;
  }

  repeatersByBand = groupRepeatersByBand(repeatersData.repeaters);
  const bandNames = {
    '2m': '2 Meter Band (144-148 MHz)',
    '1.25m': '1.25 Meter Band (222-225 MHz)',
    '70cm': '70 Centimeter Band (420-450 MHz)',
    '23cm': '23 Centimeter Band (1240-1300 MHz)'
  };

  let html = '<div class="repeaters-by-band">';

  Object.keys(bandNames).forEach(band => {
    const repeaters = repeatersByBand[band];
    if (repeaters.length === 0) return;

    html += `
      <div class="band-section" data-band="${band}">
        <h3 class="band-title">${bandNames[band]}</h3>
        <div class="repeaters-table-container">
          <table class="repeaters-table sortable-table">
            <thead>
              <tr>
                <th class="sortable" data-column="output_freq" data-type="number">Output <span class="sort-arrow"></span></th>
                <th class="sortable" data-column="input_freq" data-type="number">Input <span class="sort-arrow"></span></th>
                <th class="sortable" data-column="offset" data-type="string">Offset <span class="sort-arrow"></span></th>
                <th class="sortable" data-column="tones" data-type="string">Tones (UL/DL) <span class="sort-arrow"></span></th>
                <th class="sortable" data-column="callsign" data-type="string">Callsign <span class="sort-arrow"></span></th>
                <th class="sortable" data-column="location" data-type="string">Location <span class="sort-arrow"></span></th>
                <th class="sortable" data-column="modes" data-type="string">Modes <span class="sort-arrow"></span></th>
              </tr>
            </thead>
            <tbody>
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

  // Render table rows for each band
  Object.keys(bandNames).forEach(band => {
    if (repeatersByBand[band].length > 0) {
      renderTableRows(band, repeatersByBand[band]);
    }
  });

  // Add sort event listeners
  addSortEventListeners();
}

// Render table rows for a specific band
function renderTableRows(band, repeaters) {
  const bandSection = document.querySelector(`.band-section[data-band="${band}"]`);
  if (!bandSection) return;

  const tbody = bandSection.querySelector('tbody');
  if (!tbody) return;

  let html = '';
  repeaters.forEach(repeater => {
    const upTone = repeater.uplink_tone || '-';
    const downTone = repeater.downlink_tone || '-';
    const tones = (upTone === '-' && downTone === '-') ? 'None' : `${upTone}/${downTone}`;

    html += `
      <tr>
        <td class="freq-output" data-value="${repeater.output_freq}">${escapeHtml(repeater.output_freq)}</td>
        <td class="freq-input" data-value="${repeater.input_freq}">${escapeHtml(repeater.input_freq)}</td>
        <td class="offset" data-value="${repeater.offset}">${escapeHtml(repeater.offset)}</td>
        <td class="tones" data-value="${tones}">${escapeHtml(tones)}</td>
        <td class="callsign" data-value="${repeater.callsign}">${escapeHtml(repeater.callsign)}</td>
        <td class="location" data-value="${repeater.location}">${escapeHtml(repeater.location)}</td>
        <td class="modes" data-value="${repeater.modes}">${escapeHtml(repeater.modes)}</td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

// Add event listeners for sorting
function addSortEventListeners() {
  const sortableHeaders = document.querySelectorAll('.sortable');

  sortableHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const column = this.getAttribute('data-column');
      const type = this.getAttribute('data-type');
      const table = this.closest('table');
      const bandSection = this.closest('.band-section');
      const band = bandSection.getAttribute('data-band');

      // Determine sort direction
      const currentSort = this.getAttribute('data-sort');
      const newSort = currentSort === 'asc' ? 'desc' : 'asc';

      // Remove sort indicators from all headers in this table
      table.querySelectorAll('.sortable').forEach(h => {
        h.removeAttribute('data-sort');
        h.classList.remove('sort-asc', 'sort-desc');
      });

      // Add sort indicator to clicked header
      this.setAttribute('data-sort', newSort);
      this.classList.add(`sort-${newSort}`);

      // Sort the data
      sortTable(band, column, type, newSort);
    });
  });
}

// Sort table data
function sortTable(band, column, type, direction) {
  const repeaters = [...repeatersByBand[band]];

  repeaters.sort((a, b) => {
    let aVal, bVal;

    if (column === 'tones') {
      // Special handling for tones column
      const aUpTone = a.uplink_tone || '-';
      const aDownTone = a.downlink_tone || '-';
      aVal = (aUpTone === '-' && aDownTone === '-') ? 'None' : `${aUpTone}/${aDownTone}`;

      const bUpTone = b.uplink_tone || '-';
      const bDownTone = b.downlink_tone || '-';
      bVal = (bUpTone === '-' && bDownTone === '-') ? 'None' : `${bUpTone}/${bDownTone}`;
    } else {
      aVal = a[column] || '';
      bVal = b[column] || '';
    }

    let comparison = 0;

    if (type === 'number') {
      comparison = parseFloat(aVal) - parseFloat(bVal);
    } else {
      comparison = aVal.toString().localeCompare(bVal.toString());
    }

    return direction === 'asc' ? comparison : -comparison;
  });

  // Re-render the table rows with sorted data
  renderTableRows(band, repeaters);
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
