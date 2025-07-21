// Configuration des sources d'événements
const eventSources = {
    national: {
        fellah: {
            name: "Fellah Trade",
            logo: "images/fellah-logo.jpg",
            url: "https://www.fellah-trade.com/fr/infos-agricoles/agenda",
            parseFunction: parseFellahEvents,
            eventUrlBase: "https://www.fellah-trade.com"
        },
        morocco_events: {
            name: "Événements Nationaux",
            logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRDA0MjI3Ii8+CjxwYXRoIGQ9Ik0zMCAxNUwyNSAyNUgzNUwzMCAxNVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0zMCA0NUwyNSAzNUgzNUwzMCA0NVoiIGZpbGw9IndoaXRlIi8+CjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjUiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHg9IjE1IiB5PSIyNCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjEyIiBmaWxsPSJ3aGl0ZSIgb3BhY2l0eT0iMC4zIi8+Cjwvc3ZnPgo=",
            url: null,
            parseFunction: getMoroccanEvents,
            eventUrlBase: ""
        }
    },
    international: {
        fao: {
            name: "FAO",
            logo: "images/fao-logo.png",
            url: "https://www.fao.org/events/detail/fr",
            parseFunction: parseFAOEvents,
            eventUrlBase: "https://www.fao.org"
        },
        fao_africa: {
            name: "FAO Africa",
            logo: "images/fao-logo.png",
            url: "https://www.fao.org/africa/events/en",
            parseFunction: parseFAOAfricaEvents,
            eventUrlBase: "https://www.fao.org"
        },
        fao_green: {
            name: "FAO Green Agriculture",
            logo: "images/fao-logo.png",
            url: "https://www.fao.org/platforms/green-agriculture/events/en",
            parseFunction: parseFAOGreenEvents,
            eventUrlBase: "https://www.fao.org"
        },
        ec: {
            name: "Commission Européenne",
            logo: "images/ec-logo.png",
            url: "https://agriculture.ec.europa.eu/node/4/rss_en?f%5B0%5D=oe_event_status%3Apast&f%5B1%5D=oe_event_status%3Aupcoming&prefLang=fr",
            parseFunction: parseECEvents,
            eventUrlBase: "https://agriculture.ec.europa.eu"
        },
        agritech: {
            name: "AgriTech Tomorrow",
            logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjNENBRjUwIi8+CjxwYXRoIGQ9Ik0zMCAxNUwyNSAyNUgzNUwzMCAxNVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0zMCA0NUwyNSAzNUgzNUwzMCA0NVoiIGZpbGw9IndoaXRlIi8+CjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjUiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=",
            url: "https://www.agritechtomorrow.com/events.php",
            parseFunction: parseAgriTechEvents,
            eventUrlBase: "https://www.agritechtomorrow.com"
        }
    }
};

// Configuration générale
const config = {
    maxPastMonths: 6,
    refreshInterval: 3600000,
    initialPastEventsToShow: 10
};

// Éléments DOM
const dom = {
    container: document.getElementById('events-container'),
    categoryTabs: document.querySelectorAll('.category-tab'),
    statusFilters: document.querySelectorAll('.status-filter'),
    eventsCount: document.getElementById('events-count-number')
};

// Variables globales
let allEvents = [];
let filteredEvents = [];
let activeCategory = 'national';
let activeStatus = 'upcoming';

// Fonction principale d'initialisation
async function initEvents() {
    try {
        allEvents = [];
        
        // Charger les événements pour la catégorie active
        for (const [sourceKey, sourceConfig] of Object.entries(eventSources[activeCategory])) {
            try {
                let events;
                if (sourceConfig.url) {
                    events = await fetchEvents(sourceConfig.url, sourceConfig.parseFunction);
                } else {
                    events = sourceConfig.parseFunction();
                }
                
                const eventsWithSource = events.map(event => ({
                    ...event,
                    category: activeCategory,
                    source: sourceKey,
                    sourceName: sourceConfig.name,
                    sourceLogo: sourceConfig.logo,
                    eventUrlBase: sourceConfig.eventUrlBase
                }));
                allEvents = [...allEvents, ...eventsWithSource];
            } catch (err) {
                console.error(`Erreur lors du chargement des événements de ${sourceConfig.name}:`, err);
            }
        }
        
        // Charger les événements passés pour la catégorie nationale
        if (activeCategory === 'national') {
            try {
                const pastEvents = await fetchFellahPastEvents();
                allEvents = [...allEvents, ...pastEvents];
            } catch (err) {
                console.error("Erreur lors du chargement des événements passés de Fellah Trade:", err);
            }
        }
        
        filterAndDisplayEvents();
    } catch (err) {
        console.error(err);
        showError();
    }
    setTimeout(initEvents, config.refreshInterval);
}

