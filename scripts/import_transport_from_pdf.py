#!/usr/bin/env python3
"""
Import transport operators from the Northern Norway Transport Directory PDF
into travel-transport.json.

Data is manually structured from the PDF research document:
  Research/Travel/Northern Norway Transport Directory.pdf

All entries land as status: "published" by default.
Re-running is safe: existing entries are skipped by ID match.

Usage:
    python scripts/import_transport_from_pdf.py
    python scripts/import_transport_from_pdf.py --dry-run
    python scripts/import_transport_from_pdf.py --status draft
"""

import json
import os
import argparse
from datetime import datetime, timezone


def slugify(text: str) -> str:
    """Convert text to URL-friendly slug."""
    import re
    text = text.lower().strip()
    text = re.sub(r'[àáâãäå]', 'a', text)
    text = re.sub(r'[èéêë]', 'e', text)
    text = re.sub(r'[ìíîï]', 'i', text)
    text = re.sub(r'[òóôõöø]', 'o', text)
    text = re.sub(r'[ùúûü]', 'u', text)
    text = re.sub(r'[ýÿ]', 'y', text)
    text = re.sub(r'[^a-z0-9]+', '-', text)
    text = text.strip('-')
    return text


def build_transport_entries():
    """Build all transport entries from PDF research data."""
    entries = []

    # ═══════════════════════════════════════════════════════════
    # REGIONAL AVIATION
    # ═══════════════════════════════════════════════════════════

    entries.append({
        "name": "Wideroe - Regional Flights Across Northern Norway",
        "description": "Wideroe operates over 400 daily departures to 49 destinations with a fleet of 48 aircraft, predominantly De Havilland Dash 8 turboprops engineered for short-runway operations. Serves 24 airports across Northern Norway including Tromsoe, Bodoe, Alta, Kirkenes, and Svolveer. Around 40% of routes are government-subsidized PSO contracts ensuring remote community connectivity.",
        "destination": "northern-norway",
        "location": "Tromsoe, Bodoe, Alta, Kirkenes, Svolveer and 19 more airports",
        "priceRange": "varies",
        "website": "https://www.wideroe.no/en",
        "transportType": "fly",
        "operator": "Wideroe",
        "routeFrom": "Multiple Northern Norway airports",
        "routeTo": "Multiple Northern Norway airports",
        "duration": "30 min - 2 hours depending on route",
        "frequency": "Multiple daily departures per route",
        "bookingUrl": "https://www.wideroe.no/en",
        "isEcoFriendly": False,
        "seasonalAvailability": "Year-round",
    })

    # ═══════════════════════════════════════════════════════════
    # COASTAL EXPRESS (KYSTRUTEN)
    # ═══════════════════════════════════════════════════════════

    entries.append({
        "name": "Hurtigruten - Bergen to Kirkenes Coastal Express",
        "description": "The historic coastal route operator since 1893, sailing seven of the eleven ships on the Bergen-Kirkenes corridor. Calls at 34 ports, 25 above the Arctic Circle. Combines passenger transport with freight logistics. Fleet transitioning to hybrid technology with a target of zero emissions by 2030.",
        "destination": "northern-norway",
        "location": "34 ports, Bergen to Kirkenes",
        "priceRange": "luxury",
        "website": "https://www.hurtigruten.com/",
        "transportType": "ferry",
        "operator": "Hurtigruten",
        "routeFrom": "Bergen",
        "routeTo": "Kirkenes",
        "duration": "12 days (full voyage), shorter port-to-port segments available",
        "frequency": "Daily departures northbound and southbound",
        "bookingUrl": "https://www.hurtigruten.com/",
        "isEcoFriendly": False,
        "seasonalAvailability": "Year-round",
    })

    entries.append({
        "name": "Havila Voyages - Bergen to Kirkenes Coastal Express",
        "description": "Four purpose-built next-generation vessels equipped with the world's largest marine battery packs. Can navigate UNESCO-protected fjords silently with zero emissions for up to four hours. Batteries recharged with clean hydropower, supplemented by LNG reducing CO2 by 25%. Capacity for 172 day-passengers and 468 berth passengers. Offers a Northern Lights Promise: free subsequent voyage if aurora is not sighted.",
        "destination": "northern-norway",
        "location": "34 ports, Bergen to Kirkenes",
        "priceRange": "luxury",
        "website": "https://www.havilavoyages.com/",
        "transportType": "ferry",
        "operator": "Havila Voyages",
        "routeFrom": "Bergen",
        "routeTo": "Kirkenes",
        "duration": "12 days (full voyage), shorter port-to-port segments available",
        "frequency": "Daily departures shared with Hurtigruten",
        "bookingUrl": "https://www.havilavoyages.com/",
        "isEcoFriendly": True,
        "seasonalAvailability": "Year-round",
    })

    # ═══════════════════════════════════════════════════════════
    # REGIONAL EXPRESS BOATS AND FERRIES
    # ═══════════════════════════════════════════════════════════

    entries.append({
        "name": "Norled - Tromsoe to Harstad Express Boat",
        "description": "High-speed catamaran service connecting Tromsoe, Finnsnes, and Harstad across 144 km. Averages 2 hours 55 minutes for the direct journey. Up to four daily departures with stops at Engenes and Broestadbotn. Functions as a high-speed commuter equivalent for the maritime region. Fleet of 80 vessels, over 1,000 personnel.",
        "destination": "northern-norway",
        "location": "Tromsoe - Finnsnes - Harstad",
        "priceRange": "mid-range",
        "website": "https://www.norled.no/en/",
        "transportType": "ferry",
        "operator": "Norled AS",
        "routeFrom": "Tromsoe",
        "routeTo": "Harstad",
        "duration": "2 hours 55 minutes (direct)",
        "frequency": "Up to 4 daily departures",
        "bookingUrl": "https://www.norled.no/en/",
        "isEcoFriendly": False,
        "seasonalAvailability": "Year-round",
    })

    entries.append({
        "name": "Torghatten Nord - Bodoe to Lofoten Ferry",
        "description": "Operates the critical open-ocean connection across the Vestfjorden, linking mainland Bodoe to the Lofoten islands of Vaeroy, Roest, and Moskenes. Also manages the Bognes-Loedingen corridor, a vital artery for road traffic bypassing the fjords. Corporate history dating back to 1878.",
        "destination": "lofoten",
        "location": "Bodoe - Moskenes, Bognes - Loedingen",
        "priceRange": "mid-range",
        "website": "https://www.torghatten-nord.no/",
        "transportType": "ferry",
        "operator": "Torghatten Nord AS",
        "routeFrom": "Bodoe",
        "routeTo": "Moskenes (Lofoten)",
        "duration": "3-4 hours (Bodoe-Moskenes)",
        "frequency": "Multiple daily sailings, reduced in winter",
        "bookingUrl": "https://www.torghatten-nord.no/",
        "isEcoFriendly": False,
        "seasonalAvailability": "Year-round, reduced winter schedule",
    })

    entries.append({
        "name": "Torghatten Nord - Bognes to Loedingen Ferry",
        "description": "Car ferry crossing a vital artery for road traffic heading to or from Lofoten and Vesteraalen, bypassing the long fjord detour. Part of the E6/E10 highway network connecting mainland Norway to the islands.",
        "destination": "northern-norway",
        "location": "Bognes - Loedingen",
        "priceRange": "budget",
        "website": "https://www.torghatten-nord.no/",
        "transportType": "ferry",
        "operator": "Torghatten Nord AS",
        "routeFrom": "Bognes",
        "routeTo": "Loedingen",
        "duration": "1 hour",
        "frequency": "Multiple daily sailings",
        "bookingUrl": "https://www.torghatten-nord.no/",
        "isEcoFriendly": False,
        "seasonalAvailability": "Year-round",
    })

    entries.append({
        "name": "Boreal Sjoe - Finnmark Local Ferries",
        "description": "Operates passenger and car ferries across Finnmark, Troms, and Nordland under PSO contracts. Essential routes from Oeksfjord to roadless communities like Hasvik and Soer-Tverrfjord. Indispensable municipal infrastructure ensuring remote communities remain connected year-round.",
        "destination": "northern-norway",
        "location": "Oeksfjord, Hasvik, Finnmark",
        "priceRange": "budget",
        "website": "https://www.boreal.no/",
        "transportType": "ferry",
        "operator": "Boreal Sjoe AS",
        "routeFrom": "Oeksfjord",
        "routeTo": "Hasvik / remote Finnmark communities",
        "duration": "Varies by route",
        "frequency": "Scheduled departures, some demand-responsive",
        "bookingUrl": "https://www.boreal.no/",
        "isEcoFriendly": False,
        "seasonalAvailability": "Year-round",
    })

    entries.append({
        "name": "Brim Explorer - Hybrid-Electric Fjord Cruises",
        "description": "Purpose-built hybrid-electric boats providing silent, vibration-free movement through protected fjords. Operates in Tromsoe, Lofoten, and Bodoe harbors. Functions simultaneously as scenic transit and optimal wildlife observation platform for whale watching and aurora viewing without disturbing the marine ecosystem.",
        "destination": "northern-norway",
        "location": "Tromsoe, Lofoten, Bodoe",
        "priceRange": "luxury",
        "website": "https://brimexplorer.com/",
        "transportType": "ferry",
        "operator": "Brim Explorer",
        "routeFrom": "Tromsoe / Lofoten / Bodoe harbors",
        "routeTo": "Fjord cruises (round-trip)",
        "duration": "2-4 hours",
        "frequency": "Multiple departures in season",
        "bookingUrl": "https://brimexplorer.com/",
        "isEcoFriendly": True,
        "seasonalAvailability": "Year-round, expanded summer schedule",
    })

    # ═══════════════════════════════════════════════════════════
    # PUBLIC TRANSPORT AUTHORITIES
    # ═══════════════════════════════════════════════════════════

    entries.append({
        "name": "Reis Nordland - Public Buses and Express Boats",
        "description": "County-level public transport in Nordland coordinating buses and express boats across Helgeland, Salten, Lofoten, Vesteraalen, and Narvik. The Travel Pass Nordland offers unlimited 7-day travel on public buses and catamarans. Digital ticketing via the Reis app. Tour operators can pre-book express boat spaces from summer 2025.",
        "destination": "northern-norway",
        "location": "Nordland county (Helgeland to Narvik)",
        "priceRange": "budget",
        "website": "https://www.reisnordland.no/",
        "transportType": "bus",
        "operator": "Reis Nordland",
        "routeFrom": "Nordland county (multiple origins)",
        "routeTo": "Nordland county (multiple destinations)",
        "duration": "Varies by route",
        "frequency": "Regular scheduled services",
        "bookingUrl": "https://www.reisnordland.no/",
        "isEcoFriendly": False,
        "seasonalAvailability": "Year-round",
    })

    entries.append({
        "name": "Svipper - Tromsoe and Troms Public Transport",
        "description": "All public transportation in Troms county: city buses in Tromsoe, regional bus lines, express boats, and car ferries. Adult single fare from 50 NOK (30 NOK off-peak in Tromsoe). Seat guarantee policy on express boats requires advance digital reservation. Several ferry routes including Stornes-Bjoerneraa and Hansnes-Karlsoey operate free of charge. Winter ski bus routes to Kattfjordeidet and Toensvika.",
        "destination": "northern-norway",
        "location": "Troms county, centered on Tromsoe",
        "priceRange": "budget",
        "website": "https://fylkestrafikk.no/",
        "transportType": "bus",
        "operator": "Svipper",
        "routeFrom": "Tromsoe and Troms county",
        "routeTo": "Tromsoe and Troms county",
        "duration": "Varies by route",
        "frequency": "Frequent city buses, scheduled regional services",
        "bookingUrl": "https://fylkestrafikk.no/",
        "isEcoFriendly": False,
        "seasonalAvailability": "Year-round, winter ski bus routes Dec-Apr",
    })

    entries.append({
        "name": "Snelandia - Finnmark Public Transport",
        "description": "Public transport across Finnmark, Norway's largest and northernmost county. Manages approximately 1.7 million passenger journeys annually. Uses demand-responsive transport (Fleks-bestilling) for remote routes. The Sommerbilletten offers unlimited 7-day travel on all buses and boats. Express boats include RognsundXpressen and MaasoeXpressen.",
        "destination": "northern-norway",
        "location": "Finnmark county (Loppa to Kirkenes)",
        "priceRange": "budget",
        "website": "https://www.snelandia.no/",
        "transportType": "bus",
        "operator": "Snelandia",
        "routeFrom": "Finnmark county (multiple origins)",
        "routeTo": "Finnmark county (multiple destinations)",
        "duration": "Varies by route",
        "frequency": "Scheduled services, some demand-responsive",
        "bookingUrl": "https://www.snelandia.no/",
        "isEcoFriendly": False,
        "seasonalAvailability": "Year-round, Sommerbilletten summer pass available",
    })

    # ═══════════════════════════════════════════════════════════
    # LONG-DISTANCE COACHES
    # ═══════════════════════════════════════════════════════════

    entries.append({
        "name": "The Arctic Route - Tromsoe to Rovaniemi (Aurora Express Nightliner)",
        "description": "Cross-border overnight service from Tromsoe to Rovaniemi, Finland, operated by Bussring AS with Eskelisen Lapin Linjat and Vy. Red double-decker buses with business-class semi-reclining seats. 12-hour journey includes evening meal, breakfast, and active aurora alerts where drivers stop for Northern Lights viewing. Priced 3,300-4,500 NOK.",
        "destination": "northern-norway",
        "location": "Tromsoe to Rovaniemi, Finland",
        "priceRange": "luxury",
        "website": "https://bestarctic.com/the-arctic-route/",
        "transportType": "bus",
        "operator": "Bussring AS / The Arctic Route",
        "routeFrom": "Tromsoe",
        "routeTo": "Rovaniemi (Finland)",
        "duration": "12 hours (overnight)",
        "frequency": "Scheduled winter departures",
        "bookingUrl": "https://bestarctic.com/the-arctic-route/",
        "isEcoFriendly": False,
        "seasonalAvailability": "Winter only (December 1 - March 31)",
    })

    entries.append({
        "name": "The Arctic Route - Tromsoe to Rovaniemi (Day Route 106)",
        "description": "Daytime cross-border service from Tromsoe to Rovaniemi via Kilpisjaervi border station (bus change required). 10.5-hour journey serving major hubs including Levi Ski Resort. Priced 475-2,090 NOK depending on segment. Under Finnish law, buses can be overbooked by 30% during peak periods.",
        "destination": "northern-norway",
        "location": "Tromsoe to Rovaniemi, Finland (via Kilpisjaervi)",
        "priceRange": "mid-range",
        "website": "https://bestarctic.com/the-arctic-route/",
        "transportType": "bus",
        "operator": "Bussring AS / The Arctic Route",
        "routeFrom": "Tromsoe",
        "routeTo": "Rovaniemi (Finland)",
        "duration": "10.5 hours",
        "frequency": "Scheduled winter departures",
        "bookingUrl": "https://bestarctic.com/the-arctic-route/",
        "isEcoFriendly": False,
        "seasonalAvailability": "Winter only (December 1 - March 31)",
    })

    entries.append({
        "name": "The Arctic Route - Tromsoe to Narvik (Route 915)",
        "description": "Four-hour, nine-stop route connecting Tromsoe to Narvik. Priced up to 795 NOK. Synchronized with Arctic Train departures in Narvik for seamless rail-to-bus transfers. Provides direct hop-off access to Polar Park wildlife sanctuary in Bardu.",
        "destination": "northern-norway",
        "location": "Tromsoe to Narvik",
        "priceRange": "mid-range",
        "website": "https://bestarctic.com/the-arctic-route/",
        "transportType": "bus",
        "operator": "Bussring AS / The Arctic Route",
        "routeFrom": "Tromsoe",
        "routeTo": "Narvik",
        "duration": "4 hours",
        "frequency": "Scheduled departures synced with Arctic Train",
        "bookingUrl": "https://bestarctic.com/the-arctic-route/",
        "isEcoFriendly": False,
        "seasonalAvailability": "Winter (December 1 - March 31)",
    })

    entries.append({
        "name": "The Arctic Route - Tromsoe to Senja (Route 940)",
        "description": "Transit from Tromsoe to the island of Senja via the Finnsnes hub. Priced from 750 NOK. Part of the Arctic Route seasonal network connecting tourists to Norway's second-largest island.",
        "destination": "northern-norway",
        "location": "Tromsoe to Senja via Finnsnes",
        "priceRange": "mid-range",
        "website": "https://bestarctic.com/the-arctic-route/",
        "transportType": "bus",
        "operator": "Bussring AS / The Arctic Route",
        "routeFrom": "Tromsoe",
        "routeTo": "Senja",
        "duration": "3-4 hours",
        "frequency": "Scheduled departures",
        "bookingUrl": "https://bestarctic.com/the-arctic-route/",
        "isEcoFriendly": False,
        "seasonalAvailability": "Winter (December 1 - March 31)",
    })

    entries.append({
        "name": "The Arctic Route - Tromsoe to Skjervoey (Route 915)",
        "description": "Tromsoe to Skjervoey route tailored to coincide with morning whale-watching RIB boat departures. Priced up to 860 NOK. Provides direct access to one of Northern Norway's prime whale-watching locations.",
        "destination": "northern-norway",
        "location": "Tromsoe to Skjervoey",
        "priceRange": "mid-range",
        "website": "https://bestarctic.com/the-arctic-route/",
        "transportType": "bus",
        "operator": "Bussring AS / The Arctic Route",
        "routeFrom": "Tromsoe",
        "routeTo": "Skjervoey",
        "duration": "3-4 hours",
        "frequency": "Timed with whale-watching departures",
        "bookingUrl": "https://bestarctic.com/the-arctic-route/",
        "isEcoFriendly": False,
        "seasonalAvailability": "Winter (December 1 - March 31)",
    })

    entries.append({
        "name": "The Arctic Route - Tromsoe to Lyngen (Route 917)",
        "description": "Short-hop route from Tromsoe to Lyngen. Priced from 294 NOK. Integrates free ferry transfers for access to snowmobile tours and the Aurora Spirit Distillery. The most affordable Arctic Route connection.",
        "destination": "northern-norway",
        "location": "Tromsoe to Lyngen",
        "priceRange": "budget",
        "website": "https://bestarctic.com/the-arctic-route/",
        "transportType": "bus",
        "operator": "Bussring AS / The Arctic Route",
        "routeFrom": "Tromsoe",
        "routeTo": "Lyngen",
        "duration": "2-3 hours",
        "frequency": "Scheduled departures",
        "bookingUrl": "https://bestarctic.com/the-arctic-route/",
        "isEcoFriendly": False,
        "seasonalAvailability": "Winter (December 1 - March 31)",
    })

    entries.append({
        "name": "The Arctic Route - Tromsoe to Lofoten (Blue Route)",
        "description": "Extensive 13-hour, 20-stop summer journey from Tromsoe through Sommaroey, Senja, Andenes, and Vesteraalen to Svolveer. Priced up to 1,550 NOK. Multiple public ferry crossings included in ticket price (e.g., Gryllefjord to Andenes). Not hop-on hop-off; individual tickets for specific legs allow customized multi-day itineraries.",
        "destination": "lofoten",
        "location": "Tromsoe to Svolveer via Senja and Vesteraalen",
        "priceRange": "mid-range",
        "website": "https://bestarctic.com/the-arctic-route/",
        "transportType": "bus",
        "operator": "Bussring AS / The Arctic Route",
        "routeFrom": "Tromsoe",
        "routeTo": "Svolveer (Lofoten)",
        "duration": "13 hours (full route)",
        "frequency": "Mid-June to late August",
        "bookingUrl": "https://bestarctic.com/the-arctic-route/",
        "isEcoFriendly": False,
        "seasonalAvailability": "Summer only (mid-June to late August)",
    })

    entries.append({
        "name": "Bussring AS - Tromsoe Airport Express (Flybussen)",
        "description": "Northern Norway's largest bus operator with a fleet of 40 modern tour buses, minibuses, and VIP vehicles. Operates the Airport Express connecting Tromsoe Airport to the city center. Also provides corporate and group charter transport.",
        "destination": "northern-norway",
        "location": "Tromsoe Airport - City Center",
        "priceRange": "budget",
        "website": "https://www.bussring.no/",
        "transportType": "bus",
        "operator": "Bussring AS",
        "routeFrom": "Tromsoe Airport (TOS)",
        "routeTo": "Tromsoe City Center",
        "duration": "15-20 minutes",
        "frequency": "Timed with flight arrivals/departures",
        "bookingUrl": "https://www.bussring.no/",
        "isEcoFriendly": False,
        "seasonalAvailability": "Year-round",
    })

    entries.append({
        "name": "Boreal Travel - Commercial Coach and Electric Sightseeing",
        "description": "Part of the Boreal Norge conglomerate with over 2,500 employees. Operates commercial tourist coaches, airport transfers, and Hertz car rental in Finnmark. Fleet ranges from 16-seat minivans to 57-seat luxury coaches. Actively expanding fleet of fully electric buses for silent, zero-emission sightseeing within city centers.",
        "destination": "northern-norway",
        "location": "Finnmark, Troms, Nordland",
        "priceRange": "mid-range",
        "website": "https://www.boreal.no/",
        "transportType": "bus",
        "operator": "Boreal Travel AS",
        "routeFrom": "Various Northern Norway locations",
        "routeTo": "Various Northern Norway destinations",
        "duration": "Varies by service",
        "frequency": "Scheduled and charter services",
        "bookingUrl": "https://www.boreal.no/",
        "isEcoFriendly": True,
        "seasonalAvailability": "Year-round",
    })

    entries.append({
        "name": "NOR-WAY Bussekspress - National Intercity Coach Network",
        "description": "Joint marketing, branding, and digital ticketing platform for a consortium of independent Norwegian transport operators including Boreal and Tide. Provides a unified booking infrastructure for travelers where train services are nonexistent. Covers both Southern/Western Norway and peripheral Northern routes.",
        "destination": "all",
        "location": "National network",
        "priceRange": "mid-range",
        "website": "https://www.nor-way.no/en/routes/",
        "transportType": "bus",
        "operator": "NOR-WAY Bussekspress",
        "routeFrom": "Multiple Norwegian cities",
        "routeTo": "Multiple Norwegian cities",
        "duration": "Varies by route",
        "frequency": "Multiple daily departures on main routes",
        "bookingUrl": "https://www.nor-way.no/en/routes/",
        "isEcoFriendly": False,
        "seasonalAvailability": "Year-round",
    })

    # ═══════════════════════════════════════════════════════════
    # RAILWAY
    # ═══════════════════════════════════════════════════════════

    entries.append({
        "name": "Arctic Train - Narvik to Bjornfjell Scenic Railway",
        "description": "Dedicated tourist service on the historic Ofoten Line, transforming a heavy industrial corridor into a scenic experience. 2.5-3 hour roundtrip from Narvik ascending over 500 meters from sea-level fjords into alpine tundra. English-speaking guides provide historical context on the line's construction by 5,000 laborers and its significance during the Battles of Narvik in WWII. Wheelchair accessible.",
        "destination": "northern-norway",
        "location": "Narvik Railway Station",
        "priceRange": "mid-range",
        "website": "https://arctictrain.com/products/arctic-train",
        "transportType": "train",
        "operator": "Arctic Train",
        "routeFrom": "Narvik",
        "routeTo": "Bjornfjell (Swedish border)",
        "duration": "2.5-3 hours (roundtrip)",
        "frequency": "Scheduled departures in season",
        "bookingUrl": "https://arctictrain.com/products/arctic-train",
        "isEcoFriendly": True,
        "seasonalAvailability": "Seasonal, check schedule",
    })

    entries.append({
        "name": "SJ NORD - Narvik to Stockholm Night Train",
        "description": "Cross-border rail service from Narvik eastward to Kiruna (3 hours) continuing to Stockholm Central Station (18 hours 25 minutes total). Up to three daily passenger trains on the Ofoten Line. Night trains provide direct sleeping-car connection to the Swedish capital. Also operates the Nordland Line between Trondheim and Bodoe.",
        "destination": "northern-norway",
        "location": "Narvik - Kiruna - Stockholm",
        "priceRange": "mid-range",
        "website": "https://www.sj.se/en",
        "transportType": "train",
        "operator": "SJ NORD",
        "routeFrom": "Narvik",
        "routeTo": "Stockholm (via Kiruna)",
        "duration": "3 hours to Kiruna, 18h 25min to Stockholm",
        "frequency": "Up to 3 daily departures",
        "bookingUrl": "https://www.sj.se/en",
        "isEcoFriendly": True,
        "seasonalAvailability": "Year-round",
    })

    entries.append({
        "name": "SJ NORD - Nordland Line (Trondheim to Bodoe)",
        "description": "The Nordland Line runs from Trondheim to Bodoe, crossing the Arctic Circle. One of Norway's most scenic rail journeys passing through mountains, fjords, and the Saltstraumen maelstrom area. Bodoe is the northern terminus of the Norwegian rail network.",
        "destination": "northern-norway",
        "location": "Trondheim to Bodoe",
        "priceRange": "mid-range",
        "website": "https://www.sj.se/en",
        "transportType": "train",
        "operator": "SJ NORD",
        "routeFrom": "Trondheim",
        "routeTo": "Bodoe",
        "duration": "Approximately 10 hours",
        "frequency": "Multiple daily departures",
        "bookingUrl": "https://www.sj.se/en",
        "isEcoFriendly": True,
        "seasonalAvailability": "Year-round",
    })

    entries.append({
        "name": "Vy - National Rail Booking Platform",
        "description": "Norway's primary state rail operator and central ticket vendor. While physical operations concentrate on the Bergen Line and Oslo commuter rails, Vy's digital platform and the Entur system act as the central clearinghouse for rail bookings throughout Norway. Standard and comfort ticket classes available.",
        "destination": "all",
        "location": "National rail network",
        "priceRange": "varies",
        "website": "https://www.vy.no/en",
        "transportType": "train",
        "operator": "Vy",
        "routeFrom": "Oslo and major Norwegian cities",
        "routeTo": "Bergen, Trondheim, Stavanger, and more",
        "duration": "Varies by route",
        "frequency": "Multiple daily departures",
        "bookingUrl": "https://www.vy.no/en",
        "isEcoFriendly": True,
        "seasonalAvailability": "Year-round",
    })

    # ═══════════════════════════════════════════════════════════
    # TAXIS AND PRIVATE TRANSFERS
    # ═══════════════════════════════════════════════════════════

    entries.append({
        "name": "Tromsoe Taxi - Arctic Capital Taxi and Aurora Tours",
        "description": "Over 106 years of operation in Tromsoe. 24-hour dispatch center, TaxiFix app with fixed pricing and SAS Eurobonus points. Eco-Lighthouse certified, investing heavily in electric vehicles. Offers customized Northern Lights hunting expeditions and regional sightseeing tours. Fleet includes 16-passenger minibuses for handicap-accessible transport.",
        "destination": "northern-norway",
        "location": "Tromsoe",
        "priceRange": "mid-range",
        "website": "https://tromsotaxi.no/en/",
        "transportType": "car-rental",
        "operator": "Tromsoe Taxi AS",
        "routeFrom": "Tromsoe (any pickup point)",
        "routeTo": "Tromsoe region",
        "duration": "On-demand",
        "frequency": "24/7",
        "bookingUrl": "https://tromsotaxi.no/en/",
        "isEcoFriendly": True,
        "seasonalAvailability": "Year-round",
    })

    entries.append({
        "name": "Northride AS - Premium VIP Transfers and Culinary Tours",
        "description": "Premium private transportation across Tromsoe, Senja, Lofoten, and Lyngen. Licensed transport and tour company offering hotel-to-hotel logistics and airport pickups. Signature Fine Dining Arctic Experience (999 NOK, 3 hours) with Bread and Wine restaurant featuring reindeer, cod, whale, and wild berries. Private 10-hour Senja day trips from 14,990 NOK.",
        "destination": "northern-norway",
        "location": "Tromsoe, Senja, Lofoten, Lyngen",
        "priceRange": "luxury",
        "website": "https://www.northride.no/",
        "transportType": "car-rental",
        "operator": "Northride AS",
        "routeFrom": "Tromsoe / Senja / Lofoten / Lyngen",
        "routeTo": "Custom destinations",
        "duration": "On-demand, 3-10 hours for tours",
        "frequency": "By reservation",
        "bookingUrl": "https://www.northride.no/",
        "isEcoFriendly": False,
        "seasonalAvailability": "Year-round",
    })

    entries.append({
        "name": "Bodoe Taxi - Salten Region Taxi Service",
        "description": "Celebrating its centenary in 2024, operating approximately 60 vehicles. TaxiFix app and 24/7 call center. Affiliated Taxibussen Bodoe operates Mercedes Sprinter minibuses for up to 16 passengers with wheelchair accessibility. Specialized in aviation and maritime crew change transfers with heavy gear transport (1,820 kg trailer capacity).",
        "destination": "northern-norway",
        "location": "Bodoe and Salten region",
        "priceRange": "mid-range",
        "website": "https://visitbodo.com/en/activity/taxi/bodo-taxi/",
        "transportType": "car-rental",
        "operator": "Bodoe Taxi SA",
        "routeFrom": "Bodoe (any pickup point)",
        "routeTo": "Salten region",
        "duration": "On-demand",
        "frequency": "24/7",
        "bookingUrl": "https://visitbodo.com/en/activity/taxi/bodo-taxi/",
        "isEcoFriendly": False,
        "seasonalAvailability": "Year-round",
    })

    entries.append({
        "name": "Explore Alta - VIP Private Transport and Local Storytelling",
        "description": "Bespoke private transportation led by local owners Nina and Frode. Modern, spacious vehicles for VIP airport transfers, transport between Arctic activities, and tailor-made day trips. Transforms standard transit into an immersive local storytelling experience with genuine northern hospitality and strict safety in severe winter conditions.",
        "destination": "northern-norway",
        "location": "Alta, Finnmark",
        "priceRange": "luxury",
        "website": "https://visitalta.no/en/product/private-transportation-services/",
        "transportType": "car-rental",
        "operator": "Explore Alta",
        "routeFrom": "Alta",
        "routeTo": "Custom destinations in Finnmark",
        "duration": "On-demand",
        "frequency": "By reservation",
        "bookingUrl": "https://visitalta.no/en/product/private-transportation-services/",
        "isEcoFriendly": False,
        "seasonalAvailability": "Year-round",
    })

    entries.append({
        "name": "Booking Kirkenes - Airport and Cruise Pier Transfers",
        "description": "Private transfers at Norway's eastern edge, near the Russian border. Connects the regional airport to Hurtigruten and Havila cruise piers. Transparent pricing: 1,500 NOK (3-person sedan), 2,300 NOK (6-person minivan), 3,100 NOK (15-person minibus).",
        "destination": "northern-norway",
        "location": "Kirkenes, Finnmark",
        "priceRange": "mid-range",
        "website": "https://www.bookingkirkenes.no/",
        "transportType": "car-rental",
        "operator": "Booking Kirkenes",
        "routeFrom": "Kirkenes Airport / Hotels",
        "routeTo": "Kirkenes cruise pier / Hotels",
        "duration": "15-30 minutes",
        "frequency": "By reservation, aligned with ship arrivals",
        "bookingUrl": "https://www.bookingkirkenes.no/",
        "isEcoFriendly": False,
        "seasonalAvailability": "Year-round",
    })

    entries.append({
        "name": "Alta Taxi - Finnmark Taxi and Northern Lights Tours",
        "description": "Fleet of 24 vehicles in Alta emphasizing accessibility through minivans and wheelchair-capable transport. Customized services include allergy-friendly transport, package deliveries, and Northern Lights sightseeing excursions.",
        "destination": "northern-norway",
        "location": "Alta, Finnmark",
        "priceRange": "mid-range",
        "website": "https://visitalta.no/en/supplier/alta-taxi/",
        "transportType": "car-rental",
        "operator": "Alta Taxi",
        "routeFrom": "Alta",
        "routeTo": "Alta region",
        "duration": "On-demand",
        "frequency": "24/7",
        "bookingUrl": "https://visitalta.no/en/supplier/alta-taxi/",
        "isEcoFriendly": False,
        "seasonalAvailability": "Year-round",
    })

    entries.append({
        "name": "Kirkenes Taxi - Eastern Finnmark Transport",
        "description": "24/365 logistical infrastructure at Norway's eastern edge. Functions as school transport, non-emergency patient transport, and parcel courier alongside standard dispatch. Essential service in one of Norway's most remote communities, just kilometers from the Russian border.",
        "destination": "northern-norway",
        "location": "Kirkenes, Finnmark",
        "priceRange": "mid-range",
        "website": "https://www.kirkenestaxi.no/",
        "transportType": "car-rental",
        "operator": "Kirkenes Taxi",
        "routeFrom": "Kirkenes",
        "routeTo": "Kirkenes region",
        "duration": "On-demand",
        "frequency": "24/7/365",
        "bookingUrl": "https://www.kirkenestaxi.no/",
        "isEcoFriendly": False,
        "seasonalAvailability": "Year-round",
    })

    # ═══════════════════════════════════════════════════════════
    # TOUR AGGREGATORS
    # ═══════════════════════════════════════════════════════════

    entries.append({
        "name": "Arctic Guide Service - Shore Excursions and B2B Logistics",
        "description": "Offices in Lofoten, Tromsoe, and North Cape providing multi-lingual professional guides in English, German, Spanish, Japanese, Italian, and French. Critical B2B partner for cruise lines and Hurtigruten. Manages shore excursions, dispatch services for large tourist groups, and seamless airport-to-hotel transfers.",
        "destination": "northern-norway",
        "location": "Tromsoe, Lofoten, North Cape",
        "priceRange": "varies",
        "website": "https://www.arcticguideservice.com/",
        "transportType": "bus",
        "operator": "Arctic Guide Service",
        "routeFrom": "Tromsoe / Lofoten / North Cape",
        "routeTo": "Custom excursion destinations",
        "duration": "Varies by excursion",
        "frequency": "By reservation, aligned with cruise arrivals",
        "bookingUrl": "https://www.arcticguideservice.com/",
        "isEcoFriendly": False,
        "seasonalAvailability": "Year-round",
    })

    entries.append({
        "name": "Fjord Tours - Norway in a Nutshell and Arctic Circle Express",
        "description": "High-level aggregator using Vy trains, Havila coastal ships, and local bus operators to create fully ticketed multi-day itineraries. The Norway in a Nutshell route is globally recognized. Sells the entire region as a single, easily consumable travel product for international markets.",
        "destination": "all",
        "location": "National (including Arctic routes)",
        "priceRange": "varies",
        "website": "https://www.fjordtours.com/en",
        "transportType": "train",
        "operator": "Fjord Tours",
        "routeFrom": "Bergen / Oslo",
        "routeTo": "Multiple destinations (packaged itineraries)",
        "duration": "1-12 days depending on package",
        "frequency": "Daily departures for popular routes",
        "bookingUrl": "https://www.fjordtours.com/en",
        "isEcoFriendly": False,
        "seasonalAvailability": "Year-round, expanded summer schedule",
    })

    entries.append({
        "name": "Norwegian Travel - Premium Experience Tourism",
        "description": "Premium national tour packager offering high-quality, experience-based tourism across Norway. Acts as a high-level aggregator utilizing underlying transport networks to provide seamless multi-day itineraries focused on nature, adventures, activities, and accommodations.",
        "destination": "all",
        "location": "Region-wide Norway",
        "priceRange": "luxury",
        "website": "https://www.norwegian.travel/",
        "transportType": "bus",
        "operator": "Norwegian Travel",
        "routeFrom": "Various Norwegian cities",
        "routeTo": "Premium destinations across Norway",
        "duration": "Multi-day packages",
        "frequency": "Scheduled departures",
        "bookingUrl": "https://www.norwegian.travel/",
        "isEcoFriendly": False,
        "seasonalAvailability": "Year-round",
    })

    return entries


