import type { Locale, SeasonProfileId } from "../types";
import type { DataSourceId } from "./sources";

export type CountryOption = {
  code: string;
  profileId: SeasonProfileId;
};

export type CountryDataScope = {
  labels: Record<Locale, string>;
  sourceIds: DataSourceId[];
};

export const seasonProfiles: Record<
  SeasonProfileId,
  {
    labels: Record<Locale, string>;
    confidenceLabel: Record<Locale, string>;
    sourceIds: DataSourceId[];
  }
> = {
  "europe-mountain": {
    labels: {
      fr: "Europe montagne",
      en: "Mountain Europe",
      es: "Europa de montaña",
      de: "Bergregion Europa",
      it: "Europa alpina",
      pt: "Europa de montanha",
    },
    confidenceLabel: {
      fr: "local indicatif",
      en: "local guide",
      es: "guía local",
      de: "lokaler Leitwert",
      it: "guida locale",
      pt: "guia local",
    },
    sourceIds: ["eufic-europe", "ec-calendar"],
  },
  "europe-temperate": {
    labels: {
      fr: "Europe tempérée",
      en: "Temperate Europe",
      es: "Europa templada",
      de: "Gemäßigtes Europa",
      it: "Europa temperata",
      pt: "Europa temperada",
    },
    confidenceLabel: {
      fr: "source Europe",
      en: "Europe source",
      es: "fuente Europa",
      de: "Europa-Quelle",
      it: "fonte Europa",
      pt: "fonte Europa",
    },
    sourceIds: ["eufic-europe", "ec-calendar"],
  },
  mediterranean: {
    labels: {
      fr: "Méditerranéen",
      en: "Mediterranean",
      es: "Mediterráneo",
      de: "Mittelmeerraum",
      it: "Mediterraneo",
      pt: "Mediterrâneo",
    },
    confidenceLabel: {
      fr: "source climat",
      en: "climate source",
      es: "fuente climática",
      de: "Klimaquelle",
      it: "fonte climatica",
      pt: "fonte climática",
    },
    sourceIds: ["eufic-europe", "ec-calendar"],
  },
  "north-temperate": {
    labels: {
      fr: "Nord tempéré",
      en: "Northern temperate",
      es: "Norte templado",
      de: "Nördlich gemäßigt",
      it: "Nord temperato",
      pt: "Norte temperado",
    },
    confidenceLabel: {
      fr: "source + modèle",
      en: "source + model",
      es: "fuente + modelo",
      de: "Quelle + Modell",
      it: "fonte + modello",
      pt: "fonte + modelo",
    },
    sourceIds: ["usda-snaped", "fao-crop-calendar"],
  },
  "south-temperate": {
    labels: {
      fr: "Sud tempéré",
      en: "Southern temperate",
      es: "Sur templado",
      de: "Südlich gemäßigt",
      it: "Sud temperato",
      pt: "Sul temperado",
    },
    confidenceLabel: {
      fr: "modèle hémisphère",
      en: "hemisphere model",
      es: "modelo hemisférico",
      de: "Hemisphärenmodell",
      it: "modello emisfero",
      pt: "modelo hemisférico",
    },
    sourceIds: ["fao-crop-calendar"],
  },
  tropical: {
    labels: {
      fr: "Tropical",
      en: "Tropical",
      es: "Tropical",
      de: "Tropisch",
      it: "Tropicale",
      pt: "Tropical",
    },
    confidenceLabel: {
      fr: "indicatif tropical",
      en: "tropical guide",
      es: "guía tropical",
      de: "Tropen-Leitwert",
      it: "guida tropicale",
      pt: "guia tropical",
    },
    sourceIds: ["fao-crop-calendar"],
  },
};