// Fonction pour les événements marocains récurrents
function getMoroccanEvents() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextYear = currentYear + 1;
    
    const moroccanEvents = [
        {
            title: "SIAM - Salon International de l'Agriculture au Maroc",
            location: "Meknès",
            description: "Le plus grand salon agricole du Maroc et d'Afrique, réunissant professionnels, agriculteurs et institutions pour promouvoir l'innovation et le développement agricole.",
            eventId: "https://www.salon-agriculture.ma/",
            start: new Date(currentYear, 3, 16), // 16-21 avril
            end: new Date(currentYear, 3, 21),
            dateDisplay: "du 16 au 21 avril " + currentYear,
            source: "siam",
            sourceName: "SIAM",
            eventUrlBase: ""
        },
        {
            title: "Salon du Cheval d'El Jadida",
            location: "El Jadida",
            description: "Événement équestre majeur célébrant le patrimoine équin marocain, avec concours, spectacles et expositions dédiés au monde du cheval.",
            eventId: "https://www.salonducheval.ma",
            start: new Date(currentYear, 9, 14), // 14-19 octobre
            end: new Date(currentYear, 9, 19),
            dateDisplay: "du 14 au 19 octobre " + currentYear,
            source: "siam",
            sourceName: "Salon du Cheval",
            eventUrlBase: ""
        },
        {
            title: "Phosboucraa Forum - Agriculture Durable",
            location: "Laâyoune",
            description: "Forum dédié à l'agriculture durable dans les provinces du Sud, mettant l'accent sur l'innovation et les pratiques agricoles adaptées aux zones arides.",
            eventId: "https://www.phosboucraafoundation.org",
            start: new Date(currentYear, 10, 20), // 20-22 novembre
            end: new Date(currentYear, 10, 22),
            dateDisplay: "du 20 au 22 novembre " + currentYear,
            source: "siam",
            sourceName: "Phosboucraa Foundation",
            eventUrlBase: ""
        },
        
        {
            title: "Meknès Olive Fair - Salon de l'Olivier",
            location: "Meknès",
            description: "Salon spécialisé dans la filière oléicole, présentant les dernières innovations en matière de culture d'oliviers et de production d'huile d'olive.",
            eventId: "https://www.olivefair.ma",
            start: new Date(currentYear, 11, 5), // 5-7 décembre
            end: new Date(currentYear, 11, 7),
            dateDisplay: "du 5 au 7 décembre " + currentYear,
            source: "siam",
            sourceName: "Olive Fair",
            eventUrlBase: ""
        }
    ];

    // Ajouter les événements de l'année prochaine
    const nextYearEvents = moroccanEvents.map(event => ({
        ...event,
        start: new Date(nextYear, event.start.getMonth(), event.start.getDate()),
        end: new Date(nextYear, event.end.getMonth(), event.end.getDate()),
        dateDisplay: event.dateDisplay.replace(currentYear.toString(), nextYear.toString())
    }));

    const allMoroccanEvents = [...moroccanEvents, ...nextYearEvents];
    
    // Marquer comme passé ou à venir
    return allMoroccanEvents.map(event => {
        const isPast = event.end < now;
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        const isRecent = isPast && (event.end > oneMonthAgo);
        
        return {
            ...event,
            isPast,
            isRecent,
            category: "national"
        };
    }).filter(event => {
        // Garder les événements récents (moins de 6 mois) ou à venir
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        return event.end >= sixMonthsAgo;
    });
}

// Fonction pour charger les événements passés de Fellah Trade
async function fetchFellahPastEvents() {
    const url = "https://www.fellah-trade.com/fr/infos-agricoles/agenda/archives";
    const proxy = 'https://api.allorigins.win/raw?url=';
    const res = await fetch(proxy + encodeURIComponent(url));
    const html = await res.text();
    return parseFellahEvents(html, true);
}

// Gestionnaires d'événements pour les onglets de catégorie
dom.categoryTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        dom.categoryTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        activeCategory = this.dataset.category;
        initEvents();
    });
});

// Gestionnaires d'événements pour les filtres de statut
dom.statusFilters.forEach(filter => {
    filter.addEventListener('click', function() {
        dom.statusFilters.forEach(f => f.classList.remove('active'));
        this.classList.add('active');
        activeStatus = this.dataset.status;
        filterAndDisplayEvents();
    });
});

function filterAndDisplayEvents() {
    if (activeStatus === 'upcoming') {
        filteredEvents = allEvents.filter(e => !e.isPast);
    } else {
        filteredEvents = allEvents.filter(e => e.isPast);
    }
    
    if (activeStatus === 'upcoming') {
        filteredEvents.sort((a, b) => a.start - b.start);
    } else {
        filteredEvents.sort((a, b) => b.end - a.end);
    }
    
    displayEvents();
}

