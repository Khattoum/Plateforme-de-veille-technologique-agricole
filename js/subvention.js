// Données extraites complètes du document FDA 2025
const fdaData = {
    jeunes: {
        title: "Aides aux Jeunes pour les Investissements Agricoles",
        subtitle: "Réalisés sur les terres collectives - Arrêté conjoint n°3017.23",
        description: "Aides financières de l'État accordées aux investissements agricoles réalisés sur les terres collectives dans le cadre de la melkisation et la location des terres.",
        validUntil: "31 décembre 2030",
        categories: [
            {
                title: "Aide à l'investissement - Jeunes 18-40 ans",
                levels: [
                    {
                        level: "Niveau 1",
                        description: "Mise en place des nouvelles cultures",
                        amounts: {
                            annuelles: "2 000 DH/ha",
                            perennes: "3 000 DH/ha"
                        }
                    },
                    {
                        level: "Niveau 2", 
                        description: "Niveau 1 + Aménagement exploitation OU Bâtiments techniques",
                        amounts: {
                            annuelles: "4 000 DH/ha",
                            perennes: "5 000 DH/ha"
                        }
                    },
                    {
                        level: "Niveau 3",
                        description: "Niveau 1 + Irrigation localisée OU Matériel agricole OU Bâtiment élevage OU Unité valorisation",
                        amounts: {
                            annuelles: "6 000 DH/ha",
                            perennes: "7 000 DH/ha"
                        }
                    }
                ]
            },
            {
                title: "Aide à l'investissement - Plus de 40 ans",
                levels: [
                    {
                        level: "Niveau 1",
                        description: "Mise en place des nouvelles cultures",
                        amounts: {
                            annuelles: "1 000 DH/ha",
                            perennes: "2 000 DH/ha"
                        }
                    },
                    {
                        level: "Niveau 2",
                        description: "Niveau 1 + Aménagement exploitation OU Bâtiments techniques",
                        amounts: {
                            annuelles: "3 000 DH/ha",
                            perennes: "4 000 DH/ha"
                        }
                    },
                    {
                        level: "Niveau 3",
                        description: "Niveau 1 + Irrigation localisée OU Matériel agricole OU Bâtiment élevage OU Unité valorisation",
                        amounts: {
                            annuelles: "4 000 DH/ha",
                            perennes: "5 000 DH/ha"
                        }
                    }
                ]
            },
            {
                title: "Aide à la location",
                description: "70% du montant de la valeur locative",
                plafonds: {
                    annuel_hectare: "2 500 DH",
                    annuel_projet: "50 000 DH",
                    global_projet: "150 000 DH"
                },
                duree: "3 premières années (contrats < 20 ans) ou 5 premières années (contrats ≥ 20 ans)"
            },
            {
                title: "Aide additionnelle",
                items: [
                    { operation: "Irrigation localisée individuelle (> 5 Ha)", taux: "25%" },
                    { operation: "Irrigation de complément", taux: "25%" },
                    { operation: "Matériel agricole", taux: "33%" },
                    { operation: "Matériel élevage", taux: "33%" },
                    { operation: "Bâtiments élevage moderne", taux: "60%" },
                    { operation: "Vergers d'olivier", taux: "10%" },
                    { operation: "Rosacées fruitières, arganier", taux: "17%" },
                    { operation: "Palmier dattier", taux: "14%" }
                ]
            }
        ],
        conditions: [
            "Membres des collectivités ethniques âgés entre 18 et 40 ans",
            "Sans emploi fixe ni revenu stable", 
            "Non propriétaires d'un foncier agricole national (sauf foncier collectif du projet)",
            "Projets dans le cadre de la melkisation ou location",
            "Plafond : 20 ha par projet",
            "Délai de dépôt : 12 mois à compter de l'attestation de mainlevée"
        ]
    },

    irrigation: {
        title: "Aménagements Hydro-agricoles",
        subtitle: "Irrigation localisée et de complément - Arrêté conjoint n°1323.22",
        description: "Subventions pour l'équipement des exploitations agricoles en systèmes d'irrigation localisée (goutte-à-goutte) et irrigation de complément par aspersion.",
        validUntil: "31/12/2027 ou dès que 350 000 Ha atteints",
        categories: [
            {
                title: "Projets collectifs d'irrigation localisée",
                subcategories: [
                    {
                        type: "Liés au réseau d'irrigation sous pression",
                        taux: "100%",
                        plafond: "38 000 DH/ha net équipé",
                        composantes: "Station de tête, conduites, goutteurs"
                    },
                    {
                        type: "Non liés au réseau d'irrigation sous pression", 
                        taux: "100%",
                        plafond: "38 000 DH/ha net équipé",
                        composantes: "Puits, forages, pompage, station de tête, conduites, goutteurs",
                        bassin: "50 DH/m³ plafonné à 12 000 DH/ha"
                    }
                ]
            },
            {
                title: "Projets individuels d'irrigation localisée",
                subcategories: [
                    {
                        type: "Petits agriculteurs",
                        taux: "100%",
                        plafond: "38 000 DH/ha net équipé",
                        details: {
                            puits: "700 DH/mètre linéaire",
                            pompage: "5 000 DH/KW",
                            station: "9 500 DH/ha",
                            conduites: "12 000 DH/ha",
                            goutteurs_auto: "15 000 DH/ha",
                            goutteurs_turbulents: "13 000 DH/ha",
                            gaine: "10 000 DH/ha",
                            automatisme: "3 000 DH/ha"
                        }
                    },
                    {
                        type: "Exploitations 5-20 hectares",
                        taux: "75%",
                        plafond: "28 500 DH/ha net équipé",
                        details: {
                            puits: "500 DH/mètre linéaire",
                            pompage: "4 000 DH/KW",
                            station: "7 100 DH/ha",
                            conduites: "9 000 DH/ha",
                            goutteurs_auto: "11 250 DH/ha",
                            goutteurs_turbulents: "9 750 DH/ha",
                            gaine: "7 500 DH/ha",
                            automatisme: "2 300 DH/ha"
                        }
                    },
                    {
                        type: "Exploitations > 20 hectares",
                        taux: "60%",
                        plafond: "23 000 DH/ha net équipé",
                        details: {
                            puits: "400 DH/mètre linéaire",
                            pompage: "3 000 DH/KW",
                            station: "5 700 DH/ha",
                            conduites: "7 200 DH/ha",
                            goutteurs_auto: "9 000 DH/ha",
                            goutteurs_turbulents: "7 800 DH/ha",
                            gaine: "6 000 DH/ha",
                            automatisme: "2 000 DH/ha"
                        }
                    }
                ]
            },
            {
                title: "Projets d'irrigation de complément",
                subcategories: [
                    {
                        type: "Projets collectifs",
                        taux: "100%",
                        plafond: "34 000 DH/ha net équipé",
                        composantes: "Puits, forages, pompage, aspersion",
                        bassin: "50 DH/m³ plafonné à 10 000 DH/ha"
                    },
                    {
                        type: "Individuels ≤ 20 Ha",
                        taux: "75%",
                        plafond: "25 000 DH/ha net équipé",
                        details: {
                            puits: "500 DH/mètre linéaire",
                            pompage: "4 000 DH/KW",
                            aspersion: "21 000 DH/ha"
                        }
                    },
                    {
                        type: "Individuels > 20 Ha",
                        taux: "60%", 
                        plafond: "20 000 DH/ha net équipé",
                        details: {
                            puits: "400 DH/mètre linéaire",
                            pompage: "3 000 DH/KW",
                            aspersion: "16 000 DH/ha"
                        }
                    }
                ]
            }
        ],
        conditions: [
            "Approbation préalable obligatoire",
            "Matériel conforme à la Norme Marocaine n° 12.1.100-2007",
            "Autorisations ressources en eau nécessaires",
            "Délai réalisation : 24 mois (individuels) / 30 mois (collectifs)",
            "Location minimum 6 ans restantes"
        ]
    },

    solaire: {
        title: "Pompage de l'Eau de l'Irrigation par l'Énergie Solaire",
        subtitle: "Projet pilote - Convention du 19 février 2024",
        description: "Promotion du pompage solaire dans les projets d'économie d'eau en irrigation pour remplacer les systèmes fonctionnant au gaz butane.",
        validUntil: "Superficie cible : 51 000 hectares répartie par région",
        plafonds: {
            pourcentage: "30% du coût d'acquisition et d'installation",
            hectare: "3 000 DH/ha irrigué",
            kwc: "3 000 DH/kWc installé",
            projet: "30 000 DH/projet global"
        },
        kit_eligible: [
            "Panneaux photovoltaïques",
            "Appareillage pour fonctionnement optimal des pompes",
            "Groupe motopompe",
            "Structure et accessoires d'installation",
            "Débitmètres de mesure du volume d'eau",
            "Dispositifs de protection et raccordement"
        ],
        conditions: [
            "Équipé de système d'irrigation localisée fonctionnel",
            "Fonctionnant actuellement grâce au gaz butane",
            "Équipé d'un compteur d'eau d'irrigation fonctionnel",
            "Engagement à tenir un registre de consommation d'eau",
            "Un seul projet par exploitation",
            "Délai réalisation : 3 mois après approbation préalable"
        ]
    },

    genetique: {
        title: "Amélioration Génétique",
        subtitle: "Acquisition et production de reproducteurs",
        description: "Subventions pour l'acquisition de reproducteurs (génisses laitières, ovins, caprins, bovins, camelins) et la production de reproducteurs sélectionnés.",
        categories: [
            {
                title: "Génisses laitières importées",
                reference: "Arrêté n°1902.23",
                validUntil: "31 décembre 2026 ou 60 000 têtes",
                montant: "6 000 DH/tête",
                races_eligibles: [
                    "Frisonne Holshtein",
                    "Holstein à robe pie-noire et pie-rouge",
                    "Races à robe pie-rouge",
                    "Brune", "Jersey", "Tarentaise", "Normande"
                ]
            },
            {
                title: "Génisses laitières nationales",
                reference: "Arrêté n°1903.23", 
                validUntil: "31 décembre 2026 ou 120 000 têtes",
                montant: "3 000 DH/tête",
                condition: "Génisses de race pure sélectionnées et produites au niveau national"
            },
            {
                title: "Reproducteurs camelins",
                reference: "Arrêté n°3380-15",
                montant: "5 000 DH/tête",
                engagement: "Conservation minimum 10 ans"
            },
            {
                title: "Production reproducteurs ovins, caprins, bovins",
                reference: "Arrêté n°2719.22",
                validUntil: "31 décembre 2026 ou 80 000 têtes bovines",
                montants: {
                    ovins_males_individuel: "800 DH/tête",
                    ovins_males_groupement: "850 DH/tête",
                    ovins_femelles_individuel: "700 DH/tête", 
                    ovins_femelles_groupement: "750 DH/tête",
                    caprins_importes_males_individuel: "700 DH/tête",
                    caprins_importes_males_groupement: "750 DH/tête",
                    caprins_importes_femelles_individuel: "600 DH/tête",
                    caprins_importes_femelles_groupement: "650 DH/tête",
                    caprins_locaux_males_individuel: "550 DH/tête",
                    caprins_locaux_males_groupement: "600 DH/tête",
                    caprins_locaux_femelles_individuel: "450 DH/tête",
                    caprins_locaux_femelles_groupement: "500 DH/tête",
                    bovins: "4 000 DH/tête"
                }
            },
            {
                title: "Production reines d'abeilles sélectionnées",
                montants: {
                    individuel: "250 DH/ruchette",
                    groupement: "300 DH/ruchette"
                }
            }
        ]
    },

    semences: {
        title: "Semences Certifiées et Plantations Fruitières", 
        subtitle: "Commercialisation, plantations et production biologique",
        description: "Subventions à la commercialisation des semences certifiées et aides pour la création de plantations fruitières.",
        categories: [
            {
                title: "Semences certifiées de céréales et légumineuses",
                reference: "Arrêté n°2486.24",
                validUntil: "Campagne agricole 2024-2025",
                production_nationale: {
                    ble_tendre: "230 DH/qt",
                    ble_dur: "310 DH/qt", 
                    orge: "240 DH/qt",
                    avoine: "180 DH/qt",
                    triticale: "180 DH/qt",
                    feve_feverole: "205 DH/qt",
                    lentilles: "395 DH/qt",
                    pois_chiche: "395 DH/qt",
                    pois_fourrager: "180 DH/qt",
                    vesce: "180 DH/qt"
                },
                importees: {
                    G3: "1000 DH/ql",
                    G4: "800 DH/ql", 
                    R1: "600 DH/ql"
                },
                stockage: "5 DH/ql/mois pendant 9 mois (220 000 quintaux)"
            },
            {
                title: "Semences monogermes betterave à sucre",
                reference: "Arrêté n°2965.14",
                montant: "800 DH par unité (100 000 graines)"
            },
            {
                title: "Semences et plants tomate, oignon, pomme de terre",
                reference: "Arrêté n°1993.23",
                validUntil: "Campagnes 2023-2024 et 2024-2025",
                montants: {
                    tomate_serre_certifiee: "70 000 DH/ha",
                    tomate_champ_certifiee: "40 000 DH/ha",
                    pomme_terre_certifiee: "15 000 DH/ha",
                    pomme_terre_non_certifiee: "8 000 DH/ha",
                    oignon_certifie: "5 000 DH/ha",
                    oignon_non_certifie: "4 000 DH/ha"
                }
            },
            {
                title: "Création nouvelles plantations canne à sucre",
                reference: "Arrêté n°2825.13",
                montant: "6 000 DH/ha"
            },
            {
                title: "Arboriculture fruitière",
                subcategories: [
                    {
                        type: "Palmier dattier",
                        densification: "100% du prix d'acquisition des plants",
                        extension: "70% plafonné à 35 000 DH/ha (densité ≥ 100 plants/ha)"
                    },
                    {
                        type: "Olivier", 
                        irrigue_haute_densite: "5 000 DH/ha (≥ 285 plants/ha)",
                        irrigue_moyenne_densite: "3 500 DH/ha (100-284 plants/ha)",
                        bour: "3 500 DH/ha (≥ 100 plants/ha)"
                    },
                    {
                        type: "Rosacées fruitières (60% prix acquisition)",
                        pommier: "17 000 DH/ha (≥ 400 plants/ha)",
                        poirier: "17 000 DH/ha (≥ 400 plants/ha)",
                        cognassier: "11 000 DH/ha (≥ 200 plants/ha)",
                        neflier: "7 000 DH/ha (≥ 140 plants/ha)",
                        pecher_nectarinier: "10 000 DH/ha (≥ 200 plants/ha)",
                        prunier: "10 000 DH/ha (≥ 200 plants/ha)",
                        cerisier: "9 000 DH/ha (≥ 170 plants/ha)",
                        amandier_irrigue: "5 000 DH/ha (≥ 200 plants/ha)",
                        amandier_bour: "3 500 DH/ha (≥ 100 plants/ha)"
                    },
                    {
                        type: "Arganier (80% prix acquisition)",
                        bour: "6 000 DH/ha (≥ 100 plants/ha)",
                        irrigue: "9 000 DH/ha (≥ 200 plants/ha)"
                    },
                    {
                        type: "Autres espèces (60% prix acquisition)",
                        figuier_irrigue: "6 000 DH/ha (≥ 230 plants/ha)",
                        figuier_bour: "3 500 DH/ha (≥ 140 plants/ha)",
                        grenadier: "6 000 DH/ha (≥ 200 plants/ha)",
                        noyer: "10 000 DH/ha (≥ 70 plants/ha)",
                        caroubier: "6 000 DH/ha (≥ 100 plants/ha)",
                        pistachier: "8 000 DH/ha (≥ 200 plants/ha)"
                    }
                ]
            },
            {
                title: "Analyses de laboratoire",
                taux: "50% du coût",
                description: "Subvention versée aux laboratoires, défalquée du coût au profit des agriculteurs"
            },
            {
                title: "Production biologique",
                reference: "Arrêté n°2794-19",
                produits_vegetaux: [
                    { superficie: "0.5-5 ha", taux: "90%", plafond: "10 000 DH/an" },
                    { superficie: "5-10 ha", taux: "70%", plafond: "20 000 DH/an" },
                    { superficie: "10-20 ha", taux: "70%", plafond: "30 000 DH/an" },
                    { superficie: "> 20 ha", taux: "40%", plafond: "40 000 DH/an" }
                ],
                produits_animaux: {
                    taux: "80%",
                    plafond: "25 000 DH/an"
                }
            }
        ]
    },

    equipement: {
        title: "Équipement des Exploitations Agricoles",
        subtitle: "Matériel agricole, élevage, bâtiments et serres",
        description: "Aides pour l'acquisition de matériel agricole, matériel d'élevage, construction de bâtiments et installation de serres.",
        categories: [
            {
                title: "Matériel agricole",
                reference: "Arrêté n°1051-18",
                subcategories: [
                    {
                        type: "Tracteurs 2 roues motrices",
                        taux: "30%",
                        plafonds: "< 50 CV: 52 000 DH • 50-70 CV: 62 000 DH • ≥ 70 CV: 72 000 DH"
                    },
                    {
                        type: "Tracteurs 4 roues motrices", 
                        taux: "30%",
                        plafonds: "< 50 CV: 60 000 DH • 50-70 CV: 70 000 DH • ≥ 70 CV: 80 000 DH"
                    },
                    {
                        type: "Moissonneuses batteuses",
                        taux: "20%",
                        plafonds: "< 100 CV: 200 000 DH • ≥ 100 CV: 300 000 DH"
                    },
                    {
                        type: "Semoirs",
                        taux: "50%",
                        plafonds: "30 000 - 100 000 DH selon largeur"
                    }
                ]
            },
            {
                title: "Matériel d'élevage",
                reference: "Arrêté n°3380-15",
                subcategories: [
                    {
                        type: "Broyeur aliment bétail",
                        taux: "30%",
                        plafonds: "6 000 DH/unité"
                    },
                    {
                        type: "Ensileuse",
                        taux: "30%",
                        plafonds: "13 500 - 300 000 DH selon type"
                    },
                    {
                        type: "Machine à traire",
                        taux: "30%",
                        plafonds: "60 000 DH (2x4 postes) • 7 500 DH/poste (≥10 postes)"
                    }
                ]
            },
            {
                title: "Bâtiments d'élevage",
                subcategories: [
                    {
                        type: "Étable moderne",
                        taux: "25%",
                        plafonds: "200 DH/m² (stabulation entravée) • 50 DH/m² (libre)"
                    },
                    {
                        type: "Bergerie/Chèvrerie moderne",
                        taux: "25%",
                        plafonds: "80 DH/m²"
                    },
                    {
                        type: "Abris camelins",
                        taux: "25%",
                        plafonds: "100 DH/m²"
                    }
                ]
            },
            {
                title: "Serres",
                reference: "Arrêté n°1927-20",
                subcategories: [
                    {
                        type: "Armature métallique",
                        taux: "25%",
                        plafonds: "27 DH/m² couvert"
                    },
                    {
                        type: "Armature bois",
                        taux: "25%",
                        plafonds: "12 DH/m² couvert"
                    },
                    {
                        type: "Tunnels métalliques",
                        taux: "25%",
                        plafonds: "9 DH/m² couvert"
                    }
                ]
            }
        ],
        conditions: [
            "Accord de principe préalable obligatoire",
            "Matériel à l'état neuf uniquement",
            "Respect des normes techniques",
            "Engagement conservation 5 ans minimum",
            "Délai dépôt : 12 mois après accord"
        ]
    },

    valorisation: {
        title: "Unités de Valorisation des Produits Agricoles",
        subtitle: "Conditionnement, transformation et stockage",
        description: "Subventions pour les unités de valorisation des produits agricoles frais d'origine végétale et animale.",
        reference: "Arrêté conjoint n°3285.17",
        categories: [
            {
                title: "Produits d'origine végétale",
                subcategories: [
                    {
                        type: "Conditionnement agrumes",
                        taux: "30%",
                        plafonds: "< 5000 T/an: 6M DH • 5000-10000 T/an: 14M DH • ≥ 10000 T/an: 21M DH"
                    },
                    {
                        type: "Conditionnement maraîchers",
                        taux: "30%",
                        plafonds: "< 4000 T/an: 4M DH • 4000-10000 T/an: 10M DH • ≥ 10000 T/an: 15M DH"
                    },
                    {
                        type: "Stockage frigorifique",
                        taux: "25%",
                        plafonds: "Produits divers: 3M DH • Dattes: 800K DH"
                    },
                    {
                        type: "Trituration olives",
                        taux: "10%",
                        plafonds: "2M DH"
                    },
                    {
                        type: "Stockage céréales",
                        taux: "10%",
                        plafonds: "3,2M DH"
                    }
                ]
            },
            {
                title: "Produits d'origine animale",
                subcategories: [
                    {
                        type: "Valorisation lait (fromage)",
                        taux: "30%",
                        plafonds: "3M DH"
                    },
                    {
                        type: "Abattoirs viandes rouges",
                        taux: "30%",
                        plafonds: "18M DH avec salle découpe"
                    },
                    {
                        type: "Abattoirs avicoles",
                        taux: "30%",
                        plafonds: "12M DH avec salle découpe"
                    },
                    {
                        type: "Découpe viandes rouges",
                        taux: "30%",
                        plafonds: "4,5M DH"
                    }
                ]
            }
        ],
        conditions: [
            "Approbation préalable obligatoire",
            "TRI minimal 6%",
            "Autorisations sanitaires ONSSA",
            "Engagement respect conditions 8 ans",
            "Délai réalisation : 24 mois"
        ]
    },

    export: {
        title: "Promotion et Diversification des Exportations",
        subtitle: "Aides aux exportations produits agricoles",
        description: "Aides financières pour la promotion et diversification des exportations vers nouvelles destinations.",
        categories: [
            {
                title: "Exportations produits végétaux",
                reference: "Arrêtés n°3284-17 et n°382-20",
                subcategories: [
                    {
                        type: "Agrumes vers Ukraine, Chine, Golfe",
                        montant: "500 DH/tonne",
                        condition: "Dépassement quantités référence 2000-2001"
                    },
                    {
                        type: "Agrumes autres destinations",
                        montant: "500 DH/tonne", 
                        condition: "Hors Russie, UE, Royaume-Uni"
                    },
                    {
                        type: "Tomate hors UE",
                        montant: "750 DH/tonne",
                        condition: "Dépassement quantités référence 2007-2008"
                    },
                    {
                        type: "Fraise hors UE",
                        montant: "500 DH/tonne",
                        condition: "Totalité des quantités exportées"
                    },
                    {
                        type: "Huile d'olive",
                        montant: "2 000 DH/tonne",
                        condition: "Toutes catégories sauf lampante"
                    }
                ]
            },
            {
                title: "Exportations produits animaux",
                subcategories: [
                    {
                        type: "Œufs à couver",
                        montant: "1 DH/kg exporté",
                        condition: "Agrément élevage ONSSA"
                    },
                    {
                        type: "Poussins d'un jour",
                        montant: "1 DH/kg exporté",
                        condition: "Attestation sanitaire ONSSA"
                    }
                ]
            },
            {
                title: "Transport aérien",
                reference: "Arrêté n°1588-96",
                subcategories: [
                    {
                        type: "Europe Ouest (oct-nov, mars-juin)",
                        montant: "1 DH/kg",
                        condition: "Fruits, légumes, fleurs"
                    },
                    {
                        type: "Autres destinations",
                        montant: "4,5 DH/kg",
                        condition: "Scandinavie, Amérique Nord, Moyen-Orient, Japon"
                    }
                ]
            }
        ],
        conditions: [
            "Certificats d'origine marocaine obligatoires",
            "Documents justificatifs exports",
            "DUM visées par douanes",
            "Délai dépôt : 12-24 mois selon type"
        ]
    },

    agregation: {
        title: "Aides aux Projets d'Agrégation",
        subtitle: "Subventions forfaitaires et préférentielles",
        description: "Subventions pour les projets d'agrégation agricole autour d'unités de valorisation.",
        reference: "Arrêté conjoint n°2411-19",
        categories: [
            {
                title: "Forfaits filières végétales",
                subcategories: [
                    {
                        type: "Agrumes",
                        montants: "Petites: 2250 DH/ha • Moyennes: 1500 DH/ha • Grandes: 750 DH/ha"
                    },
                    {
                        type: "Maraîchage", 
                        montants: "Petites: 5250 DH/ha • Moyennes: 3500 DH/ha • Grandes: 1750 DH/ha"
                    },
                    {
                        type: "Olivier",
                        montants: "Bour: 675/450/225 DH/ha • Irrigué: 1650/1100/550 DH/ha"
                    },
                    {
                        type: "Palmier dattier",
                        montants: "4500/3000/1500 DH/ha ou DH/80 pieds"
                    },
                    {
                        type: "Céréales",
                        montants: "Bour: 600/400/200 DH/ha • Irrigué: 825/550/275 DH/ha"
                    }
                ]
            },
            {
                title: "Forfaits filières animales",
                subcategories: [
                    {
                        type: "Viandes rouges bovines",
                        montants: "Petits: 525 DH/tête • Moyens: 350 DH/tête • Grands: 175 DH/tête"
                    },
                    {
                        type: "Viandes ovines/caprines",
                        montants: "Petits: 150 DH/tête • Moyens: 100 DH/tête • Grands: 50 DH/tête"
                    },
                    {
                        type: "Lait de vaches",
                        montants: "Petits: 420 DH/tête • Moyens: 280 DH/tête • Grands: 140 DH/tête"
                    },
                    {
                        type: "Apiculture",
                        montants: "11250/7500/3750 DH/tonne production livrée"
                    }
                ]
            },
            {
                title: "Irrigation préférentielle",
                description: "Taux préférentiels en 2 tranches pour projets d'agrégation",
                details: "1ère tranche après réalisation • 2ème tranche après livraison production"
            }
        ],
        conditions: [
            "Attestation d'agrégation obligatoire",
            "Contrats avec agrégés",
            "Livraison production à l'unité valorisation",
            "Engagement 5 ans opérationnel",
            "Assistance technique aux agrégés"
        ]
    }
};

