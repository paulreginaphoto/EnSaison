import { useState } from "react";
import {
  CalendarClock,
  ChevronRight,
  CircleHelp,
  Globe2,
  MapPin,
  Plane,
} from "lucide-react";
import { getItemName } from "../lib/season";
import { getItemThumbnail } from "../lib/itemThumbnails";
import type { SeasonItem, SeasonStatus } from "../types";
import type { ResolvedSeason } from "../lib/season";
import type { Locale, SeasonCategory, SupplyOrigin } from "../types";
import { dataSources } from "../data/sources";
import { ProduceIcon } from "./ProduceIcon";
import { SeasonMiniChart } from "./SeasonMiniChart";

type SeasonItemRowProps = {
  item: SeasonItem;
  status: SeasonStatus;
  season: ResolvedSeason;
  locale: Locale;
  selectedMonth: number;
  labels: {
    categories: Record<SeasonCategory, string>;
    statuses: Record<SeasonStatus, string>;
    confidence: Record<"source" | "model" | "indicative" | "taxonomy", string>;
    sourceShort: string;
    details: string;
    hideDetails: string;
    dataLevel: string;
    supplyOriginLabel: string;
    supplyOrigins: Record<SupplyOrigin, string>;
    seasonPeriod: string;
  };
};

const statusClasses: Record<SeasonStatus, string> = {
  "in-season": "badge-in-season",
  soon: "badge-soon",
  out: "badge-out",
  variable: "badge-variable",
};

const itemStatusLabels: Record<
  Locale,
  {
    available: string;
    inSeason: string;
    out: string;
    peak: string;
    soon: string;
    variable: string;
  }
> = {
  fr: {
    available: "Disponible",
    inSeason: "De saison",
    out: "Hors saison",
    peak: "Pleine saison",
    soon: "Bientôt / fin",
    variable: "Variable",
  },
  en: {
    available: "Available",
    inSeason: "In season",
    out: "Out of season",
    peak: "Peak season",
    soon: "Near season",
    variable: "Variable",
  },
  es: {
    available: "Disponible",
    inSeason: "De temporada",
    out: "Fuera de temporada",
    peak: "Plena temporada",
    soon: "Pronto / fin",
    variable: "Variable",
  },
  de: {
    available: "Verfügbar",
    inSeason: "Saisonal",
    out: "Außer Saison",
    peak: "Hauptsaison",
    soon: "Bald / Ende",
    variable: "Variabel",
  },
  it: {
    available: "Disponibile",
    inSeason: "Di stagione",
    out: "Fuori stagione",
    peak: "Piena stagione",
    soon: "Quasi / fine",
    variable: "Variabile",
  },
  pt: {
    available: "Disponível",
    inSeason: "Da época",
    out: "Fora de época",
    peak: "Plena época",
    soon: "Perto / fim",
    variable: "Variável",
  },
};

const itemOriginLabels: Record<Locale, Record<SupplyOrigin, string>> = {
  fr: {
    local: "Local",
    imported: "Importé",
    regional: "Régional",
    unknown: "À vérifier",
  },
  en: {
    local: "Local",
    imported: "Imported",
    regional: "Regional",
    unknown: "Check",
  },
  es: {
    local: "Local",
    imported: "Importado",
    regional: "Regional",
    unknown: "Verificar",
  },
  de: {
    local: "Lokal",
    imported: "Importiert",
    regional: "Regional",
    unknown: "Prüfen",
  },
  it: {
    local: "Locale",
    imported: "Importato",
    regional: "Regionale",
    unknown: "Da verificare",
  },
  pt: {
    local: "Local",
    imported: "Importado",
    regional: "Regional",
    unknown: "Verificar",
  },
};

const itemOriginNotes: Record<
  Locale,
  {
    imported: string;
    localInSeason: string;
    localOut: string;
    localSoon: string;
    regionalInSeason: string;
    regionalOut: string;
    regionalSoon: string;
    unknown: string;
    variable: string;
  }