async function fetchEvents(url, parseFunction) {
    const proxy = 'https://api.allorigins.win/raw?url=';
    const res = await fetch(proxy + encodeURIComponent(url));
    const html = await res.text();
    return parseFunction(html);
}

// Parser pour FAO Africa Events
function parseFAOAfricaEvents(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const now = new Date();
    const cutoff = new Date();
    cutoff.setMonth(now.getMonth() - config.maxPastMonths);
    
    const events = [];
    const eventItems = doc.querySelectorAll('.views-row, .event-item, .d-list-event, .card-event');
    
    eventItems.forEach((item, index) => {
        try {
            const titleEl = item.querySelector('h3 a, h2 a, .title a, .event-title a') || 
                           item.querySelector('h3, h2, .title, .event-title');
            
            if (!titleEl) return;
            
            const title = titleEl.textContent.trim();
            if (!title || title.length < 3) return;
            
            let eventUrl = '';
            if (titleEl.tagName === 'A') {
                eventUrl = titleEl.href;
            } else {
                const linkEl = item.querySelector('a[href*="/events/"], a[href*="/event/"]');
                eventUrl = linkEl ? linkEl.href : '';
            }
            
            if (eventUrl && !eventUrl.startsWith('http')) {
                eventUrl = eventUrl.startsWith('/') ? 
                          'https://www.fao.org' + eventUrl : 
                          'https://www.fao.org/' + eventUrl;
            }
            
            const dateElements = item.querySelectorAll('.date, .event-date, .field-name-field-date, time');
            let eventStart = null;
            let eventEnd = null;
            
            for (let dateEl of dateElements) {
                const dateText = dateEl.textContent.trim();
                const { start, end } = extractDatesFromText(dateText);
                if (start) {
                    eventStart = start;
                    eventEnd = end || start;
                    break;
                }
            }
            
            if (!eventStart) {
                const fullText = item.textContent;
                const { start, end } = extractDatesFromText(fullText);
                eventStart = start;
                eventEnd = end || start;
            }
            
            if (!eventStart) return;
            
            const locationEl = item.querySelector('.location, .event-location, .field-name-field-location, .venue');
            const location = locationEl ? locationEl.textContent.trim() : '';
            
            const descEl = item.querySelector('.description, .event-description, .summary, .field-name-body');
            let description = '';
            if (descEl) {
                description = descEl.textContent.trim().substring(0, 200) + '...';
            } else {
                description = `Agricultural event organized by FAO Africa focusing on sustainable development and food security in Africa.`;
            }
            
            const isPast = eventEnd < now;
            const isRecent = isPast && (now - eventEnd) < (30 * 24 * 60 * 60 * 1000);
            
            if (isPast && eventEnd < cutoff) return;
            
            const isDuplicate = events.some(existing => 
                existing.title.toLowerCase().trim() === title.toLowerCase().trim()
            );
            if (isDuplicate) return;
            
            events.push({
                title,
                eventId: eventUrl,
                start: eventStart,
                end: eventEnd,
                location,
                description,
                isPast,
                isRecent,
                source: 'fao_africa'
            });
            
        } catch (err) {
            console.error(`FAO Africa parsing error for item ${index}:`, err);
        }
    });
    
    return events;
}

