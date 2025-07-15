// ===== INNOVATION.JS - CODE COMPLET =====

function filterByCategory(news, category) {
    if (category === 'all') return news;
    
    return news.filter(item => {
        if (Array.isArray(item.categories)) {
            return item.categories.includes(category);
        } else if (item.category) {
            return item.category === category;
        }
        return false;
    });
}

const rssSources = [
    { 
        name: 'fao', 
        url: 'https://www.fao.org/science-technology-and-innovation/news-and-events/news/fr', 
        logo: 'images/fao-logo.png', 
        displayName: 'FAO',
        type: 'html'
    },
    { 
        name: 'agritech', 
        url: 'https://www.agritechtomorrow.com/rss/news/', 
        logo: 'images/agri-logo.jpg', 
        displayName: 'AgriTech Tomorrow',
        type: 'rss'
    },
    { 
        name: 'agrimaroc', 
        url: 'https://www.agrimaroc.ma/categorie/actualite-agricole/nouvelles-technologies-agricoles/feed/', 
        logo: 'images/AgriMaroc-logo.png', 
        displayName: 'AgriMaroc',
        type: 'rss'
    },
    { 
        name: 'globalagtech', 
        url: 'https://www.globalagtechinitiative.com/in-field-technologies/', 
        logo: 'images/globalag-logo.jpg', 
        displayName: 'Global Ag Tech',
        type: 'html'
    },
    { 
        name: 'agripulse', 
        url: 'https://www.agri-pulse.com/rss/topic/71', 
        logo: 'images/agripulse-logo.png', 
        displayName: 'Agri-Pulse',
        type: 'rss'
    },
    { 
        name: 'cgiar', 
        url: 'https://www.cgiar.org/news-events/all-news/', 
        logo: 'images/cgiar-logo.png', 
        displayName: 'CGIAR',
        type: 'html'
    }
];

