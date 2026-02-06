---
layout: base.njk
title: Welcome
---

## Welcome to the Aksarben Amateur Radio Club (AARC) fan site

This site is a suplement to [Ak-Sar-Ben Amateur Radio Club](https://www.aksarbenarc.org/home) official website.

### What We Do

- **Monthly Meetings**: 
  * Meetings are open to the public and are held on the second Friday of most months at the [American Red Cross, 2912 S 80th Ave Omaha, NE](https://maps.app.goo.gl/Xe3JpAe12gfF9BQp8). Park and enter on the west side of the building.   
    * Meetings start at 7 pm.  
    * Technical presentation and disussion starts at 7:30 pm.
  * Board meetings are open to the public.  
    * 6 pm on the last Tuesday of each month 
    * 76th & Cass St. Hy-Vee in the Cafe 

### Quick Links

- Check out our [Meetings](/meetings/) page for upcoming meeting schedules
- Learn more [About Us](/about/) about this fan site
- Find local [Ham-Fests](/hamfests/) and events
- Discover [Area NETs](/nets/) you can join
- Browse [Area Repeaters](/repeaters/) for frequency information
- View our [Calendar](/calendar/) for all upcoming events

### Club Board

**{{ organizers.president.job }}**: {{ organizers.president.name }}, {{ organizers.president.callsign }}

**{{ organizers.vicePresident.job }}**: {{ organizers.vicePresident.name }}, {{ organizers.vicePresident.callsign }}

**{{ organizers.secretary.job }}**: {{ organizers.secretary.name }}, {{ organizers.secretary.callsign }}

**{{ organizers.treasurer.job }}**: {{ organizers.treasurer.name }}, {{ organizers.treasurer.callsign }}

### Board Members

{% for member in organizers.boardMembers %}
**{{ member.name }}**, {{ member.callsign }}
*{{ member.job }}*
{% endfor %}


### Join us!  Send in your [membership form](https://www.aksarbenarc.org/home/phocadownload/Membership/2026MembershipForm.pdf)

---

*73 and see you on the air!*

