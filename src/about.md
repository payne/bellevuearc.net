---
layout: base.njk
title: About Us
permalink: /about/
---


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


