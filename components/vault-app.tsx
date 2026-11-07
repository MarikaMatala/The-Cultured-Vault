"use client";

import { useEffect, useMemo, useState } from "react";
import type { AppConfig, Locale } from "@/lib/config";
import type { CatalogueEntry } from "@/lib/catalogue";
import { messages, type CategoryKey } from "@/lib/i18n";

interface VaultAppProps {
  config: AppConfig;
  entries: CatalogueEntry[];
}

type SortOrder = "title" | "newest";

const categoryKeys: CategoryKey[] = [
  "all",
  "films",
  "series",
  "animation",
  "documentaries",
  "music",
  "podcasts",
  "games",
  "books",
  "comics",
];

const categoryMediaTypes: Partial<Record<CategoryKey, string[]>> = {
  films: ["film"],
  series: ["tv-series"],
  animation: ["animation-film", "animated-series"],
  documentaries: ["documentary"],
  music: ["music-album"],
  podcasts: ["podcast"],
  games: ["video-game"],
  books: ["book"],
  comics: ["comic"],
};

function matchesCategory(entry: CatalogueEntry, category: CategoryKey): boolean {
  if (category === "all") {
    return true;
  }

  return categoryMediaTypes[category]?.includes(entry.mediaType) ?? false;
}

function coverVariant(mediaType: string): string {
  if (mediaType === "film") return "cover-film";
  if (mediaType === "tv-series") return "cover-series";
  if (mediaType === "animation-film" || mediaType === "animated-series") return "cover-animation";
  if (mediaType === "documentary") return "cover-documentary";
  if (mediaType === "music-album" || mediaType === "podcast") return "cover-audio";
  if (mediaType === "book" || mediaType === "comic") return "cover-book";
  if (mediaType === "video-game") return "cover-game";
  return "cover-film";
}

function mediaTypeLabel(mediaType: string, locale: Locale): string {
  const dictionary = messages[locale].mediaTypes as Record<string, string>;
  return dictionary[mediaType] ?? mediaType.replaceAll("-", " ");
}

function creatorName(entry: CatalogueEntry): string | undefined {
  return entry.creator || entry.artist || entry.author;
}