// Catégories d'innovation avec mots-clés
const innovationCategories = {
    ai: {
        name: 'IA',
        keywords: ['intelligence artificielle', 'ai', 'artificial intelligence', 'machine learning', 'apprentissage automatique', 'deep learning', 'algorithme', 'neural network', 'réseau de neurones', 'ia', 'computer vision', 'vision par ordinateur', 'predictive analytics', 'analyse prédictive', 'data mining', 'nlp', 'natural language processing']
    },
    precision: {
        name: 'Précision',
        keywords: ['agriculture de précision', 'precision agriculture', 'gps', 'satellite', 'géolocalisation', 'mapping', 'cartographie', 'variable rate', 'taux variable', 'field mapping', 'cartographie des champs', 'yield mapping', 'guidance', 'guidage', 'precision farming', 'agriculture précise', 'capteurs', 'sensors', 'iot', 'drone', 'rpas', 'uav', 'lidar', 'ndvi', 'multispectral', 'hyperspectral', 'thermal imaging', 'imagerie thermique', 'soil sensor', 'capteur de sol', 'moisture sensor', 'capteur d\'humidité', 'ph sensor', 'capteur ph', 'weather station', 'station météo', 'yield monitor', 'moniteur de rendement']
    },
    automation: {
        name: 'Robot',
        keywords: ['automation', 'automatisation', 'robot', 'robotique', 'robotics', 'autonomous', 'autonome', 'automated', 'automatisé', 'machinery', 'machinerie', 'equipment', 'équipement', 'mechanization', 'mécanisation', 'self-driving', 'conduite autonome', 'unmanned', 'sans pilote', 'désherbage', 'weeding', 'tracteur', 'tractor', 'serres', 'greenhouse', 'récolte', 'harvest', 'harvesting', 'semis', 'seeding', 'plantation', 'planting', 'pulvérisation', 'spraying', 'irrigation automatique', 'automatic irrigation', 'robot de traite', 'milking robot', 'convoyeur', 'conveyor', 'tri automatique', 'automatic sorting']
    },
    management: {
        name: 'Gestion',
        keywords: ['gestion agricole', 'farm management', 'erp', 'logiciel de gestion', 'management software', 'app mobile', 'mobile app', 'application mobile', 'planification', 'planning', 'comptabilité', 'accounting', 'finance', 'budget', 'coût', 'cost', 'rentabilité', 'profitability', 'optimisation', 'optimization', 'ressources', 'resources', 'gestion des cultures', 'crop management', 'gestion des stocks', 'inventory management', 'suivi parcellaire', 'field tracking', 'logiciel agricole', 'farm software', 'crm agricole', 'agricultural crm', 'système de gestion', 'management system', 'tableau de bord', 'dashboard', 'reporting', 'analyse de données', 'data analysis', 'business intelligence', 'intelligence économique', 'gestion financière', 'financial management', 'traçabilité production', 'production traceability', 'gestion des employés', 'staff management', 'planning des tâches', 'task planning', 'suivi des coûts', 'cost tracking', 'analyse de performance', 'performance analysis', 'gestion des contrats', 'contract management', 'facturation', 'billing', 'devis', 'quotation', 'commandes', 'orders', 'livraisons', 'delivery', 'supply chain management', 'gestion de la chaîne logistique', 'inventaire', 'inventory', 'achats', 'purchasing', 'ventes', 'sales', 'clients', 'customers', 'fournisseurs', 'suppliers', 'suivi qualité', 'quality tracking', 'certification', 'certifications', 'audit', 'conformité', 'compliance', 'réglementation', 'regulations', 'normes', 'standards', 'kpi agricole', 'agricultural kpi', 'indicateurs de performance', 'performance indicators', 'métriques', 'metrics', 'benchmarking', 'comparaison', 'comparison']
    },
    climate: {
        name: 'Climat',
        keywords: ['climat', 'climate', 'sécheresse', 'drought', 'changement climatique', 'climate change', 'réchauffement climatique', 'global warming', 'adaptation climatique', 'climate adaptation', 'résilience climatique', 'climate resilience', 'stress hydrique', 'water stress', 'gestion de l\'eau', 'water management', 'irrigation', 'irrigation déficitaire', 'deficit irrigation', 'économie d\'eau', 'water saving', 'pluviométrie', 'rainfall', 'météorologie', 'meteorology', 'prévisions météo', 'weather forecast', 'variabilité climatique', 'climate variability', 'extrêmes climatiques', 'climate extremes', 'canicule', 'heat wave', 'gel', 'frost', 'grêle', 'hail', 'inondation', 'flood', 'tempête', 'storm', 'cyclone', 'hurricane', 'phénomènes météorologiques', 'weather phenomena', 'agriculture climato-intelligente', 'climate-smart agriculture', 'adaptation des cultures', 'crop adaptation', 'résistance à la sécheresse', 'drought resistance', 'tolérance au stress', 'stress tolerance', 'déficit hydrique', 'water deficit', 'aridité', 'aridity', 'semi-aride', 'semi-arid', 'désertification', 'desertification', 'salinisation', 'salinization', 'érosion', 'erosion', 'dégradation des sols', 'soil degradation', 'conservation des sols', 'soil conservation', 'mulching', 'paillage', 'couverture végétale', 'cover crops', 'rotation des cultures', 'crop rotation', 'agroforesterie', 'agroforestry', 'brise-vent', 'windbreaks', 'microirrigation', 'micro-irrigation', 'goutte à goutte', 'drip irrigation', 'aspersion', 'sprinkler irrigation', 'pivot', 'center pivot', 'captage d\'eau', 'water catchment', 'stockage d\'eau', 'water storage', 'bassins de rétention', 'retention ponds', 'réservoirs', 'reservoirs', 'forages', 'drilling', 'puits', 'wells', 'nappes phréatiques', 'groundwater', 'aquifères', 'aquifers', 'recharge des nappes', 'aquifer recharge', 'évapotranspiration', 'evapotranspiration', 'bilan hydrique', 'water balance', 'coefficient cultural', 'crop coefficient', 'besoins en eau', 'water requirements', 'stress thermique', 'heat stress', 'échaudage', 'heat damage', 'dormance', 'dormancy', 'vernalisation', 'vernalization', 'photopériode', 'photoperiod']
    },
    blockchain: {
        name: 'Blockchain',
        keywords: ['blockchain', 'traçabilité', 'traceability', 'supply chain', 'chaîne d\'approvisionnement', 'provenance', 'origine', 'certification', 'authentification', 'authentication', 'smart contract', 'contrat intelligent', 'distributed ledger', 'registre distribué', 'cryptocurrency', 'cryptomonnaie', 'token', 'jeton', 'nft', 'ethereum', 'bitcoin', 'hyperledger', 'fabric', 'consensus', 'mining', 'minage', 'hash', 'hachage', 'immutable', 'immuable', 'transparent', 'transparence', 'décentralisé', 'decentralized', 'peer-to-peer', 'p2p', 'audit', 'vérification', 'verification', 'label', 'étiquette', 'qr code', 'rfid', 'barcode', 'code-barres', 'digital identity', 'identité numérique', 'food safety', 'sécurité alimentaire', 'recall', 'rappel', 'contamination', 'qualité', 'quality', 'standard', 'norme', 'compliance', 'conformité']
    }
};

