---
layout: base.njk
title: About Us
permalink: /about/
---


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