export function VaultApp({ config, entries }: VaultAppProps) {
  const [locale, setLocale] = useState<Locale>(config.defaultLocale);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("title");
  const t = messages[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const visibleEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(locale === "fi" ? "fi-FI" : "en-US");

    const filtered = entries.filter((entry) => {
      if (!matchesCategory(entry, activeCategory)) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const searchableText = [
        entry.title,
        entry.originalTitle,
        entry.mediaType,
        entry.country,
        creatorName(entry),
        ...(entry.genres ?? []),
        ...(entry.tags ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase(locale === "fi" ? "fi-FI" : "en-US");

      return searchableText.includes(normalizedQuery);
    });

    return [...filtered].sort((first, second) => {
      if (sortOrder === "newest") {
        return (second.releaseYear ?? 0) - (first.releaseYear ?? 0);
      }

      return first.title.localeCompare(second.title, locale === "fi" ? "fi-FI" : "en-US");
    });
  }, [activeCategory, entries, locale, query, sortOrder]);

  const resultLabel = visibleEntries.length === 1 ? t.resultSingular : t.resultPlural;

  function clearFilters() {
    setQuery("");
    setActiveCategory("all");
    setSortOrder("title");
  }

  return (
    <main id="top" className="min-h-screen">
      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#top" aria-label={config.appName + " home"}>
            <span className="brand-mark" aria-hidden="true">
              CV
            </span>
            <span className="brand-copy">
              <strong>{config.appName}</strong>
              <small>{t.brandKicker}</small>
            </span>
          </a>

          <nav className="primary-nav" aria-label={t.navLabel}>
            <a href="#catalogue">{t.explore}</a>
            <a href="#about">{t.about}</a>
            <a href="#status">{t.projectStatus}</a>
          </nav>

          <div className="header-actions">
            <div className="locale-switch" role="group" aria-label={t.language}>
              <button
                type="button"
                aria-pressed={locale === "en"}
                onClick={() => setLocale("en")}
              >
                EN
              </button>
              <button
                type="button"
                aria-pressed={locale === "fi"}
                onClick={() => setLocale("fi")}
              >
                FI
              </button>
            </div>
            <span className="status-pill">
              <span className="status-dot" aria-hidden="true" />
              {t.demoStatus}
            </span>
          </div>
        </div>
      </header>

      <section className="shell hero" aria-labelledby="hero-title">
        <div>
          <span className="eyebrow">{t.heroEyebrow}</span>
          <h1 id="hero-title">
            {t.heroTitleBefore}
            <span>{t.heroTitleAccent}</span>
          </h1>
          <p className="hero-tagline">{config.tagline}</p>
          <p className="hero-description">{t.heroDescription}</p>

          <div className="hero-actions">
            <a className="button-primary" href="#catalogue">
              {t.exploreCatalogue}
              <span aria-hidden="true"> ↗</span>
            </a>
            <a className="button-secondary" href="#about">
              {t.readVision}
            </a>
          </div>

          <div className="hero-stats" aria-label="Catalogue overview">
            <div className="hero-stat">
              <strong>{entries.length}</strong>
              <span>{t.statsWorks}</span>
            </div>
            <div className="hero-stat">
              <strong>9</strong>
              <span>{t.statsFormats}</span>
            </div>
            <div className="hero-stat">
              <strong>02</strong>
              <span>{t.statsLanguages}</span>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="vault-illustration">
            <span className="vault-orbit vault-orbit-one" />
            <span className="vault-orbit vault-orbit-two" />
            <span className="vault-orbit vault-orbit-three" />
            <div className="vault-seal">
              <strong>CV</strong>
              <span>EST. 2026</span>
            </div>
          </div>
        </div>
      </section>

      <div className="shell">
        <aside className="sample-notice" aria-label="Demo data notice">
          <span className="status-dot" aria-hidden="true" />
          <span>{t.sampleNotice}</span>
        </aside>
      </div>

      <section id="catalogue" className="shell catalogue-section" aria-labelledby="catalogue-title">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{t.catalogueEyebrow}</span>
            <h2 id="catalogue-title">{t.catalogueTitle}</h2>
            <p>{t.catalogueDescription}</p>
          </div>
          <div className="result-count" aria-live="polite">
            {visibleEntries.length} <span>{resultLabel}</span>
          </div>
        </div>

        <div className="catalogue-tools">
          <label className="search-field">
            <span className="search-symbol" aria-hidden="true">
              ⌕
            </span>
            <span className="sr-only">{t.searchLabel}</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.searchPlaceholder}
            />
          </label>

          <label className="sort-field">
            <span className="sr-only">{t.sortLabel}</span>
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value as SortOrder)}
            >
              <option value="title">{t.sortAlphabetical}</option>
              <option value="newest">{t.sortNewest}</option>
            </select>
          </label>
        </div>

        <div className="filter-row" role="group" aria-label={t.catalogueTitle}>
          {categoryKeys.map((category) => (
            <button
              className="filter-button"
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {t.categories[category]}
            </button>
          ))}
        </div>

        <div className="work-grid">
          {visibleEntries.length > 0 ? (
            visibleEntries.map((entry, index) => {
              const creator = creatorName(entry);
              const chips = [...(entry.genres ?? []), ...(entry.tags ?? [])].slice(0, 4);

              return (
                <article className="work-card" key={entry.id}>
                  <div className={"work-cover " + coverVariant(entry.mediaType)}>
                    <span className="cover-index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="cover-edition">ARCHIVE ENTRY</span>
                    <span className="cover-title">{entry.title}</span>
                  </div>

                  <div className="work-card-content">
                    <div className="work-card-top">
                      <span className="type-chip">{mediaTypeLabel(entry.mediaType, locale)}</span>
                      {entry.releaseYear ? (
                        <span className="work-year">{entry.releaseYear}</span>
                      ) : null}
                    </div>

                    <h3>{entry.title}</h3>
                    {creator ? <p className="work-creator">{creator}</p> : null}
                    {entry.country ? <p className="work-country">{entry.country}</p> : null}

                    {chips.length > 0 ? (
                      <ul className="tag-list" aria-label={t.genresLabel}>
                        {chips.map((chip) => (
                          <li key={chip}>{chip}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </article>
              );
            })
          ) : (
            <div className="empty-state">
              <h3>{t.noResultsTitle}</h3>
              <p>{t.noResultsDescription}</p>
              <button className="button-secondary" type="button" onClick={clearFilters}>
                {t.clearFilters}
              </button>
            </div>
          )}
        </div>
      </section>

      <section id="about" className="shell about-section" aria-labelledby="about-title">
        <div className="about-copy">
          <span className="eyebrow">{t.aboutEyebrow}</span>
          <h2 id="about-title">{t.aboutTitle}</h2>
          <p>{t.aboutDescription}</p>
        </div>

        <aside className="privacy-card">
          <span className="privacy-mark" aria-hidden="true">
            ◈
          </span>
          <h3>{t.privacyTitle}</h3>
          <p>{t.privacyDescription}</p>
        </aside>
      </section>

      <section id="status" className="shell status-section" aria-labelledby="status-title">
        <div className="status-panel">
          <div>
            <span className="eyebrow">{t.statusEyebrow}</span>
            <h2 id="status-title">{t.statusTitle}</h2>
            <p>{t.statusDescription}</p>
          </div>

          <div className="status-list">
            <div className="status-row">
              <span>{t.frontendLabel}</span>
              <strong className="status-value is-done">
                <span className="status-bullet" aria-hidden="true" />
                {t.implemented}
              </strong>
            </div>
            <div className="status-row">
              <span>{t.catalogueLabel}</span>
              <strong className="status-value">
                <span className="status-bullet" aria-hidden="true" />
                {t.seedOnly}
              </strong>
            </div>
            <div className="status-row">
              <span>{t.accountsLabel}</span>
              <strong className="status-value is-pending">
                <span className="status-bullet" aria-hidden="true" />
                {t.notConnected}
              </strong>
            </div>
            <div className="status-row">
              <span>{t.backendLabel}</span>
              <strong className="status-value is-pending">
                <span className="status-bullet" aria-hidden="true" />
                {t.notConnected}
              </strong>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <div>
            <div className="footer-brand">{config.appName}</div>
            <p className="footer-description">{t.footerDescription}</p>
          </div>
          <div className="footer-links">
            <a href="https://github.com/MarikaMatala/The-Cultured-Vault" target="_blank" rel="noreferrer">
              {t.sourceCode}
            </a>
            <a href="https://opensource.org/license/mit/" target="_blank" rel="noreferrer">
              {t.licence}
            </a>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