> = {
  fr: {
    imported: "Importation nécessaire",
    localInSeason: "Production locale possible",
    localOut: "Hors période locale habituelle",
    localSoon: "Production locale proche ou en fin",
    regionalInSeason: "Repère régional de saison",
    regionalOut: "Hors période régionale habituelle",
    regionalSoon: "Repère régional proche ou en fin",
    unknown: "Origine à vérifier",
    variable: "Saisonnalité à confirmer",
  },
  en: {
    imported: "Import required",
    localInSeason: "Local production possible",
    localOut: "Outside the usual local season",
    localSoon: "Local season near or ending",
    regionalInSeason: "Regional season guide",
    regionalOut: "Outside the usual regional season",
    regionalSoon: "Regional season near or ending",
    unknown: "Origin to check",
    variable: "Seasonality to confirm",
  },
  es: {
    imported: "Importación necesaria",
    localInSeason: "Producción local posible",
    localOut: "Fuera del periodo local habitual",
    localSoon: "Producción local próxima o finalizando",
    regionalInSeason: "Guía regional de temporada",
    regionalOut: "Fuera del periodo regional habitual",
    regionalSoon: "Guía regional próxima o finalizando",
    unknown: "Origen por verificar",
    variable: "Temporalidad por confirmar",
  },
  de: {
    imported: "Import nötig",
    localInSeason: "Lokale Produktion möglich",
    localOut: "Außerhalb der üblichen lokalen Saison",
    localSoon: "Lokale Saison bald oder am Ende",
    regionalInSeason: "Regionaler Saisonleitwert",
    regionalOut: "Außerhalb der üblichen regionalen Saison",
    regionalSoon: "Regional bald oder am Ende",
    unknown: "Herkunft prüfen",
    variable: "Saisonalität prüfen",
  },
  it: {
    imported: "Importazione necessaria",
    localInSeason: "Produzione locale possibile",
    localOut: "Fuori dal periodo locale abituale",
    localSoon: "Produzione locale vicina o in chiusura",
    regionalInSeason: "Guida regionale di stagione",
    regionalOut: "Fuori dal periodo regionale abituale",
    regionalSoon: "Guida regionale vicina o in chiusura",
    unknown: "Origine da verificare",
    variable: "Stagionalità da confermare",
  },
  pt: {
    imported: "Importação necessária",
    localInSeason: "Produção local possível",
    localOut: "Fora do período local habitual",
    localSoon: "Produção local próxima ou no fim",
    regionalInSeason: "Guia regional da época",
    regionalOut: "Fora do período regional habitual",
    regionalSoon: "Guia regional próximo ou no fim",
    unknown: "Origem a verificar",
    variable: "Sazonalidade a confirmar",
  },
};

const seasonalityLabels: Record<Locale, string> = {
  fr: "Saisonnalité",
  en: "Seasonality",
  es: "Temporalidad",
  de: "Saisonalität",
  it: "Stagionalità",
  pt: "Sazonalidade",
};

function getStatusBadgeLabel(
  status: SeasonStatus,
  origin: SupplyOrigin,
  locale: Locale,
) {
  const labels = itemStatusLabels[locale];
  if (status === "in-season") {
    if (origin === "local") return labels.peak;
    if (origin === "imported" || origin === "unknown") return labels.available;
    return labels.inSeason;
  }

  return labels[status];
}

function getOriginNote(
  status: SeasonStatus,
  origin: SupplyOrigin,
  locale: Locale,
) {
  const labels = itemOriginNotes[locale];
  if (status === "variable") return labels.variable;
  if (origin === "imported") return labels.imported;
  if (origin === "unknown") return labels.unknown;

  if (origin === "local") {
    if (status === "out") return labels.localOut;
    if (status === "soon") return labels.localSoon;
    return labels.localInSeason;
  }

  if (status === "out") return labels.regionalOut;
  if (status === "soon") return labels.regionalSoon;
  return labels.regionalInSeason;
}