let allNews = [], filteredNews = [], currentPage = 1;
let currentDateFilter = 'all';
let currentCategoryFilter = 'all';
const newsPerPage = 15;
const proxy = 'https://api.allorigins.win/raw?url=';
const CACHE_KEY = 'agriculture_news_cache';
const CACHE_DURATION = 3600000 * 4; // 4 heures

// Initialisation
document.addEventListener('DOMContentLoaded', async () => {
    initDateFilters();
    initCategoryFilters();
    await loadCache();
    await fetchAllNews();
    filterAndDisplayNews();
});

// Gestion du cache
async function loadCache() {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_DURATION) {
            allNews = data;
            return true;
        }
    }
    return false;
}

async function saveCache() {
    const cacheData = {
        timestamp: Date.now(),
        data: allNews
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
}

// Fonction pour déterminer toutes les catégories d'une actualité
function determineCategories(title, description) {
    const text = (title + ' ' + description).toLowerCase();
    const matchedCategories = [];
    
    for (const [categoryKey, categoryData] of Object.entries(innovationCategories)) {
        for (const keyword of categoryData.keywords) {
            if (text.includes(keyword.toLowerCase())) {
                matchedCategories.push(categoryKey);
                break; // Éviter les doublons pour la même catégorie
            }
        }
    }
    
    return matchedCategories.length > 0 ? matchedCategories : null;
}

// Extraction des données
async function fetchAllNews() {
    try {
        const newItems = await Promise.all(rssSources.map(async source => {
            try {
                const response = await fetch(`${proxy}${encodeURIComponent(source.url)}`);
                if (!response.ok) throw new Error('Erreur réseau');
                const content = await response.text();
                return parseContent(content, source);
            } catch (error) {
                console.error(`Erreur ${source.name}:`, error);
                return [];
            }
        }));
        
        const mergedNews = mergeNews([...allNews, ...newItems.flat()]);
        // Ajouter les catégories à chaque actualité
        allNews = mergedNews.map(item => {
            const categories = determineCategories(item.title, item.description);
            return {
                ...item,
                categories: categories,
                category: categories ? categories[0] : null // Garde la compatibilité
            };
        }).sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
        
        await saveCache();
    } catch (error) {
        console.error('Erreur générale:', error);
    }
}

// Fusion des nouvelles données
function mergeNews(newItems) {
    const seen = new Set();
    return newItems.filter(item => {
        const key = `${item.link}|${item.pubDate}`;
        return seen.has(key) ? false : seen.add(key);
    });
}

// Parsing du contenu
function parseContent(content, source) {
    try {
        switch(source.type) {
            case 'rss': return parseRSS(content, source);
            case 'html':
                switch(source.name) {
                    case 'fao': return parseFAO(content);
                    case 'cgiar': return parseCGIAR(content);
                    case 'globalagtech': return parseGlobalAgTech(content);
                    default: return [];
                }
            default: return [];
        }
    } catch (error) {
        console.error(`Parse error ${source.name}:`, error);
        return [];
    }
}

// Parseurs spécifiques
function parseFAO(html) {
    const dom = new DOMParser().parseFromString(html, 'text/html');
    return Array.from(dom.querySelectorAll('.d-list-news')).map(item => {
        const linkEl = item.querySelector('h5.title-link a');
        const dateEl = item.querySelector('h6.date');
        const descEl = item.querySelector('.d-list-content > div:not(.title-link):not(.date)');

        return {
            title: linkEl?.textContent?.trim() || 'Sans titre',
            link: new URL(linkEl?.href, 'https://www.fao.org').href,
            pubDate: parseDateFAO(dateEl?.textContent),
            description: descEl?.textContent?.trim().substring(0, 200) + '...',
            source: 'fao',
            sourceLogo: 'images/fao-logo.png',
            sourceName: 'FAO'
        };
    }).filter(item => item.title.length > 10);
}

function parseCGIAR(html) {
    const dom = new DOMParser().parseFromString(html, 'text/html');
    return Array.from(dom.querySelectorAll('.news-card')).map(item => {
        const titleEl = item.querySelector('.news-card__title');
        const linkEl = item.querySelector('.news-card-inner');
        const dateEl = item.querySelector('.news-card__infos__date__name');

        return {
            title: titleEl?.textContent?.trim() || 'Sans titre',
            link: new URL(linkEl?.href, 'https://www.cgiar.org').href,
            pubDate: parseDateCGIAR(dateEl?.textContent),
            description: item.querySelector('.news-card__excerpt')?.textContent?.trim().substring(0, 200) + '...',
            source: 'cgiar',
            sourceLogo: 'images/cgiar-logo.png',
            sourceName: 'CGIAR'
        };
    });
}

function parseGlobalAgTech(html) {
    const dom = new DOMParser().parseFromString(html, 'text/html');
    return Array.from(dom.querySelectorAll('.post-details')).map(item => {
        const titleEl = item.querySelector('h3.post-title a');
        const dateEl = item.querySelector('.post-date');

        return {
            title: titleEl?.textContent?.trim() || 'Sans titre',
            link: new URL(titleEl?.href, 'https://www.globalagtechinitiative.com').href,
            pubDate: new Date(dateEl?.textContent?.trim() || Date.now()).toISOString(),
            description: item.querySelector('.post-excerpt')?.textContent?.trim().substring(0, 200) + '...',
            source: 'globalagtech',
            sourceLogo: 'images/globalag-logo.jpg',
            sourceName: 'Global Ag Tech'
        };
    });
}

function parseRSS(xml, source) {
    const dom = new DOMParser().parseFromString(xml, 'text/xml');
    return Array.from(dom.querySelectorAll('item')).map(item => ({
        title: item.querySelector('title')?.textContent || '',
        link: item.querySelector('link')?.textContent || '',
        pubDate: new Date(item.querySelector('pubDate')?.textContent || Date.now()).toISOString(),
        description: extractRSSDescription(item),
        source: source.name,
        sourceLogo: source.logo,
        sourceName: source.displayName
    }));
}

// Helpers
function parseDateFAO(dateString) {
    const [day, month, year] = (dateString || '').split('/').map(Number);
    return new Date(year, month - 1, day).toISOString();
}

function parseDateCGIAR(dateString) {
    const [day, month, year] = (dateString || '').split('.').map(Number);
    return new Date(2000 + year, month - 1, day).toISOString();
}

function extractRSSDescription(item) {
    const descEl = item.querySelector('description') || item.querySelector('content\\:encoded');
    const div = document.createElement('div');
    div.innerHTML = descEl?.textContent || '';
    return div.textContent?.trim().substring(0, 200) + '...' || 'Aucune description';
}

// ===== FILTRES DE CATÉGORIES =====
function initCategoryFilters() {
    document.querySelectorAll('.category-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-filter').forEach(f => f.classList.remove('active'));
            btn.classList.add('active');
            currentCategoryFilter = btn.dataset.category;
            currentPage = 1;
            filterAndDisplayNews();
        });
    });
}