def main():
    parser = argparse.ArgumentParser(description="Import transport operators into travel-transport.json")
    parser.add_argument("--dry-run", action="store_true", help="Preview without writing")
    parser.add_argument("--status", type=str, default="published", choices=["draft", "published"],
                        help="Status for imported entries (default: published)")
    args = parser.parse_args()

    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    output_file = os.path.join(project_root, "src", "data", "travel-transport.json")

    # Load existing data
    existing_data = {}
    if os.path.exists(output_file):
        with open(output_file, "r", encoding="utf-8") as f:
            existing_data = json.load(f)
            if not isinstance(existing_data, dict):
                existing_data = {}

    existing_ids = set(existing_data.keys())
    initial_count = len(existing_ids)

    now = datetime.now(timezone.utc).isoformat()
    entries = build_transport_entries()
    sort_order = max((v.get("sortOrder", 0) for v in existing_data.values()), default=0) + 1

    added = 0
    skipped = 0

    for entry_data in entries:
        entry_id = slugify(entry_data["name"])

        if entry_id in existing_ids:
            skipped += 1
            print(f"  SKIP: {entry_data['name']} (already exists)")
            continue

        full_entry = {
            "id": entry_id,
            "name": entry_data["name"],
            "description": entry_data["description"],
            "destination": entry_data["destination"],
            "location": entry_data["location"],
            "priceRange": entry_data["priceRange"],
            "website": entry_data.get("website"),
            "imageUrl": None,
            "imageAlt": None,
            "status": args.status,
            "isFeatured": False,
            "sortOrder": sort_order,
            "createdAt": now,
            "updatedAt": now,
            "transportType": entry_data["transportType"],
            "operator": entry_data["operator"],
            "routeFrom": entry_data["routeFrom"],
            "routeTo": entry_data["routeTo"],
            "duration": entry_data.get("duration"),
            "frequency": entry_data.get("frequency"),
            "bookingUrl": entry_data.get("bookingUrl"),
            "isEcoFriendly": entry_data.get("isEcoFriendly", False),
            "seasonalAvailability": entry_data.get("seasonalAvailability"),
        }

        existing_data[entry_id] = full_entry
        existing_ids.add(entry_id)
        sort_order += 1
        added += 1
        print(f"  ADD: {entry_data['name']} [{entry_data['transportType']}]")

    print(f"\n{'[DRY RUN] ' if args.dry_run else ''}Summary:")
    print(f"  Previously existing: {initial_count}")
    print(f"  Added: {added}")
    print(f"  Skipped (already exist): {skipped}")
    print(f"  Total: {len(existing_data)}")
    print(f"  Status: {args.status}")

    if not args.dry_run:
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(existing_data, f, indent=2, ensure_ascii=False)
        print(f"\n  Written to: {output_file}")
    else:
        print(f"\n  [DRY RUN] No files written.")


if __name__ == "__main__":
    main()