// Données des contacts régionaux
const contactsData = [
    {
        region: "BENI MELLAL-KHENIFRA",
        contacts: [
            { nom: "Direction Régionale Agriculture", tel: "05 23 42 49 55" },
            { nom: "DPA AZILAL", tel: "05 23 45 83 98" },
            { nom: "DPA BENI MELLAL", tel: "05 23 48 25 76" },
            { nom: "DPA KHENIFRA", tel: "05 35 58 67 10" },
            { nom: "DPA KHOURIBGA", tel: "05 23 56 26 68" },
            { nom: "ORMVA TADLA", tel: "05 23 43 50 48" }
        ]
    },
    {
        region: "CASABLANCA-SETTAT",
        contacts: [
            { nom: "Direction Régionale Agriculture", tel: "05 23 39 40 20" },
            { nom: "DPA BENSLIMANE", tel: "05 23 29 11 12" },
            { nom: "DPA CASABLANCA", tel: "05 22 27 88 71" },
            { nom: "DPA EL JADIDA", tel: "05 23 34 29 90" },
            { nom: "DPA SETTAT", tel: "05 23 40 22 87" },
            { nom: "DPA BERRECHID", tel: "05 22 03 06 03" },
            { nom: "ORMVA DOUKKALA", tel: "05 23 34 22 70" }
        ]
    },
    {
        region: "DAKHLA OUED EDDAHAB",
        contacts: [
            { nom: "Direction Régionale Agriculture", tel: "05 28 93 16 98" },
            { nom: "DPA DAKHLA", tel: "05 28 89 70 59" }
        ]
    },
    {
        region: "DRAA-TAFILALET", 
        contacts: [
            { nom: "Direction Régionale Agriculture", tel: "05 35 57 04 00" },
            { nom: "ORMVA OUARZAZATE", tel: "05 24 88 26 14" },
            { nom: "ORMVA TAFILALET", tel: "05 35 57 04 00" }
        ]
    },
    {
        region: "FES-MEKNES",
        contacts: [
            { nom: "Direction Régionale Agriculture", tel: "05 35 51 56 62" },
            { nom: "DPA BOULEMANE", tel: "05 35 58 54 58" },
            { nom: "DPA FES", tel: "05 35 62 57 42" },
            { nom: "DPA EL HAJEB", tel: "05 35 54 33 03" },
            { nom: "DPA IFRANE", tel: "05 35 56 21 87" },
            { nom: "DPA MEKNES", tel: "05 35 52 00 14" },
            { nom: "DPA SEFROU", tel: "05 35 68 26 73" },
            { nom: "DPA TAOUNATE", tel: "05 35 62 76 92" },
            { nom: "DPA TAZA", tel: "05 35 67 32 32" }
        ]
    },
    {
        region: "GUELMIM-OUED NOUN",
        contacts: [
            { nom: "Direction Régionale Agriculture", tel: "05 28 77 20 96" },
            { nom: "DPA ASSA ZAG", tel: "05 28 70 06 42" },
            { nom: "DPA GUELMIM", tel: "05 28 87 25 02" },
            { nom: "DPA TANTAN", tel: "05 28 87 75 44" },
            { nom: "DPA SIDI IFNI", tel: "05 28 78 06 64" }
        ]
    },
    {
        region: "LAAYOUNE-SAKIA HAMRA",
        contacts: [
            { nom: "Direction Régionale Agriculture", tel: "05 28 99 33 04" },
            { nom: "DPA BOUJDOUR", tel: "05 28 89 60 95" },
            { nom: "DPA LAAYOUNE", tel: "05 28 89 39 53" },
            { nom: "DPA SMARA", tel: "05 28 89 98 11" }
        ]
    },
    {
        region: "L'ORIENTAL",
        contacts: [
            { nom: "Direction Régionale Agriculture", tel: "05 36 70 20 18" },
            { nom: "DPA FIGUIG", tel: "05 36 79 81 65" },
            { nom: "DPA NADOR", tel: "05 36 60 64 13" },
            { nom: "DPA OUJDA", tel: "05 36 68 49 02" },
            { nom: "DPA TAOURIRT", tel: "05 36 69 94 22" },
            { nom: "DPA GUERCIF", tel: "05 36 67 62 94" },
            { nom: "DPA JERADA", tel: "05 36 82 13 96" },
            { nom: "DPA DRIOUECH", tel: "05 36 60 64 13" },
            { nom: "ORMVA MOULOUYA", tel: "05 36 61 34 68" }
        ]
    },
    {
        region: "MARRAKECH-SAFI",
        contacts: [
            { nom: "Direction Régionale Agriculture", tel: "05 24 45 73 68" },
            { nom: "DPA CHICHAOUA", tel: "05 24 35 30 86" },
            { nom: "DPA ESSAOUIRA", tel: "05 24 78 41 12" },
            { nom: "DPA MARRAKECH", tel: "05 24 43 10 59" },
            { nom: "DPA RHAMNA", tel: "05 24 32 34 37" },
            { nom: "DPA SAFI", tel: "05 24 62 31 88" },
            { nom: "ORMVA HAOUZ", tel: "05 24 44 96 50" }
        ]
    },
    {
        region: "RABAT-SALE-KENITRA",
        contacts: [
            { nom: "Direction Régionale Agriculture", tel: "05 37 36 30 22" },
            { nom: "DPA KHEMISSET", tel: "05 37 55 29 13" },
            { nom: "DPA RABAT", tel: "05 37 63 13 60" },
            { nom: "ORMVA GHARB", tel: "05 37 37 45 02" }
        ]
    },
    {
        region: "SOUSS-MASSA",
        contacts: [
            { nom: "Direction Régionale Agriculture", tel: "05 28 82 71 31" },
            { nom: "DPA TAROUDANT", tel: "05 28 80 20 58" },
            { nom: "DPA TIZNIT", tel: "05 28 86 20 76" },
            { nom: "DPA AGADIR", tel: "05 28 84 00 63" },
            { nom: "ORMVA SOUSS-MASSA", tel: "05 28 84 08 27" }
        ]
    },
    {
        region: "TANGER-TETOUAN-ALHOCEIMA",
        contacts: [
            { nom: "Direction Régionale Agriculture", tel: "05 39 34 34 13" },
            { nom: "DPA CHEFCHAOUEN", tel: "05 39 98 66 36" },
            { nom: "DPA AL HOCEIMA", tel: "05 39 98 29 40" },
            { nom: "DPA OUEZZANE", tel: "05 37 90 86 76" },
            { nom: "DPA TANGER", tel: "05 39 94 02 94" },
            { nom: "DPA TETOUAN", tel: "05 39 96 54 36" },
            { nom: "ORMVA LOUKKOS", tel: "05 39 91 86 76" }
        ]
    }
];