// Parser pour FAO Green Agriculture Events
function parseFAOGreenEvents(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const now = new Date();
    const cutoff = new Date();
    cutoff.setMonth(now.getMonth() - config.maxPastMonths);
    
    const events = [];
    const eventItems = doc.querySelectorAll('.views-row, .event-item, .d-list-event, .card-event, .event-list-item');
    
    eventItems.forEach((item, index) => {
        try {
            const titleEl = item.querySelector('h3 a, h2 a, .title a, .event-title a') || 
                           item.querySelector('h3, h2, .title, .event-title');
            
            if (!titleEl) return;
            
            const title = titleEl.textContent.trim();
            if (!title || title.length < 3) return;
            
            let eventUrl = '';
            if (titleEl.tagName === 'A') {
                eventUrl = titleEl.href;
            } else {
                const linkEl = item.querySelector('a[href*="/events/"], a[href*="/event/"]');
                eventUrl = linkEl ? linkEl.href : '';
            }
            
            if (eventUrl && !eventUrl.startsWith('http')) {
                eventUrl = eventUrl.startsWith('/') ? 
                          'https://www.fao.org' + eventUrl : 
                          'https://www.fao.org/' + eventUrl;
            }
            
            const dateElements = item.querySelectorAll('.date, .event-date, .field-name-field-date, time');
            let eventStart = null;
            let eventEnd = null;
            
            for (let dateEl of dateElements) {
                const dateText = dateEl.textContent.trim();
                const { start, end } = extractDatesFromText(dateText);
                if (start) {
                    eventStart = start;
                    eventEnd = end || start;
                    break;
                }
            }
            
            if (!eventStart) {
                const fullText = item.textContent;
                const { start, end } = extractDatesFromText(fullText);
                eventStart = start;
                eventEnd = end || start;
            }
            
            if (!eventStart) return;
            
            const locationEl = item.querySelector('.location, .event-location, .field-name-field-location, .venue');
            const location = locationEl ? locationEl.textContent.trim() : '';
            
            const descEl = item.querySelector('.description, .event-description, .summary, .field-name-body');
            let description = '';
            if (descEl) {
                description = descEl.textContent.trim().substring(0, 200) + '...';
            } else {
                description = `Green agriculture event promoting sustainable farming practices, climate-smart agriculture, and environmental conservation.`;
            }
            
            const isPast = eventEnd < now;
            const isRecent = isPast && (now - eventEnd) < (30 * 24 * 60 * 60 * 1000);
            
            if (isPast && eventEnd < cutoff) return;
            
            const isDuplicate = events.some(existing => 
                existing.title.toLowerCase().trim() === title.toLowerCase().trim()
            );
            if (isDuplicate) return;
            
            events.push({
                title,
                eventId: eventUrl,
                start: eventStart,
                end: eventEnd,
                location,
                description,
                isPast,
                isRecent,
                source: 'fao_green'
            });
            
        } catch (err) {
            console.error(`FAO Green parsing error for item ${index}:`, err);
        }
    });
    
    return events;
}

// Parser pour AgriTech Tomorrow
function parseAgriTechEvents(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const now = new Date();
    const cutoff = new Date();
    cutoff.setMonth(now.getMonth() - config.maxPastMonths);
    
    const events = [];
    const eventItems = doc.querySelectorAll('section.entry');
    
    eventItems.forEach((item, index) => {
        try {
            const titleEl = item.querySelector('h5.entry-title a');
            if (!titleEl) return;
            
            const title = titleEl.textContent.trim();
            if (!title || title.length < 3) return;
            
            let eventUrl = titleEl.href || '';
            if (eventUrl && !eventUrl.startsWith('http')) {
                eventUrl = eventUrl.startsWith('/') ? 
                          'https://www.agritechtomorrow.com' + eventUrl : 
                          'https://www.agritechtomorrow.com/' + eventUrl;
            }
            
            const contentEl = item.querySelector('.entry-content');
            if (!contentEl) return;
            
            const contentText = contentEl.textContent.trim();
            let eventStart = null;
            let eventEnd = null;
            let location = '';
            
            // Pattern pour format "Sep 02 - 04 2025, Las Vegas, NV"
            const rangePattern = /([A-Za-z]{3})\s+(\d{1,2})\s*-\s*(\d{1,2})\s+(\d{4}),?\s*(.+)?/;
            const rangeMatch = contentText.match(rangePattern);
            
            if (rangeMatch) {
                const monthAbbr = rangeMatch[1];
                const startDay = parseInt(rangeMatch[2], 10);
                const endDay = parseInt(rangeMatch[3], 10);
                const year = parseInt(rangeMatch[4], 10);
                location = rangeMatch[5] ? rangeMatch[5].trim() : '';
                
                const monthMap = {
                    'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'may': 4, 'jun': 5,
                    'jul': 6, 'aug': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11
                };
                
                const monthNum = monthMap[monthAbbr.toLowerCase()];
                if (monthNum !== undefined) {
                    eventStart = new Date(year, monthNum, startDay);
                    eventEnd = new Date(year, monthNum, endDay);
                }
            }
            
            // Pattern pour format "Sep 02 2025, Location"
            if (!eventStart) {
                const singlePattern = /([A-Za-z]{3})\s+(\d{1,2})\s+(\d{4}),?\s*(.+)?/;
                const singleMatch = contentText.match(singlePattern);
                
                if (singleMatch) {
                    const monthAbbr = singleMatch[1];
                    const day = parseInt(singleMatch[2], 10);
                    const year = parseInt(singleMatch[3], 10);
                    location = singleMatch[4] ? singleMatch[4].trim() : '';
                    
                    const monthMap = {
                        'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'may': 4, 'jun': 5,
                        'jul': 6, 'aug': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11
                    };
                    
                    const monthNum = monthMap[monthAbbr.toLowerCase()];
                    if (monthNum !== undefined) {
                        eventStart = new Date(year, monthNum, day);
                        eventEnd = eventStart;
                    }
                }
            }
            
            if (!eventStart) return;
            
            let description = '';
            const titleLower = title.toLowerCase();
            
            if (titleLower.includes('expo')) {
                description = `Agricultural technology exposition featuring the latest innovations in farming equipment, precision agriculture, and agtech solutions.`;
            } else if (titleLower.includes('conference')) {
                description = `Professional conference bringing together agriculture industry leaders, researchers, and technology innovators.`;
            } else if (titleLower.includes('summit')) {
                description = `Strategic summit focusing on agricultural technology trends, sustainability, and future farming practices.`;
            } else {
                description = `Agricultural technology event focused on innovation, sustainability, and advancing modern farming practices.`;
            }
            
            const isPast = eventEnd < now;
            const isRecent = isPast && (now - eventEnd) < (30 * 24 * 60 * 60 * 1000);
            
            if (isPast && eventEnd < cutoff) return;
            
            const isDuplicate = events.some(existing => 
                existing.title.toLowerCase().trim() === title.toLowerCase().trim()
            );
            if (isDuplicate) return;
            
            events.push({
                title: title,
                eventId: eventUrl || '#',
                start: eventStart,
                end: eventEnd,
                location: location || '',
                description: description,
                isPast: isPast,
                isRecent: isRecent
            });
            
        } catch (err) {
            console.error(`AgriTech parsing error for item ${index}:`, err);
        }
    });
    
    return events;
}