export const countryDataScopes: Partial<Record<string, CountryDataScope>> = {
  AT: {
    labels: {
      fr: "Autriche: calendrier national du portail public de sante, utile pour les produits regionaux offerts selon les mois.",
      en: "Austria: national public-health portal calendar, useful for regionally offered produce by month.",
      es: "Austria: calendario nacional del portal publico de salud, util para productos regionales disponibles por mes.",
      de: "Osterreich: nationaler Kalender des offentlichen Gesundheitsportals, nutzlich fur regional angebotene Produkte nach Monat.",
      it: "Austria: calendario nazionale del portale pubblico della salute, utile per prodotti regionali disponibili per mese.",
      pt: "Austria: calendario nacional do portal publico de saude, util para produtos regionais disponiveis por mes.",
    },
    sourceIds: ["austria-gesundheit-season-calendar"],
  },
  AU: {
    labels: {
      fr: "Australie: calendrier national indicatif, utile pour une lecture rapide mais pas precis Etat par Etat.",
      en: "Australia: indicative national calendar, useful for a quick read but not state-by-state precision.",
      es: "Australia: calendario nacional indicativo, util para una lectura rapida pero no preciso por estado.",
      de: "Australien: indikativer nationaler Kalender, hilfreich fur einen schnellen Blick, aber nicht bundesstaatengenau.",
      it: "Australia: calendario nazionale indicativo, utile per una lettura rapida ma non preciso Stato per Stato.",
      pt: "Australia: calendario nacional indicativo, util para uma leitura rapida, mas sem precisao por estado.",
    },
    sourceIds: ["australia-health-produce", "seasonal-food-guide-australia"],
  },
  BE: {
    labels: {
      fr: "Belgique: calendrier Vlaanderen/VLAM par mois pour fruits et legumes disponibles; utile comme reference belge, pas une prevision meteo ou magasin.",
      en: "Belgium: Vlaanderen/VLAM month-by-month calendar for available fruit and vegetables; useful as a Belgian reference, not a weather or shop forecast.",
      es: "Belgica: calendario mensual Vlaanderen/VLAM de frutas y verduras disponibles; util como referencia belga, no como prevision meteorologica o de tienda.",
      de: "Belgien: Vlaanderen/VLAM-Monatskalender fur verfugbares Obst und Gemuse; nutzlich als belgische Referenz, nicht als Wetter- oder Ladenprognose.",
      it: "Belgio: calendario mensile Vlaanderen/VLAM per frutta e verdura disponibili; utile come riferimento belga, non come previsione meteo o di negozio.",
      pt: "Belgica: calendario mensal Vlaanderen/VLAM de frutas e legumes disponiveis; util como referencia belga, nao como previsao meteorologica ou de loja.",
    },
    sourceIds: ["belgium-vlaanderen-vlam-season-calendar"],
  },
  BR: {
    labels: {
      fr: "Bresil: table CEAGESP 2026 de quantites ETSP, utile pour un signal de marche de Sao Paulo; pas une precision Etat par Etat.",
      en: "Brazil: CEAGESP 2026 ETSP quantity table, useful as a Sao Paulo market signal; not state-by-state precision.",
      es: "Brasil: tabla CEAGESP 2026 de cantidades ETSP, util como senal del mercado de Sao Paulo; no precision estado por estado.",
      de: "Brasilien: CEAGESP-ETSP-Mengentabelle 2026, nutzlich als Marktsignal Sao Paulo; keine bundesstaatliche Genauigkeit.",
      it: "Brasile: tabella CEAGESP 2026 delle quantita ETSP, utile come segnale del mercato di Sao Paulo; non precisione Stato per Stato.",
      pt: "Brasil: tabela CEAGESP 2026 de quantidades ETSP, util como sinal do mercado de Sao Paulo; nao precisao estado por estado.",
    },
    sourceIds: ["brazil-ceagesp-seasonality"],
  },
  CA: {
    labels: {
      fr: "Canada: donnees Foodland Ontario source-backed pour les produits frais presents dans le catalogue; cela ne remplace pas une precision province par province.",
      en: "Canada: source-backed Foodland Ontario data for fresh produce present in the catalogue; this does not replace province-by-province precision.",
      es: "Canada: datos Foodland Ontario con fuente para productos frescos presentes en el catalogo; no sustituyen una precision provincia por provincia.",
      de: "Kanada: quellengestuetzte Foodland-Ontario-Daten fuer die im Katalog vorhandenen Frischprodukte; das ersetzt keine Genauigkeit nach Provinz.",
      it: "Canada: dati Foodland Ontario supportati da fonte per prodotti freschi presenti nel catalogo; non sostituiscono una precisione provincia per provincia.",
      pt: "Canada: dados Foodland Ontario com fonte para produtos frescos presentes no catalogo; nao substituem precisao provincia por provincia.",
    },
    sourceIds: ["foodland-ontario-availability"],
  },
  CZ: {
    labels: {
      fr: "Tchequie: calendrier MZe 2026 des periodes de maturation, recolte et stockage pour fruits, legumes et pommes de terre cultives en Republique tcheque.",
      en: "Czechia: 2026 MZe calendar for ripening, harvest and storage periods of fruits, vegetables and potatoes grown in the Czech Republic.",
      es: "Chequia: calendario MZe 2026 de maduracion, cosecha y almacenamiento de frutas, verduras y patatas cultivadas en la Republica Checa.",
      de: "Tschechien: MZe-Kalender 2026 fuer Reife-, Ernte- und Lagerzeiten von in Tschechien angebautem Obst, Gemuese und Kartoffeln.",
      it: "Cechia: calendario MZe 2026 dei periodi di maturazione, raccolta e conservazione di frutta, verdura e patate coltivate nella Repubblica Ceca.",
      pt: "Chequia: calendario MZe 2026 de maturacao, colheita e armazenamento de frutas, legumes e batatas cultivados na Republica Checa.",
    },
    sourceIds: ["czech-mze-harvest-storage-calendar"],
  },
  DK: {
    labels: {
      fr: "Danemark: affiches mensuelles officielles de la Fødevarestyrelsen pour un echantillon de fruits et legumes de saison.",
      en: "Denmark: official Danish Food Agency monthly posters for a sample of seasonal fruit and vegetables.",
      es: "Dinamarca: carteles mensuales oficiales de la Agencia Danesa de Alimentos para una muestra de frutas y verduras de temporada.",
      de: "Danemark: offizielle Monatsplakate der danischen Lebensmittelbehorde fur eine Auswahl saisonaler Obst- und Gemusearten.",
      it: "Danimarca: poster mensili ufficiali dell'Agenzia alimentare danese per un campione di frutta e verdura di stagione.",
      pt: "Dinamarca: cartazes mensais oficiais da Agencia Dinamarquesa de Alimentos para uma amostra de frutas e legumes da epoca.",
    },
    sourceIds: ["denmark-foedevarestyrelsen-season-posters"],
  },
  FI: {
    labels: {
      fr: "Finlande: guide Luontoon des aliments de saison par grandes periodes; utile pour une lecture nationale pratique, pas une precision mensuelle agricole.",
      en: "Finland: Luontoon guide to seasonal foods by broad season; useful as practical national guidance, not month-level agricultural precision.",
      es: "Finlandia: guia Luontoon de alimentos de temporada por grandes estaciones; util como orientacion nacional practica, no precision agricola mensual.",
      de: "Finnland: Luontoon-Leitfaden zu saisonalen Lebensmitteln nach groben Jahreszeiten; praktische nationale Orientierung, keine monatsscharfe Agrarprognose.",
      it: "Finlandia: guida Luontoon agli alimenti di stagione per grandi periodi; utile come orientamento nazionale pratico, non precisione agricola mensile.",
      pt: "Finlandia: guia Luontoon de alimentos sazonais por grandes epocas; util como orientacao nacional pratica, nao precisao agricola mensal.",
    },
    sourceIds: ["finland-luontoon-seasonal-food"],
  },
  SI: {
    labels: {
      fr: "Slovenie: calendrier saisonnier du gouvernement pour les achats publics verts, avec offre forte et offre disponible pour legumes, fruits et pommes.",
      en: "Slovenia: government green-procurement seasonal calendar, with strong and available supply periods for vegetables, fruit and apples.",
      es: "Eslovenia: calendario estacional gubernamental de compras publicas verdes, con periodos de oferta fuerte y disponible para verduras, frutas y manzanas.",
      de: "Slowenien: staatlicher Saisonkalender fuer gruenes oeffentliches Beschaffungswesen, mit starken und verfuegbaren Angebotszeiten fuer Gemuese, Obst und Aepfel.",
      it: "Slovenia: calendario stagionale governativo per gli appalti pubblici verdi, con periodi di offerta forte e disponibile per verdure, frutta e mele.",
      pt: "Eslovenia: calendario sazonal governamental de compras publicas verdes, com periodos de oferta forte e disponivel para legumes, frutas e macas.",
    },
    sourceIds: ["slovenia-gov-green-procurement-season-calendar"],
  },
  GR: {
    labels: {
      fr: "Grece: calendrier mensuel Food For Health pour fruits et legumes courants, recoupe avec le profil mediterraneen de la Commission europeenne; guide nutritionnel national, pas calendrier agricole gouvernemental.",
      en: "Greece: Food For Health monthly calendar for common fruit and vegetables, cross-checked with the European Commission Mediterranean profile; national nutrition guidance, not a government agricultural calendar.",
      es: "Grecia: calendario mensual Food For Health de frutas y verduras comunes, contrastado con el perfil mediterraneo de la Comision Europea; guia nutricional nacional, no calendario agricola gubernamental.",
      de: "Griechenland: monatlicher Food-For-Health-Kalender fur gangiges Obst und Gemuse, mit dem mediterranen Profil der Europaischen Kommission abgeglichen; nationale Ernahrungsorientierung, kein staatlicher Agrarkalender.",
      it: "Grecia: calendario mensile Food For Health per frutta e verdura comuni, confrontato con il profilo mediterraneo della Commissione europea; guida nutrizionale nazionale, non calendario agricolo governativo.",
      pt: "Grecia: calendario mensal Food For Health para frutas e legumes comuns, cruzado com o perfil mediterranico da Comissao Europeia; orientacao nutricional nacional, nao calendario agricola governamental.",
    },
    sourceIds: ["greece-foodforhealth-season-calendar", "ec-calendar"],
  },
  HR: {
    labels: {
      fr: "Croatie: calendrier Plodovi.hr des fruits, legumes et herbes de saison en Croatie; source pratique de circuit court local, pas calendrier gouvernemental ni precision par region.",
      en: "Croatia: Plodovi.hr calendar for seasonal fruit, vegetables and herbs in Croatia; practical local short-supply-chain source, not a government calendar or regional precision.",
      es: "Croacia: calendario Plodovi.hr de frutas, verduras y hierbas de temporada en Croacia; fuente local practica de cadena corta, no calendario gubernamental ni precision regional.",
      de: "Kroatien: Plodovi.hr-Kalender fuer saisonales Obst, Gemuese und Kraeuter in Kroatien; praktische lokale Kurzlieferketten-Quelle, kein Regierungskalender und keine regionale Genauigkeit.",
      it: "Croazia: calendario Plodovi.hr di frutta, verdura ed erbe di stagione in Croazia; fonte locale pratica di filiera corta, non calendario governativo ne precisione regionale.",
      pt: "Croacia: calendario Plodovi.hr de frutas, legumes e ervas da epoca na Croacia; fonte local pratica de cadeia curta, nao calendario governamental nem precisao regional.",
    },
    sourceIds: ["croatia-plodovi-season-calendar"],
  },
  HU: {
    labels: {
      fr: "Hongrie: table mensuelle Novenytar pour fruits et legumes de saison; source pratique locale, pas calendrier gouvernemental agricole ni precision par comitat.",
      en: "Hungary: Novenytar monthly table for seasonal fruit and vegetables; practical local source, not a government agricultural calendar or county-level precision.",
      es: "Hungria: tabla mensual Novenytar de frutas y verduras de temporada; fuente local practica, no calendario agricola gubernamental ni precision por condado.",
      de: "Ungarn: monatliche Novenytar-Tabelle fur saisonales Obst und Gemuse; praktische lokale Quelle, kein staatlicher Agrarkalender und keine Komitatsgenauigkeit.",
      it: "Ungheria: tabella mensile Novenytar per frutta e verdura di stagione; fonte locale pratica, non calendario agricolo governativo ne precisione per contea.",
      pt: "Hungria: tabela mensal Novenytar de frutas e legumes da epoca; fonte local pratica, nao calendario agricola governamental nem precisao por condado.",
    },
    sourceIds: ["hungary-novenytar-season-table"],
  },
  IN: {
    labels: {
      fr: "Inde: donnees nationales agregees; les saisons varient fortement selon les Etats, l'altitude et les moussons.",
      en: "India: aggregated national data; seasons vary strongly by state, altitude and monsoon pattern.",
      es: "India: datos nacionales agregados; las temporadas varian mucho por estado, altitud y monzon.",
      de: "Indien: aggregierte nationale Daten; Saisons variieren stark nach Bundesstaat, Hohe und Monsun.",
      it: "India: dati nazionali aggregati; le stagioni variano molto per Stato, altitudine e monsone.",
      pt: "India: dados nacionais agregados; as estacoes variam muito por estado, altitude e moncoes.",
    },
    sourceIds: [
      "india-apeda-produce",
      "india-desagri-vegetable-harvest",
      "india-desagri-fruit-harvest",
      "india-nhb-litchi",
    ],
  },
  IE: {
    labels: {
      fr: "Irlande: calendrier Bord Bia Best in Season pour produits frais irlandais, incluant saison pleine, entrees/sorties de saison et stockage.",
      en: "Ireland: Bord Bia Best in Season calendar for Irish fresh produce, including full season, coming in/out of season and storage.",
      es: "Irlanda: calendario Bord Bia Best in Season para productos frescos irlandeses, con plena temporada, entrada/salida de temporada y almacenamiento.",
      de: "Irland: Bord Bia Best in Season-Kalender fur irische Frischprodukte, mit Hauptsaison, Saisonubergangen und Lagerware.",
      it: "Irlanda: calendario Bord Bia Best in Season per prodotti freschi irlandesi, con piena stagione, entrata/uscita stagione e conservazione.",
      pt: "Irlanda: calendario Bord Bia Best in Season para produtos frescos irlandeses, com epoca plena, entrada/saida de epoca e armazenamento.",
    },
    sourceIds: ["ireland-bord-bia-best-in-season"],
  },
  MX: {
    labels: {
      fr: "Mexique: donnees sourcees surtout pour le quatrieme trimestre; le reste reste indicatif.",
      en: "Mexico: source-backed mainly for the fourth quarter; the rest remains indicative.",
      es: "Mexico: datos con fuente sobre todo para el cuarto trimestre; el resto sigue siendo indicativo.",
      de: "Mexiko: Quellenbelege vor allem fur das vierte Quartal; der Rest bleibt indikativ.",
      it: "Messico: dati con fonte soprattutto per il quarto trimestre; il resto resta indicativo.",
      pt: "Mexico: dados com fonte sobretudo para o quarto trimestre; o restante continua indicativo.",
    },
    sourceIds: ["mexico-profeco-seasonal-q4"],
  },
  NO: {
    labels: {
      fr: "Norvege: calendrier national Frukt.no/OFG pour produits norvegiens en saison, utile pour la disponibilite locale par mois.",
      en: "Norway: Frukt.no/OFG national calendar for Norwegian produce in season, useful for local month-by-month availability.",
      es: "Noruega: calendario nacional Frukt.no/OFG de productos noruegos de temporada, util para disponibilidad local por mes.",
      de: "Norwegen: nationaler Frukt.no/OFG-Kalender fur norwegische Saisonprodukte, nutzlich fur lokale Monatsverfugbarkeit.",
      it: "Norvegia: calendario nazionale Frukt.no/OFG per prodotti norvegesi di stagione, utile per disponibilita locale mese per mese.",
      pt: "Noruega: calendario nacional Frukt.no/OFG para produtos noruegueses da epoca, util para disponibilidade local mensal.",
    },
    sourceIds: ["norway-frukt-season-calendar"],
  },
  PT: {
    labels: {
      fr: "Portugal: donnees GPP de calendrier de production national 2016; utile pour la saison de production, pas une disponibilite magasin actuelle.",
      en: "Portugal: GPP national 2016 production-calendar data; useful for production season, not current shop availability.",
      es: "Portugal: datos GPP del calendario nacional de produccion 2016; utiles para temporada de produccion, no disponibilidad actual en tienda.",
      de: "Portugal: nationale GPP-Produktionskalenderdaten 2016; nutzlich fur Produktionssaisons, nicht aktuelle Ladenverfugbarkeit.",
      it: "Portogallo: dati GPP del calendario nazionale di produzione 2016; utili per la stagione produttiva, non per la disponibilita attuale in negozio.",
      pt: "Portugal: dados GPP do calendario nacional de producao de 2016; uteis para epoca de producao, nao disponibilidade atual em loja.",
    },
    sourceIds: ["portugal-gpp-plant-products"],
  },
  PL: {
    labels: {
      fr: "Pologne: guide KOWR Kupuj Swiadomie 2025 pour fruits et legumes, mappe par grandes saisons avec stockage et conservation; moins precis qu'un calendrier mois par mois.",
      en: "Poland: KOWR Kupuj Swiadomie 2025 fruit and vegetable guide, mapped by broad seasons with storage and preservation; less precise than a month-by-month calendar.",
      es: "Polonia: guia KOWR Kupuj Swiadomie 2025 de frutas y verduras, mapeada por grandes estaciones con almacenamiento y conservacion; menos precisa que un calendario mensual.",
      de: "Polen: KOWR-Kupuj-Swiadomie-Leitfaden 2025 fur Obst und Gemuse, nach breiten Jahreszeiten mit Lagerung und Konservierung abgebildet; weniger genau als ein Monatskalender.",
      it: "Polonia: guida KOWR Kupuj Swiadomie 2025 per frutta e verdura, mappata per grandi stagioni con conservazione; meno precisa di un calendario mensile.",
      pt: "Polonia: guia KOWR Kupuj Swiadomie 2025 de frutas e legumes, mapeado por grandes estacoes com armazenamento e conservacao; menos preciso que um calendario mensal.",
    },
    sourceIds: ["poland-kowr-conscious-consumer-guide"],
  },
  SE: {
    labels: {
      fr: "Suede: guide ICA des legumes, fruits et baies suedoises de saison; utile comme guide national pratique, pas une source gouvernementale ni une precision regionale.",
      en: "Sweden: ICA guide to Swedish vegetables, fruit and berries in season; useful as practical national guidance, not a government source or regional precision.",
      es: "Suecia: guia de ICA de verduras, frutas y bayas suecas de temporada; util como guia nacional practica, no como fuente gubernamental ni precision regional.",
      de: "Schweden: ICA-Leitfaden zu schwedischem Gemuese, Obst und Beeren der Saison; praktische nationale Orientierung, keine Regierungsquelle oder regionale Genauigkeit.",
      it: "Svezia: guida ICA a verdure, frutta e bacche svedesi di stagione; utile come guida nazionale pratica, non come fonte governativa o precisione regionale.",
      pt: "Suecia: guia ICA de legumes, frutas e bagas suecas da epoca; util como orientacao nacional pratica, nao como fonte governamental nem precisao regional.",
    },
    sourceIds: ["sweden-ica-season-guide"],
  },
};

