---
layout: base.njk
title: Bellevue Amateur Radio Club (BARC) fan site
---

{% include "next_meeting.njk" %}

This site is a supplement to [Bellevue Amateur Radio Club](https://www.BellevueARC.org/home) official website.

- **Monthly Meetings**: 
  * Meetings are open to the public and are held on the third Thursday of most months at the the Masonic Lodge dining Hall (1910 Franklin St., Bellevue, NE).
    * Doors open at 7 pm.  
    * Meetings start at at 7:30 pm.  

### Quick Links

- Check out our [Meetings](/meetings/) page for upcoming meeting schedules
- Learn more [About Us](/about/) about this fan site
- Find local [Ham-Fests](/hamfests/) and events
- Discover [Area NETs](/nets/) you can join
- Browse [Area Repeaters](/repeaters/) for frequency information
- View our [Calendar](/calendar/) for all upcoming events

### Club Board

**{{ organizers.president.job }}**: {{ organizers.president.name }}, [{{ organizers.president.callsign }}](https://qrz.com/db/{{ organizers.president.callsign | downcase }})

**{{ organizers.vicePresident.job }}**: {{ organizers.vicePresident.name }}, [{{ organizers.vicePresident.callsign }}](https://qrz.com/db/{{ organizers.vicePresident.callsign | downcase }})

**{{ organizers.secretary.job }}**: {{ organizers.secretary.name }}, [{{ organizers.secretary.callsign }}](https://qrz.com/db/{{ organizers.secretary.callsign | downcase }})

**{{ organizers.treasurer.job }}**: {{ organizers.treasurer.name }}, [{{ organizers.treasurer.callsign }}](https://qrz.com/db/{{ organizers.treasurer.callsign | downcase }})

### Board Members

{% for member in organizers.boardMembers %}
**{{ member.name }}**, [{{ member.callsign }}](https://qrz.com/db/{{ member.callsign | downcase }})
*{{ member.job }}*
{% endfor %}


### Join us!  Send in your [membership form](http://bellevuearc.org/docs/barc_membership.pdf)

---

*73 and see you on the air!*

