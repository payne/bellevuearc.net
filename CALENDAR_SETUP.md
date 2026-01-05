# Google Calendar Setup Instructions

This document explains how to configure the Google Calendar integration for the AARC website.

## Prerequisites

1. A Google account
2. A Google Calendar with your events
3. A Google Cloud Platform project with the Google Calendar API enabled

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Enable the **Google Calendar API**:
   - In the Cloud Console, go to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click on it and then click "Enable"

## Step 2: Create an API Key

1. In the Cloud Console, go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the API key that is generated
4. (Recommended) Click "Restrict Key" to add restrictions:
   - Under "API restrictions", select "Restrict key"
   - Choose "Google Calendar API" from the dropdown
   - Under "Website restrictions", add your website domain

## Step 3: Make Your Calendar Public

1. Open Google Calendar
2. Find your calendar in the left sidebar
3. Click the three dots next to the calendar name
4. Select "Settings and sharing"
5. Scroll down to "Access permissions for events"
6. Check "Make available to public"
7. In the same settings page, scroll down to "Integrate calendar"
8. Copy the "Calendar ID" (it looks like: `your-calendar-id@group.calendar.google.com`)

## Step 4: Configure the Website

1. Open the file `src/_data/google-calendar.json`
2. Replace the placeholder values:

```json
{
  "calendarId": "your-actual-calendar-id@group.calendar.google.com",
  "apiKey": "YOUR_ACTUAL_API_KEY",
  "timeZone": "America/New_York",
  "maxResults": 50
}
```

### Configuration Options:

- **calendarId**: Your Google Calendar ID (from Step 3)
- **apiKey**: Your Google API key (from Step 2)
- **timeZone**: Your local timezone (e.g., "America/New_York", "America/Chicago", "America/Los_Angeles")
- **maxResults**: Maximum number of events to fetch (default: 50)

## Step 5: Add Events to Your Calendar

Add events to your Google Calendar with the following fields:

- **Title/Summary**: Event name
- **Date/Time**: When the event occurs
- **Location** (optional): Where the event takes place
- **Description** (optional): Additional details about the event

## Step 6: Rebuild the Site

After updating the configuration:

```bash
npm run build
```

## Features

The calendar integration provides:

### Upcoming Events List
- Shows all events in the next 60 days
- Displays event title, date/time, location, and description
- Automatically formatted dates and times

### Monthly Calendar View
- Displays the next 3 months
- Highlights today's date
- Shows event count on days with events
- Visual indicators for days with scheduled events

## Troubleshooting

### Events Not Showing

1. **Check API Key**: Make sure your API key is valid and has the Calendar API enabled
2. **Check Calendar ID**: Verify the calendar ID is correct
3. **Check Calendar Privacy**: Ensure the calendar is set to "Public"
4. **Check Browser Console**: Open browser developer tools and check for error messages

### Common Errors

- **403 Error**: API key restrictions are too strict or API not enabled
- **404 Error**: Calendar ID is incorrect or calendar doesn't exist
- **CORS Error**: This shouldn't happen with the Calendar API, but check your API restrictions

## Security Notes

- The API key and calendar ID are public in the built website
- Only use a restricted API key (restrict to Calendar API and your domain)
- Only make the specific calendar public that you want to display
- Never share private or sensitive information in public calendar events

## Testing Locally

To test the calendar locally, you can use a simple HTTP server:

```bash
# From the project root
cd _site
python3 -m http.server 8000
```

Then visit `http://localhost:8000/calendar/` in your browser.

## Additional Resources

- [Google Calendar API Documentation](https://developers.google.com/calendar/api/v3/reference)
- [API Key Best Practices](https://cloud.google.com/docs/authentication/api-keys)