const allCountryCodes =
  "AF AX AL DZ AS AD AO AI AQ AG AR AM AW AU AT AZ BS BH BD BB BY BE BZ BJ BM BT BO BQ BA BW BV BR IO BN BG BF BI CV KH CM CA KY CF TD CL CN CX CC CO KM CG CD CK CR CI HR CU CW CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FK FO FJ FI FR GF PF TF GA GM GE DE GH GI GR GL GD GP GU GT GG GN GW GY HT HM VA HN HK HU IS IN ID IR IQ IE IM IL IT JM JP JE JO KZ KE KI KP KR KW KG LA LV LB LS LR LY LI LT LU MO MG MW MY MV ML MT MH MQ MR MU YT MX FM MD MC MN ME MS MA MZ MM NA NR NP NL NC NZ NI NE NG NU NF MK MP NO OM PK PW PS PA PG PY PE PH PN PL PT PR QA RE RO RU RW BL SH KN LC MF PM VC WS SM ST SA SN RS SC SL SG SX SK SI SB SO ZA GS SS ES LK SD SR SJ SE CH SY TW TJ TZ TH TL TG TK TO TT TN TR TM TC TV UG UA AE GB US UM UY UZ VU VE VN VG VI WF EH YE ZM ZW";

const countryCodes = allCountryCodes.split(" ");