// ===== FILTRES DE DATE =====
function initDateFilters() {
    document.querySelectorAll('.date-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.date-filter').forEach(f => f.classList.remove('active'));
            btn.classList.add('active');
            currentDateFilter = btn.dataset.period;
            currentPage = 1;
            filterAndDisplayNews();
        });
    });
}

function filterByDate(news, period) {
    if (period === 'all') return news;
    
    const now = new Date();
    let startDate, endDate;
    
    switch(period) {
        case 'today':
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            break;
        case 'week':
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());
            startDate = startOfWeek;
            endDate = new Date(startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000);
            break;
        case 'month':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            break;
        case 'quarter':
            const quarter = Math.floor(now.getMonth() / 3);
            startDate = new Date(now.getFullYear(), quarter * 3, 1);
            endDate = new Date(now.getFullYear(), (quarter + 1) * 3, 1);
            break;
        case 'year':
            startDate = new Date(now.getFullYear(), 0, 1);
            endDate = new Date(now.getFullYear() + 1, 0, 1);
            break;
        default:
            return news;
    }
    
    return news.filter(item => {
        const itemDate = new Date(item.pubDate);
        return itemDate >= startDate && itemDate < endDate;
    });
}

// Filtrage et affichage combiné
function filterAndDisplayNews() {
    let filtered = filterByCategory(allNews, currentCategoryFilter);
    filteredNews = filterByDate(filtered, currentDateFilter);
    
    currentPage = 1;
    displayNews();
    displayPagination(Math.ceil(filteredNews.length / newsPerPage));
}