// Fonction utilitaire pour extraire les dates d'une chaîne
function extractDatesFromText(text) {
    const patterns = [
        /\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g,
        /\b(\d{1,2})-(\d{1,2})-(\d{4})\b/g,
        /\b(\d{4})-(\d{1,2})-(\d{1,2})\b/g,
        /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),?\s+(\d{4})\b/gi,
        /\b(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})\b/gi
    ];

    const monthsEn = {
        'january': 0, 'february': 1, 'march': 2, 'april': 3, 'may': 4, 'june': 5,
        'july': 6, 'august': 7, 'september': 8, 'october': 9, 'november': 10, 'december': 11
    };

    const dates = [];
    
    for (const pattern of patterns) {
        const matches = [...text.matchAll(pattern)];
        for (const match of matches) {
            let date = null;
            
            if (pattern.source.includes('January|February')) {
                const month = monthsEn[match[1].toLowerCase()];
                const day = parseInt(match[2], 10);
                const year = parseInt(match[3], 10);
                if (month !== undefined) {
                    date = new Date(year, month, day);
                }
            } else if (pattern.source.includes('\\d{1,2}\\s+')) {
                const day = parseInt(match[1], 10);
                const month = monthsEn[match[2].toLowerCase()];
                const year = parseInt(match[3], 10);
                if (month !== undefined) {
                    date = new Date(year, month, day);
                }
            } else if (pattern.source.includes('\\d{4}-')) {
                const year = parseInt(match[1], 10);
                const month = parseInt(match[2], 10) - 1;
                const day = parseInt(match[3], 10);
                date = new Date(year, month, day);
            } else {
                const part1 = parseInt(match[1], 10);
                const part2 = parseInt(match[2], 10);
                const year = parseInt(match[3], 10);
                
                if (part1 <= 12 && part2 <= 31) {
                    date = new Date(year, part1 - 1, part2);
                } else if (part2 <= 12 && part1 <= 31) {
                    date = new Date(year, part2 - 1, part1);
                }
            }
            
            if (date && !isNaN(date.getTime())) {
                dates.push(date);
            }
        }
    }
    
    if (dates.length === 0) return { start: null, end: null };
    
    dates.sort((a, b) => a - b);
    return {
        start: dates[0],
        end: dates.length > 1 ? dates[dates.length - 1] : dates[0]
    };
}

