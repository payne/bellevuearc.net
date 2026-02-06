// Google Calendar Integration
let calendarConfig = null;

// Fetch calendar configuration
async function loadCalendarConfig() {
  try {
    const response = await fetch('/_data/google-calendar.json');
    calendarConfig = await response.json();
  } catch (error) {
    console.error('Error loading calendar config:', error);
  }
}

// Fetch events from Google Calendar API
async function fetchCalendarEvents() {
  if (!calendarConfig) {
    await loadCalendarConfig();
  }

  const now = new Date();
  const timeMin = now.toISOString();
  const timeMax = new Date(now.getTime() + (60 * 24 * 60 * 60 * 1000)).toISOString(); // 60 days from now

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarConfig.calendarId)}/events?key=${calendarConfig.apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime&maxResults=${calendarConfig.maxResults}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    displayError('Unable to load calendar events. Please check your API key and calendar ID.');
    return [];
  }
}

// Display error message
function displayError(message) {
  const upcomingEventsDiv = document.getElementById('upcoming-events');
  if (upcomingEventsDiv) {
    upcomingEventsDiv.innerHTML = `<div class="calendar-error">${message}</div>`;
  }
}

// Format date for display
function formatEventDate(event) {
  const start = event.start.dateTime || event.start.date;
  const end = event.end.dateTime || event.end.date;
  const startDate = new Date(start);
  const endDate = new Date(end);

  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  if (event.start.dateTime) {
    const timeOptions = { hour: 'numeric', minute: '2-digit' };
    const startTime = startDate.toLocaleTimeString('en-US', timeOptions);
    const endTime = endDate.toLocaleTimeString('en-US', timeOptions);
    return `${startDate.toLocaleDateString('en-US', options)} • ${startTime} - ${endTime}`;
  } else {
    // All-day event
    return `${startDate.toLocaleDateString('en-US', options)} • All Day`;
  }
}

// Render upcoming events
function renderUpcomingEvents(events) {
  const upcomingEventsDiv = document.getElementById('upcoming-events');
  if (!upcomingEventsDiv) return;

  if (events.length === 0) {
    upcomingEventsDiv.innerHTML = '<p class="no-events">No upcoming events in the next 60 days.</p>';
    return;
  }

  let html = '<div class="events-list">';

  events.forEach(event => {
    const title = event.summary || 'Untitled Event';
    const dateStr = formatEventDate(event);
    const description = event.description || '';
    const location = event.location || '';

    html += `
      <div class="event-item">
        <div class="event-date">${dateStr}</div>
        <div class="event-title">${escapeHtml(title)}</div>
        ${location ? `<div class="event-location">📍 ${escapeHtml(location)}</div>` : ''}
        ${description ? `<div class="event-description">${escapeHtml(description)}</div>` : ''}
      </div>
    `;
  });

  html += '</div>';
  upcomingEventsDiv.innerHTML = html;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Get events for a specific month
function getEventsForMonth(events, year, month) {
  return events.filter(event => {
    const start = event.start.dateTime || event.start.date;
    const eventDate = new Date(start);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month;
  });
}

// Render monthly calendar view
function renderMonthlyCalendar(events) {
  const calendarDiv = document.getElementById('monthly-calendar');
  if (!calendarDiv) return;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  let html = '';

  // Generate calendars for the next 2 months
  for (let i = 0; i < 2; i++) {
    const month = (currentMonth + i) % 12;
    const year = currentYear + Math.floor((currentMonth + i) / 12);
    html += generateCalendarMonth(events, year, month);
  }

  calendarDiv.innerHTML = html;
}

// Generate a single month calendar
function generateCalendarMonth(events, year, month) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDay.getDay();
  const monthLength = lastDay.getDate();

  const monthEvents = getEventsForMonth(events, year, month);
  const eventsByDay = {};
  monthEvents.forEach(event => {
    const start = event.start.dateTime || event.start.date;
    const day = new Date(start).getDate();
    if (!eventsByDay[day]) {
      eventsByDay[day] = [];
    }
    eventsByDay[day].push(event);
  });

  let html = `
    <div class="calendar-month">
      <h3 class="month-title">${monthNames[month]} ${year}</h3>
      <div class="calendar-grid">
  `;

  // Add day headers
  daysOfWeek.forEach(day => {
    html += `<div class="calendar-day-header">${day}</div>`;
  });

  // Add empty cells for days before the first of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    html += '<div class="calendar-day empty"></div>';
  }

  // Add days of the month
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const todayDate = today.getDate();

  for (let day = 1; day <= monthLength; day++) {
    const isToday = isCurrentMonth && day === todayDate;
    const hasEvents = eventsByDay[day] && eventsByDay[day].length > 0;
    const classes = ['calendar-day'];
    if (isToday) classes.push('today');
    if (hasEvents) classes.push('has-events');

    html += `
      <div class="${classes.join(' ')}">
        <div class="day-number">${day}</div>
        ${hasEvents ? `<div class="event-indicator">${eventsByDay[day].length}</div>` : ''}
      </div>
    `;
  }

  html += `
      </div>
    </div>
  `;

  return html;
}

// Initialize calendar on page load
document.addEventListener('DOMContentLoaded', async function() {
  // Only run on calendar page
  if (!document.getElementById('upcoming-events')) return;

  // Show loading message
  const upcomingEventsDiv = document.getElementById('upcoming-events');
  const calendarDiv = document.getElementById('monthly-calendar');

  if (upcomingEventsDiv) {
    upcomingEventsDiv.innerHTML = '<p class="loading">Loading events...</p>';
  }
  if (calendarDiv) {
    calendarDiv.innerHTML = '<p class="loading">Loading calendar...</p>';
  }

  // Fetch and display events
  const events = await fetchCalendarEvents();
  renderUpcomingEvents(events);
  renderMonthlyCalendar(events);
});