const southTemperate = new Set([
  "AR",
  "AU",
  "CL",
  "NZ",
  "UY",
  "ZA",
  "LS",
  "SZ",
  "FK",
  "GS",
]);

const tropical = new Set([
  "AO",
  "AI",
  "AG",
  "AW",
  "BS",
  "BB",
  "BZ",
  "BJ",
  "BO",
  "BR",
  "BF",
  "BI",
  "CV",
  "KH",
  "CM",
  "KY",
  "CF",
  "TD",
  "CO",
  "KM",
  "CG",
  "CD",
  "CR",
  "CI",
  "CU",
  "CW",
  "DJ",
  "DM",
  "DO",
  "EC",
  "SV",
  "GQ",
  "ER",
  "ET",
  "FJ",
  "GF",
  "PF",
  "GA",
  "GM",
  "GH",
  "GD",
  "GP",
  "GT",
  "GN",
  "GW",
  "GY",
  "HT",
  "HN",
  "IN",
  "ID",
  "JM",
  "KE",
  "KI",
  "LA",
  "LR",
  "MG",
  "MW",
  "MY",
  "MV",
  "ML",
  "MQ",
  "MR",
  "MU",
  "MX",
  "MZ",
  "MM",
  "NA",
  "NI",
  "NE",
  "NG",
  "PA",
  "PG",
  "PY",
  "PE",
  "PH",
  "PR",
  "RE",
  "RW",
  "WS",
  "ST",
  "SN",
  "SC",
  "SL",
  "SG",
  "SB",
  "SO",
  "SS",
  "LK",
  "SD",
  "SR",
  "TZ",
  "TH",
  "TL",
  "TG",
  "TO",
  "TT",
  "UG",
  "VU",
  "VE",
  "VN",
  "YE",
  "ZM",
  "ZW",
]);

const mediterranean = new Set([
  "CY",
  "GR",
  "IT",
  "MT",
  "PT",
  "ES",
  "TR",
  "MA",
  "DZ",
  "TN",
  "LY",
  "EG",
  "IL",
  "LB",
  "SY",
]);

const mountain = new Set(["CH", "AT", "LI", "NP", "BT"]);

const europeTemperate = new Set([
  "BE",
  "BG",
  "HR",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "HU",
  "IE",
  "LV",
  "LT",
  "LU",
  "NL",
  "NO",
  "PL",
  "RO",
  "RS",
  "SK",
  "SI",
  "SE",
  "GB",
]);

export const countryOptions: CountryOption[] = countryCodes.map((code) => ({
  code,
  profileId: getProfileForCountry(code),
}));

export function getProfileForCountry(code: string): SeasonProfileId {
  if (mountain.has(code)) return "europe-mountain";
  if (mediterranean.has(code)) return "mediterranean";
  if (europeTemperate.has(code)) return "europe-temperate";
  if (southTemperate.has(code)) return "south-temperate";
  if (tropical.has(code)) return "tropical";
  return "north-temperate";
}

export function getCountryName(code: string, locale: Locale) {
  try {
    return new Intl.DisplayNames([locale], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
}