// Parser pour Fellah Trade
function parseFellahEvents(html, isPastEvent = false) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const items = doc.querySelectorAll('div.actu-detail');
    const now = new Date();
    
    const events = [];
    
    const monthNames = {
        'janvier': 0, 'février': 1, 'mars': 2, 'avril': 3, 'mai': 4, 'juin': 5,
        'juillet': 6, 'août': 7, 'septembre': 8, 'octobre': 9, 'novembre': 10, 'décembre': 11
    };
    
    items.forEach(el => {
        try {
            const titleEl = el.querySelector('h2.titre-agenda');
            const title = titleEl ? titleEl.textContent.trim() : 'Titre non disponible';
            
            const dateEl = el.querySelector('p.date-agenda');
            let rawDate = dateEl ? dateEl.textContent.trim() : 'Date non disponible';
            
            let start = null, end = null;
            let dateDisplay = rawDate;
            
            if (rawDate && rawDate !== 'Date non disponible') {
                const rangeMatch = rawDate.match(/(?:Du|du) (\d{1,2}) au (\d{1,2}) (\p{L}+) (\d{4})/iu);
                if (rangeMatch) {
                    const dayStart = parseInt(rangeMatch[1], 10);
                    const dayEnd = parseInt(rangeMatch[2], 10);
                    const monthName = rangeMatch[3].toLowerCase();
                    const year = parseInt(rangeMatch[4], 10);
                    
                    if (monthNames.hasOwnProperty(monthName)) {
                        start = new Date(year, monthNames[monthName], dayStart);
                        end = new Date(year, monthNames[monthName], dayEnd);
                        dateDisplay = `du ${dayStart} au ${dayEnd} ${monthName} ${year}`;
                    }
                }
                
                if (!start) {
                    const singleMatch = rawDate.match(/(\d{1,2}) (\p{L}+) (\d{4})/iu);
                    if (singleMatch) {
                        const day = parseInt(singleMatch[1], 10);
                        const monthName = singleMatch[2].toLowerCase();
                        const year = parseInt(singleMatch[3], 10);
                        
                        if (monthNames.hasOwnProperty(monthName)) {
                            start = new Date(year, monthNames[monthName], day);
                            end = start;
                            dateDisplay = `le ${day} ${monthName} ${year}`;
                        }
                    }
                }
            }
            
            if (!start || !end) {
                console.warn(`Date non reconnue pour l'événement: ${title} - ${rawDate}`);
                return;
            }
            
            let description = 'Description non disponible';
            const paragraphs = el.querySelectorAll('p');
            const descriptionParts = [];
            
            for (let p of paragraphs) {
                const txt = p.textContent.trim();
                if (txt && 
                    !p.classList.contains('date-agenda') && 
                    txt !== title &&
                    !txt.match(/^\d{1,2}\s+\w+\s+\d{4}/) && 
                    !txt.match(/^(Du|du)\s+\d/)) {
                    descriptionParts.push(txt);
                }
            }
            
            if (descriptionParts.length > 0) {
                description = descriptionParts.join(' ');
            }
            
            if (description === 'Description non disponible') {
                const allText = el.textContent.trim();
                const lines = allText.split('\n').map(line => line.trim()).filter(line => line);
                const filteredLines = lines.filter(line => 
                    line.length > 10 && 
                    !line.match(/^\d{1,2}\s+\w+\s+\d{4}/) &&
                    !line.match(/^(Du|du)\s+\d/) &&
                    line !== title
                );
                
                if (filteredLines.length > 0) {
                    description = filteredLines.join(' ');
                }
            }
            
            let eventId = '';
            const linkEl = el.querySelector('a.lien-externe') || el.querySelector('h2.titre-agenda a');
            if (linkEl) {
                const href = linkEl.getAttribute('href');
                if (href) {
                    if (href.startsWith('http')) {
                        eventId = href;
                    } else {
                        eventId = href.startsWith('/') ? 
                                 'https://www.fellah-trade.com' + href : 
                                 'https://www.fellah-trade.com/' + href;
                    }
                }
            }
            
            let image = '';
            const imgEl = el.querySelector('img.image-ds-texte');
            if (imgEl) {
                image = imgEl.getAttribute('src');
                if (image && image.startsWith('/')) {
                    image = 'https://www.fellah-trade.com' + image;
                }
            }
            
            if (!image) {
                image = 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
            }
            
            const isPast = isPastEvent || end < now;
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            const isRecent = isPast && (end > oneMonthAgo);
            
            events.push({ 
                title, 
                eventId,
                start, 
                end, 
                description, 
                isPast,
                isRecent,
                image,
                dateDisplay,
                source: isPastEvent ? "fellah_past" : "fellah",
                sourceName: "Fellah Trade",
                sourceLogo: "images/fellah-logo.jpg",
                eventUrlBase: "https://www.fellah-trade.com",
                category: "national"
            });
        } catch (err) {
            console.error("Erreur lors de l'extraction d'un événement Fellah Trade:", err);
        }
    });
    
    if (isPastEvent) {
        events.sort((a, b) => b.end - a.end);
    }
    
    return events;
}