let currentType = 'nationaux'; // Type actuel (nationaux ou internationaux)

function showPDFModal() {
    const modal = new bootstrap.Modal(document.getElementById('pdfModal'));
    const pdfViewer = document.getElementById('pdfViewer');
    pdfViewer.src = 'PDF/Book FDA 2025 FR .pdf';
    modal.show();
}

function generateCategoryContent(categoryKey, data) {
    let content = `
        <div class="category-section" id="section-${categoryKey}">
            <div class="section-header">
                <h2>${data.title}</h2>
                <p>${data.subtitle || data.description}</p>
            </div>
    `;

    if (data.reference) {
        content += `
            <div class="legal-reference">
                <strong>Référence légale :</strong> ${data.reference}
            </div>
        `;
    }

    if (data.validUntil) {
        content += `
            <div class="validity-info">
                <i class="fas fa-calendar-alt me-2"></i>
                <strong>Validité :</strong> ${data.validUntil}
            </div>
        `;
    }

    if (data.plafonds && typeof data.plafonds === 'object') {
        content += `
            <div class="amounts-grid">
                ${Object.entries(data.plafonds).map(([key, value]) => `
                    <div class="amount-card">
                        <div class="amount-value">${value}</div>
                        <div class="amount-label">${key.replace(/_/g, ' ')}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    if (data.kit_eligible) {
        content += `
            <div class="conditions-list">
                <h5><i class="fas fa-tools me-2"></i>Kit éligible</h5>
                <ul>
                    ${data.kit_eligible.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    if (data.categories) {
        data.categories.forEach((category, index) => {
            content += `
                <div class="subsidy-item">
                    <h4 class="subsidy-title">
                        <i class="fas fa-circle-check"></i>
                        ${category.title}
                    </h4>
            `;

            if (category.reference) {
                content += `
                    <div class="legal-reference">
                        <strong>Référence :</strong> ${category.reference}
                    </div>
                `;
            }

            if (category.validUntil) {
                content += `
                    <div class="validity-info">
                        <i class="fas fa-calendar-alt me-2"></i>
                        <strong>Validité :</strong> ${category.validUntil}
                    </div>
                `;
            }

            if (category.description) {
                content += `<p><em>${category.description}</em></p>`;
            }

            if (category.montant) {
                content += `
                    <div class="amount-card">
                        <div class="amount-value">${category.montant}</div>
                        <div class="amount-label">Montant de l'aide</div>
                    </div>
                `;
            }

            if (category.levels) {
                content += `<div class="amounts-grid">`;
                category.levels.forEach(level => {
                    content += `
                        <div class="amount-card">
                            <div class="amount-value">${level.level}</div>
                            <div class="amount-label">${level.description}</div>
                            <hr>
                            <small>Annuelles: <strong>${level.amounts.annuelles}</strong></small><br>
                            <small>Pérennes: <strong>${level.amounts.perennes}</strong></small>
                        </div>
                    `;
                });
                content += `</div>`;
            }

            if (category.subcategories) {
                content += `
                    <table class="details-table">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Taux/Montant</th>
                                <th>Plafond/Détails</th>
                                ${category.subcategories[0].condition ? '<th>Conditions</th>' : ''}
                            </tr>
                        </thead>
                        <tbody>
                `;
                category.subcategories.forEach(sub => {
                    content += `
                        <tr>
                            <td><strong>${sub.type}</strong></td>
                            <td>${sub.taux || sub.montant || ''}</td>
                            <td>${sub.plafond || sub.plafonds || sub.montants || sub.details || sub.composantes || ''}</td>
                            ${sub.condition ? `<td>${sub.condition}</td>` : category.subcategories[0].condition ? '<td>-</td>' : ''}
                        </tr>
                    `;
                });
                content += `</tbody></table>`;
            }

            if (category.montants && typeof category.montants === 'object') {
                content += `
                    <table class="details-table">
                        <thead>
                            <tr><th>Type</th><th>Montant</th></tr>
                        </thead>
                        <tbody>
                `;
                Object.entries(category.montants).forEach(([key, value]) => {
                    content += `<tr><td>${key.replace(/_/g, ' ')}</td><td><strong>${value}</strong></td></tr>`;
                });
                content += `</tbody></table>`;
            }

            if (category.production_nationale) {
                content += `
                    <div class="subsidy-item">
                        <h5>Production nationale</h5>
                        <table class="details-table">
                            <thead><tr><th>Espèce</th><th>Montant (DH/qt)</th></tr></thead>
                            <tbody>
                `;
                Object.entries(category.production_nationale).forEach(([key, value]) => {
                    content += `<tr><td>${key.replace(/_/g, ' ')}</td><td><strong>${value}</strong></td></tr>`;
                });
                content += `</tbody></table></div>`;
            }

            if (category.importees) {
                content += `
                    <div class="subsidy-item">
                        <h5>Semences importées</h5>
                        <table class="details-table">
                            <thead><tr><th>Catégorie</th><th>Montant (DH/ql)</th></tr></thead>
                            <tbody>
                `;
                Object.entries(category.importees).forEach(([key, value]) => {
                    content += `<tr><td>${key}</td><td><strong>${value}</strong></td></tr>`;
                });
                content += `</tbody></table></div>`;
            }

            if (category.races_eligibles) {
                content += `
                    <div class="conditions-list">
                        <h5><i class="fas fa-list-check me-2"></i>Races éligibles</h5>
                        <ul>
                            ${category.races_eligibles.map(race => `<li>${race}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }

            if (category.items) {
                content += `
                    <table class="details-table">
                        <thead>
                            <tr><th>Opération</th><th>Taux aide additionnelle</th></tr>
                        </thead>
                        <tbody>
                `;
                category.items.forEach(item => {
                    content += `<tr><td>${item.operation}</td><td><strong>${item.taux}</strong></td></tr>`;
                });
                content += `</tbody></table>`;
            }

            if (category.duree) {
                content += `<p><strong>Durée :</strong> ${category.duree}</p>`;
            }

            if (category.plafonds && typeof category.plafonds === 'object') {
                content += `
                    <div class="amounts-grid">
                        ${Object.entries(category.plafonds).map(([key, value]) => `
                            <div class="amount-card">
                                <div class="amount-value">${value}</div>
                                <div class="amount-label">${key.replace(/_/g, ' ')}</div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }

            content += `</div>`;
        });
    }

    if (data.conditions) {
        content += `
            <div class="conditions-list">
                <h5><i class="fas fa-clipboard-check me-2"></i>Conditions et modalités</h5>
                <ul>
        `;
        data.conditions.forEach(condition => {
            content += `<li>${condition}</li>`;
        });
        content += `</ul></div>`;
    }

    content += `</div>`;
    return content;
}

function loadContacts() {
    const contactsGrid = document.getElementById('contactsGrid');
    contactsGrid.innerHTML = contactsData.map(region => `
        <div class="contact-card">
            <h5><i class="fas fa-map-marker-alt me-2"></i>${region.region}</h5>
            ${region.contacts.map(contact => 
                `<div class="contact-item">
                    <i class="fas fa-phone"></i>
                    <strong>${contact.nom}:</strong> ${contact.tel}
                </div>`
            ).join('')}
        </div>
    `).join('');
}

function loadAllCategories() {
    const contentDiv = document.getElementById('categoryContent');
    let allContent = '';
    
    // Générer le contenu pour toutes les catégories
    Object.keys(fdaData).forEach(key => {
        allContent += generateCategoryContent(key, fdaData[key]);
    });
    
    contentDiv.innerHTML = allContent;
}

function showCategoryContent(categoryKey) {
    // Masquer toutes les sections
    const allSections = document.querySelectorAll('.category-section');
    allSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Afficher la section demandée
    const targetSection = document.getElementById(`section-${categoryKey}`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

function setupMainFilters() {
    const mainFilterButtons = document.querySelectorAll('.main-filter-btn');
    const categoryNavigation = document.getElementById('categoryNavigation');
    const categoryContent = document.getElementById('categoryContent');
    const internationalContent = document.getElementById('internationalContent');
    
    // Éléments spécifiques aux subventions nationales
    const strategyIntro = document.querySelector('.strategy-intro');
    const documentSection = document.querySelector('.document-section');
    const searchFilter = document.querySelector('.search-filter');
    const contactsSection = document.getElementById('contacts');
    
    mainFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Mettre à jour les boutons actifs
            mainFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const type = button.getAttribute('data-type');
            currentType = type;
            
            if (type === 'nationaux') {
                // Afficher tous les éléments des subventions nationales
                strategyIntro.style.display = 'block';
                documentSection.style.display = 'block';
                searchFilter.style.display = 'block';
                categoryNavigation.style.display = 'block';
                categoryContent.style.display = 'block';
                contactsSection.style.display = 'block';
                internationalContent.style.display = 'none';
                
                // Charger le contenu et afficher la première catégorie
                loadAllCategories();
                showCategoryContent('jeunes');
                
                // Réinitialiser la navigation des catégories
                const categoryButtons = document.querySelectorAll('#categoryNav .nav-link');
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                document.querySelector('[data-target="jeunes"]').classList.add('active');
                
            } else if (type === 'internationaux') {
                // Masquer tous les éléments spécifiques aux subventions nationales
                strategyIntro.style.display = 'none';
                documentSection.style.display = 'none';
                searchFilter.style.display = 'none';
                categoryNavigation.style.display = 'none';
                categoryContent.style.display = 'none';
                contactsSection.style.display = 'none';
                
                // Afficher uniquement le contenu international
                internationalContent.style.display = 'block';
            }
        });
    });
}

function setupCategoryNavigation() {
    const categoryButtons = document.querySelectorAll('#categoryNav .nav-link');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentType !== 'nationaux') return; // Ne fonctionne que pour les nationaux
            
            // Mettre à jour les boutons actifs
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const target = button.getAttribute('data-target');
            showCategoryContent(target);
        });
    });
}

function setupGlobalSearch() {
    const searchInput = document.getElementById('globalSearch');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        if (currentType !== 'nationaux') return; // La recherche ne fonctionne que pour les nationaux
        
        if (searchTerm.length > 2) {
            const sections = document.querySelectorAll('.category-section');
            sections.forEach(section => {
                const text = section.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    section.classList.add('active');
                    highlightSearchTerm(section, searchTerm);
                } else {
                    section.classList.remove('active');
                }
            });
        } else {
            // Rétablir l'affichage normal
            const sections = document.querySelectorAll('.category-section');
            sections.forEach(section => {
                section.classList.remove('active');
                removeHighlight(section);
            });
            
            // Réafficher la catégorie active
            const activeButton = document.querySelector('#categoryNav .nav-link.active');
            if (activeButton) {
                const target = activeButton.getAttribute('data-target');
                showCategoryContent(target);
            }
        }
    });
}

function highlightSearchTerm(element, term) {
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }
    
    textNodes.forEach(textNode => {
        if (textNode.textContent.toLowerCase().includes(term)) {
            const regex = new RegExp(`(${term})`, 'gi');
            const newContent = textNode.textContent.replace(regex, '<mark>$1</mark>');
            if (newContent !== textNode.textContent) {
                const span = document.createElement('span');
                span.innerHTML = newContent;
                textNode.parentNode.replaceChild(span, textNode);
            }
        }
    });
}

function removeHighlight(element) {
    const marks = element.querySelectorAll('mark');
    marks.forEach(mark => {
        mark.outerHTML = mark.innerHTML;
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing FDA app...');
    console.log('FDA data available:', Object.keys(fdaData));
    
    try {
        // Animation setup for logos
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Observe fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
        
        // Charger le contenu des catégories
        loadAllCategories();
        
        // Charger les contacts
        loadContacts();
        
        // Configurer les filtres principaux
        setupMainFilters();
        
        // Configurer la navigation des catégories
        setupCategoryNavigation();
        
        // Configurer la recherche
        setupGlobalSearch();
        
        // Par défaut : mode nationaux actif
        currentType = 'nationaux';
        
        // S'assurer que tous les éléments nationaux sont visibles par défaut
        const strategyIntro = document.querySelector('.strategy-intro');
        const documentSection = document.querySelector('.document-section');
        const searchFilter = document.querySelector('.search-filter');
        const categoryNavigation = document.getElementById('categoryNavigation');
        const categoryContent = document.getElementById('categoryContent');
        const contactsSection = document.getElementById('contacts');
        const internationalContent = document.getElementById('internationalContent');
        
        // Afficher tous les éléments nationaux
        strategyIntro.style.display = 'block';
        documentSection.style.display = 'block';
        searchFilter.style.display = 'block';
        categoryNavigation.style.display = 'block';
        categoryContent.style.display = 'block';
        contactsSection.style.display = 'block';
        internationalContent.style.display = 'none';
        
        // Par défaut, afficher "Aides aux Jeunes" 
        showCategoryContent('jeunes');
        
        // Marquer le bouton "Aides aux Jeunes" comme actif
        const categoryButtons = document.querySelectorAll('#categoryNav .nav-link');
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector('[data-target="jeunes"]').classList.add('active');
        
        console.log('FDA app initialized successfully');
    } catch (error) {
        console.error('Error initializing FDA app:', error);
    }
    
    // PDF modal error handling
    const pdfModal = document.getElementById('pdfModal');
    if (pdfModal) {
        pdfModal.addEventListener('hidden.bs.modal', function () {
            const pdfViewer = document.getElementById('pdfViewer');
            if (pdfViewer) {
                pdfViewer.src = '';
            }
        });
    }
});