// ===== AFFICHAGE PRINCIPAL - STRUCTURE FINALE =====
function displayNews() {
    const newsContainer = document.getElementById('news-container');
    const start = (currentPage - 1) * newsPerPage;
    const end = start + newsPerPage;
    const currentNews = filteredNews.slice(start, end);

    if (currentNews.length === 0) {
        newsContainer.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-info">
                    <i class="fas fa-info-circle me-2"></i>
                    Aucune actualité disponible pour cette période et catégorie.
                </div>
            </div>`;
        return;
    }

    newsContainer.innerHTML = currentNews.map(item => {
        // Gérer les catégories multiples - affichage horizontal à droite de la date
        let categoryBadges = '';
        if (Array.isArray(item.categories) && item.categories.length > 0) {
            categoryBadges = item.categories.map(cat => {
                const categoryName = innovationCategories[cat] ? innovationCategories[cat].name : cat;
                return `<div class="category-badge ${cat}">${categoryName}</div>`;
            }).join('');
        } else if (item.category) {
            const categoryName = innovationCategories[item.category] ? innovationCategories[item.category].name : item.category;
            categoryBadges = `<div class="category-badge ${item.category}">${categoryName}</div>`;
        }
        
        return `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="news-card">
                    <div class="news-content">
                        <div class="news-date">
                            <div class="date-info">
                                <i class="far fa-calendar-alt me-1"></i>
                                ${new Date(item.pubDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </div>
                            <div class="category-badges-container">
                                ${categoryBadges}
                            </div>
                        </div>
                        <h3 class="news-title">${item.title}</h3>
                        <p class="news-description">${item.description}</p>
                        <div class="news-bottom">
                            <a href="${item.link}" target="_blank" class="read-more">
                                Lire la suite <i class="fas fa-arrow-right"></i>
                            </a>
                            <div class="source-badge">
                                <img src="${item.sourceLogo}" alt="${item.sourceName}">
                                <span>${item.sourceName}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Pagination
function displayPagination(totalPages) {
    const pagination = document.getElementById('pagination-container');
    pagination.innerHTML = '';

    if (totalPages <= 1) return;

    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
    }

    // Flèche précédente
    pagination.innerHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage - 1}">&laquo;</a>
        </li>`;

    // Première page
    if (start > 1) {
        pagination.innerHTML += `
            <li class="page-item ${1 === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" data-page="1">1</a>
            </li>`;
        if (start > 2) pagination.innerHTML += '<li class="page-item disabled"><span class="page-link">...</span></li>';
    }

    // Pages centrales
    for (let i = start; i <= end; i++) {
        pagination.innerHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>`;
    }

    // Dernière page
    if (end < totalPages) {
        if (end < totalPages - 1) pagination.innerHTML += '<li class="page-item disabled"><span class="page-link">...</span></li>';
        pagination.innerHTML += `
            <li class="page-item ${totalPages === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" data-page="${totalPages}">${totalPages}</a>
            </li>`;
    }

    // Flèche suivante
    pagination.innerHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage + 1}">&raquo;</a>
        </li>`;

    // Gestion des clics
    pagination.querySelectorAll('a.page-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const newPage = parseInt(link.dataset.page);
            if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
                currentPage = newPage;
                displayNews();
                displayPagination(totalPages);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}