// Parser pour FAO Events
function parseFAOEvents(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const items = doc.querySelectorAll('.d-list-event');
    const now = new Date();
    const cutoff = new Date(); 
    cutoff.setMonth(now.getMonth() - config.maxPastMonths);
    
    const out = [];
    items.forEach(el => {
        try {
            const linkEl = el.querySelector('.title-link a');
            let eventId = '';
            
            if (linkEl?.href) {
                eventId = linkEl.href.startsWith('http') ? 
                         linkEl.href : 
                         'https://www.fao.org' + (linkEl.href.startsWith('/') ? linkEl.href : '/' + linkEl.href);
            }
            
            const title = linkEl?.textContent.trim() || 'Titre inconnu';
            const dateText = el.querySelector('h6.date')?.textContent.trim() || '';
            
            const match = dateText.match(/(\d{2}\/\d{2}\/\d{4})(?:\s*-\s*(\d{2}\/\d{2}\/\d{4}))?/);
            let start = new Date(), end = new Date();
            
            if (match) {
                start = new Date(match[1].split('/').reverse().join('-'));
                end = match[2] ? new Date(match[2].split('/').reverse().join('-')) : start;
            }
            
            const locClone = el.querySelector('h6.date')?.cloneNode(true);
            locClone && locClone.querySelectorAll('span,i').forEach(n => n.remove());
            const location = locClone?.textContent.replace(/\d{2}\/\d{2}\/\d{4}/g, '').replace(/-/g, '').trim() || '';
            
            const desc = el.querySelector('.sub-title')?.textContent.trim() || '';
            const isPast = end < now;
            const isRecent = !isPast || (now - end) < (30 * 24 * 60 * 60 * 1000);
            
            if (end >= cutoff) {
                out.push({ 
                    title, 
                    eventId,
                    start, 
                    end, 
                    location, 
                    description: desc, 
                    isPast,
                    isRecent
                });
            }
        } catch (err) {
            console.error("Error parsing FAO event:", err);
        }
    });
    return out;
}

// Parser pour Commission Européenne
function parseECEvents(xmlString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");
    const items = xmlDoc.querySelectorAll('item');
    const now = new Date();
    const cutoff = new Date();
    cutoff.setMonth(now.getMonth() - config.maxPastMonths);
    
    const events = [];
    
    items.forEach(item => {
        try {
            const title = item.querySelector('title').textContent.trim();
            let link = item.querySelector('link').textContent.trim();
            
            if (!link.startsWith('http')) {
                link = link.startsWith('/') ? 
                      'https://agriculture.ec.europa.eu' + link : 
                      'https://agriculture.ec.europa.eu/' + link;
            }
            
            const descriptionHTML = item.querySelector('description').textContent.trim();
            const pubDateText = item.querySelector('pubDate')?.textContent.trim();
            let pubDate = pubDateText ? new Date(pubDateText) : new Date();
            
            const descDoc = parser.parseFromString(descriptionHTML, 'text/html');
            const paragraphs = descDoc.querySelectorAll('p');
            
            let dateStr = '';
            let locationStr = '';
            
            for (let p of paragraphs) {
                const text = p.textContent.trim();
                if (text.match(/^(Date|Dates)[:\s]/i)) {
                    dateStr = text.replace(/^(Date|Dates)[:\s]+/i, '');
                } else if (text.match(/^(Lieu|Location)[:\s]/i)) {
                    locationStr = text.replace(/^(Lieu|Location)[:\s]+/i, '');
                }
            }
            
            const { start, end } = extractDatesFromString(dateStr);
            
            let eventStart = start || pubDate;
            let eventEnd = end || pubDate;
            
            if (isNaN(eventStart.getTime())) {
                console.warn(`Événement sans date valide: ${title}`);
                return;
            }
            
            let textDescription = '';
            for (let p of paragraphs) {
                const text = p.textContent.trim();
                if (!text.match(/^(Date|Dates|Lieu|Location)[:\s]/i) && text) {
                    textDescription = text;
                    break;
                }
            }
            
            if (!textDescription) {
                textDescription = descriptionHTML.replace(/<[^>]*>/g, '').substring(0, 200) + '...';
            }
            
            const isPast = eventEnd < now;
            const isRecent = isPast && (now - eventEnd) < (30 * 24 * 60 * 60 * 1000);
            
            if (isPast && eventEnd < cutoff) {
                return;
            }
            
            events.push({
                title,
                eventId: link,
                start: eventStart,
                end: eventEnd,
                location: locationStr,
                description: textDescription,
                isPast,
                isRecent,
                image: "images/ec-logo.png"
            });
        } catch (err) {
            console.error("Error parsing EC event:", err);
        }
    });
    
    return events;
}

// Fonction utilitaire pour extraire les dates d'une chaîne
function extractDatesFromString(str) {
    const dateRegex = /\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g;
    const matches = [...str.matchAll(dateRegex)];
    if (matches.length === 0) return { start: null, end: null };
    const dates = matches.map(match => {
        const day = parseInt(match[1], 10);
        const month = parseInt(match[2], 10);
        const year = parseInt(match[3], 10);
        return new Date(year, month - 1, day);
    });
    return {
        start: dates[0],
        end: dates[1] || dates[0]
    };
}