function getOriginNoteIcon(status: SeasonStatus, origin: SupplyOrigin) {
  if (status === "out" && origin !== "imported" && origin !== "unknown") {
    return CalendarClock;
  }

  if (origin === "local") return MapPin;
  if (origin === "imported") return Plane;
  if (origin === "regional") return Globe2;
  return CircleHelp;
}

export function SeasonItemRow({
  item,
  status,
  season,
  locale,
  selectedMonth,
  labels,
}: SeasonItemRowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const sourceCount = season.sourceIds.length;
  const detailsLabel = isOpen ? labels.hideDetails : labels.details;
  const thumbnail = getItemThumbnail(item.id);
  const statusBadgeLabel = getStatusBadgeLabel(status, season.origin, locale);
  const originBadgeLabel = itemOriginLabels[locale][season.origin];
  const originNote = getOriginNote(status, season.origin, locale);
  const OriginNoteIcon = getOriginNoteIcon(status, season.origin);

  return (
    <li
      className="item-row"
      data-category={item.category}
      data-item-id={item.id}
      data-origin={season.origin}
      data-season-row
      data-status={status}
    >
      {thumbnail ? (
        <img
          alt=""
          className="item-photo"
          loading="lazy"
          src={thumbnail}
        />
      ) : (
        <ProduceIcon category={item.category} icon={item.icon} />
      )}
      <div className="item-row-content">
        <div className="item-row-main">
          <div className="item-identity">
            <p className="item-name">
              {getItemName(item, locale)}
            </p>
            <p className="item-category">
              {labels.categories[item.category]}
            </p>
            <div className="item-badge-line">
              <span
                className={`item-status-badge ${statusClasses[status]}`}
                data-item-status-badge
              >
                <span aria-hidden="true" className="item-status-dot" />
                {statusBadgeLabel}
              </span>
            </div>
            <p
              className={`item-origin-note origin-note-${season.origin}`}
              data-item-origin-note
            >
              <span className="item-origin-icon-shell" aria-hidden="true">
                <OriginNoteIcon className="item-origin-note-icon" />
              </span>
              {originNote}
            </p>
          </div>
          <div className="item-row-aside">
            <span
              className={`item-origin-badge origin-${season.origin}`}
              data-item-origin-badge
            >
              {originBadgeLabel}
            </span>
            <button
              aria-label={`${detailsLabel} (${sourceCount})`}
              aria-expanded={isOpen}
              className="details-button"
              title={detailsLabel}
              type="button"
              onClick={() => setIsOpen((value) => !value)}
            >
              <ChevronRight aria-hidden="true" className="details-chevron" />
            </button>
          </div>
        </div>
        <p className="item-season">
          <span className="item-season-heading">
            <span>{seasonalityLabels[locale]}</span>
            <span className="season-period-value">{season.seasonLabel}</span>
          </span>
          <SeasonMiniChart
            labels={labels.statuses}
            locale={locale}
            periodLabel={labels.seasonPeriod}
            season={season}
            selectedMonth={selectedMonth}
          />
        </p>
        {isOpen ? (
          <div className="details-panel">
            <dl className="grid gap-1.5">
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-semibold text-ink">{labels.seasonPeriod}</dt>
                <dd>{season.seasonLabel}</dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-semibold text-ink">{labels.dataLevel}</dt>
                <dd>{labels.confidence[season.confidence]}</dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-semibold text-ink">{labels.supplyOriginLabel}</dt>
                <dd>{labels.supplyOrigins[season.origin]}</dd>
              </div>
            </dl>
            <div className="mt-2 flex flex-wrap gap-2">
              {season.sourceIds.slice(0, 4).map((sourceId) => {
                const source = dataSources[sourceId as keyof typeof dataSources];
                return (
                  <a
                    aria-label={source?.label ?? labels.sourceShort}
                    className="source-link"
                    href={source?.url}
                    key={sourceId}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {source?.label ?? sourceId}
                  </a>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </li>
  );
}