// Affichage des événements
function displayEvents() {
    dom.eventsCount.textContent = filteredEvents.length;
    
    if (filteredEvents.length > 0) {
        if (activeStatus === 'upcoming') {
            dom.container.innerHTML = `
                <div class="events-carousel-container">
                    <button class="carousel-arrow left" id="carousel-prev">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <div class="events-carousel" id="events-carousel">
                        ${filteredEvents.map(evt => createEventCard(evt)).join('')}
                    </div>
                    <button class="carousel-arrow right" id="carousel-next">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            `;
            setupCarouselNavigation();
        } else {
            dom.container.innerHTML = `
                <div class="past-events-container">
                    ${filteredEvents.map(evt => createPastEventCard(evt)).join('')}
                </div>
            `;
        }
    } else {
        const statusText = activeStatus === 'upcoming' ? 'à venir' : 'passés';
        const iconClass = activeStatus === 'upcoming' ? 'fa-calendar-plus' : 'fa-calendar-check';
        
        dom.container.innerHTML = `
            <div class="empty-events">
                <i class="far ${iconClass}"></i>
                <h4>Aucun événement ${statusText}</h4>
                <p>Aucun événement ${statusText} trouvé pour cette catégorie.</p>
            </div>
        `;
    }
}

// Créer une carte d'événement à venir
function createEventCard(evt) {
    const displayDate = evt.dateDisplay || formatDate(evt.start, evt.end);
    
    let eventLink = evt.eventId || '#';
    if (eventLink && eventLink !== '#') {
        if (!eventLink.startsWith('http')) {
            eventLink = evt.eventUrlBase + (eventLink.startsWith('/') ? eventLink : '/' + eventLink);
        }
    }
    
    return `
        <div class="event-card ${evt.category}-event">
            <div class="event-header ${evt.source}-bg">
                <div class="event-header-content">
                    <div class="event-date"><i class="far fa-calendar-alt"></i> ${displayDate}</div>
                    <h3 class="event-title">${evt.title}</h3>
                </div>
            </div>
            <div class="event-body">
                ${evt.location ? `
                <div class="event-meta">
                    <div class="event-location">
                        <i class="fas fa-map-marker-alt"></i> ${evt.location}
                    </div>
                </div>` : ''}
                
                ${evt.description ? `<p class="event-description">${evt.description}</p>` : ''}
                
                <div class="event-footer">
                    <a href="${eventLink}" target="_blank" class="event-link">
                        Voir détails <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Créer une carte d'événement passé
function createPastEventCard(evt) {
    const displayDate = evt.dateDisplay || formatDate(evt.start, evt.end);
    
    let eventLink = evt.eventId || '#';
    if (eventLink && eventLink !== '#') {
        if (!eventLink.startsWith('http')) {
            eventLink = evt.eventUrlBase + (eventLink.startsWith('/') ? eventLink : '/' + eventLink);
        }
    }
    
    return `
        <div class="past-event ${evt.category}-event">
            ${evt.isRecent ? '<span class="recent-badge">Récent</span>' : ''}
            <div class="event-date"><i class="far fa-calendar-check"></i> ${displayDate}</div>
            <h3 class="event-title">${evt.title}</h3>
            ${evt.location ? `
            <div class="event-meta">
                <div class="event-location">
                    <i class="fas fa-map-marker-alt"></i> ${evt.location}
                </div>
            </div>` : ''}
            
            ${evt.description ? `<p class="event-description">${evt.description}</p>` : ''}
            
            <div class="event-footer">
                <a href="${eventLink}" target="_blank" class="event-link">
                    Voir compte-rendu <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        </div>
    `;
}

// Configuration du carousel
function setupCarouselNavigation() {
    const carousel = document.getElementById('events-carousel');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    if (prevBtn && nextBtn && carousel) {
        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -300, behavior: 'smooth' });
        });
        
        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }
}

// Formatage des dates
function formatDate(s, e) {
    if (isNaN(s.getTime()) || isNaN(e.getTime())) {
        return "Date non disponible";
    }
    
    const monthNames = [
        'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
        'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];
    
    const day = s.getDate();
    const month = monthNames[s.getMonth()];
    const year = s.getFullYear();
    
    if (s.getTime() === e.getTime()) {
        return `le ${day} ${month} ${year}`;
    }
    
    const endDay = e.getDate();
    const endMonth = monthNames[e.getMonth()];
    const endYear = e.getFullYear();
    
    if (s.getFullYear() === e.getFullYear() && s.getMonth() === e.getMonth()) {
        return `du ${day} au ${endDay} ${month} ${year}`;
    }
    
    if (s.getFullYear() === e.getFullYear()) {
        return `du ${day} ${month} au ${endDay} ${endMonth} ${year}`;
    }
    
    return `du ${day} ${month} ${year} au ${endDay} ${endMonth} ${endYear}`;
}

// Affichage d'erreur
function showError() {
    dom.container.innerHTML = `
        <div class="empty-events">
            <i class="fas fa-exclamation-triangle"></i>
            <h4>Erreur de chargement</h4>
            <p>Impossible de charger les événements. Veuillez réessayer plus tard.</p>
        </div>
    `;
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', initEvents);