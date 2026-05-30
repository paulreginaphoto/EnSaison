import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import vm from "node:vm";

const require = createRequire(import.meta.url);
const ts = require("typescript");

const root = process.cwd();

function loadTsModule(relativePath) {
  const filename = join(root, relativePath);
  const source = readFileSync(filename, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText;

  const module = { exports: {} };
  const context = {
    exports: module.exports,
    module,
    require,
    __dirname: dirname(filename),
    __filename: filename,
    Intl,
  };

  vm.runInNewContext(transpiled, context, { filename });
  return module.exports;
}

const { seasonItems } = loadTsModule("src/data/seasonItems.ts");
const { countryOptions, getCountryName } = loadTsModule("src/data/regions.ts");
const { dataSources } = loadTsModule("src/data/sources.ts");

const priorityCountries = ["FR", "CH", "US", "CA", "AU", "IN", "BR", "JP"];
const countryCount = countryOptions.length;
const itemCount = seasonItems.length;
const categories = [...new Set(seasonItems.map((item) => item.category))].sort();
const sourceIds = Object.keys(dataSources).sort();
const knownSourceIds = new Set(sourceIds);
const itemsWithCountryOverrides = seasonItems.filter((item) => item.countries);
const countryOverridePairs = seasonItems.flatMap((item) =>
  Object.keys(item.countries ?? {}).map((country) => ({
    country,
    itemId: item.id,
    name: item.names?.en ?? item.name,
    confidence: item.countries?.[country]?.confidence ?? "unknown",
    sourceIds: item.countries?.[country]?.sourceIds ?? [],
  })),
);
const profileOverridePairs = seasonItems.flatMap((item) =>
  Object.entries(item.profiles ?? {}).map(([profile, profileData]) => ({
    profile,
    itemId: item.id,
    name: item.names?.en ?? item.name,
    confidence: profileData?.confidence ?? "unknown",
    sourceIds: profileData?.sourceIds ?? [],
  })),
);

const categoryCounts = categories.map((category) => ({
  category,
  count: seasonItems.filter((item) => item.category === category).length,
}));

const confidenceCounts = ["source", "model", "indicative", "taxonomy"].map((confidence) => ({
  confidence,
  count: seasonItems.filter((item) => (item.confidence ?? "indicative") === confidence).length,
}));

const priorityCoverage = priorityCountries.map((country) => {
  const overrides = countryOverridePairs.filter((entry) => entry.country === country);
  return {
    country,
    overrides: overrides.length,
    sourced: overrides.filter((entry) => entry.confidence === "source").length,
    indicative: overrides.filter((entry) => entry.confidence === "indicative").length,
    sample: overrides.slice(0, 10).map((entry) => entry.name),
  };
});

const countryOverrideConfidenceCounts = ["source", "model", "indicative", "taxonomy", "unknown"].map((confidence) => ({
  confidence,
  count: countryOverridePairs.filter((entry) => entry.confidence === confidence).length,
}));

const allCountryCoverage = countryOptions
  .map(({ code }) => {
    const overrides = countryOverridePairs.filter((entry) => entry.country === code);
    return {
      country: code,
      name: getCountryName(code, "en"),
      overrides: overrides.length,
      sourced: overrides.filter((entry) => entry.confidence === "source").length,
      indicative: overrides.filter((entry) => entry.confidence === "indicative").length,
      sample: overrides.slice(0, 8).map((entry) => entry.name),
    };
  })
  .sort((a, b) => b.overrides - a.overrides || a.country.localeCompare(b.country));

const countriesWithoutOverrides = allCountryCoverage.filter((entry) => entry.overrides === 0).length;
const topCountryCoverage = allCountryCoverage.filter((entry) => entry.overrides > 0).slice(0, 35);

const variableItems = seasonItems.filter((item) => item.seasonMode === "variable");
const taxonomyOnlyItems = seasonItems.filter((item) => item.confidence === "taxonomy");
const itemsMissingLocalizedEnglish = seasonItems.filter((item) => !item.names?.en);
const itemsMissingSource = seasonItems.filter(
  (item) => !item.sourceIds?.length && !item.countries && !item.profiles,
);
const sourceReferences = seasonItems.flatMap((item) => {
  const base = (item.sourceIds ?? []).map((sourceId) => ({ itemId: item.id, scope: "base", sourceId }));
  const profiles = Object.entries(item.profiles ?? {}).flatMap(([profile, data]) =>
    (data?.sourceIds ?? []).map((sourceId) => ({ itemId: item.id, scope: `profile:${profile}`, sourceId })),
  );
  const countries = Object.entries(item.countries ?? {}).flatMap(([country, data]) =>
    (data?.sourceIds ?? []).map((sourceId) => ({ itemId: item.id, scope: `country:${country}`, sourceId })),
  );
  return [...base, ...profiles, ...countries];
});
const missingSourceReferences = sourceReferences.filter((entry) => !knownSourceIds.has(entry.sourceId));
const countriesWithOverrides = [...new Set(countryOverridePairs.map((entry) => entry.country))].sort();

const report = `# Data Coverage Audit

Generated by \`npm run audit:data\`.

## Summary

- Countries in selector: ${countryCount}
- Food entries: ${itemCount}
- Categories represented: ${categories.length}
- Source registry entries: ${sourceIds.length}
- Items with at least one country override: ${itemsWithCountryOverrides.length}
- Country/item override pairs: ${countryOverridePairs.length}
- Countries with item-level overrides: ${countriesWithOverrides.length}
- Countries without item-level overrides: ${countriesWithoutOverrides}
- Profile/item override pairs: ${profileOverridePairs.length}
- Variable-season items: ${variableItems.length}
- Taxonomy-only items: ${taxonomyOnlyItems.length}
- Items missing English alias: ${itemsMissingLocalizedEnglish.length}
- Items missing any source/provenance signal: ${itemsMissingSource.length}
- Broken source references: ${missingSourceReferences.length}

## Categories

${categoryCounts.map((entry) => `- ${entry.category}: ${entry.count}`).join("\n")}

## Confidence Mix

${confidenceCounts.map((entry) => `- ${entry.confidence}: ${entry.count}`).join("\n")}

## Country Override Confidence Mix

${countryOverrideConfidenceCounts.map((entry) => `- ${entry.confidence}: ${entry.count}`).join("\n")}

## Priority Country Coverage

${priorityCoverage
  .map(
    (entry) =>
      `- ${entry.country}: ${entry.overrides} overrides, ${entry.sourced} source-backed, ${entry.indicative} indicative` +
      (entry.sample.length ? `; sample: ${entry.sample.join(", ")}` : ""),
  )
  .join("\n")}

## Top Country Coverage

${topCountryCoverage
  .map(
    (entry) =>
      `- ${entry.country} (${entry.name}): ${entry.overrides} overrides, ${entry.sourced} source-backed, ${entry.indicative} indicative` +
      (entry.sample.length ? `; sample: ${entry.sample.join(", ")}` : ""),
  )
  .join("\n")}

## Source Registry

${sourceIds.map((sourceId) => `- ${sourceId}: ${dataSources[sourceId].url}`).join("\n")}

## Integrity Checks

- Broken source references: ${missingSourceReferences.length}
- Missing source/provenance signal: ${itemsMissingSource.length}
- Missing English alias: ${itemsMissingLocalizedEnglish.length}
${missingSourceReferences.length ? missingSourceReferences.map((entry) => `- Missing source \`${entry.sourceId}\` on ${entry.itemId} (${entry.scope})`).join("\n") : ""}

## Gaps

- Full country-level seasonal coverage is not yet complete.
- Priority countries without enough item-level overrides should be enriched before claiming local precision.
- Variable-season foods need country-specific rules only when reliable local data exists.
`;

writeFileSync(join(root, "docs/data-coverage-report.md"), report);

console.log(
  JSON.stringify(
    {
      countryCount,
      itemCount,
      categoryCount: categories.length,
      sourceCount: sourceIds.length,
      itemsWithCountryOverrides: itemsWithCountryOverrides.length,
      countryOverridePairs: countryOverridePairs.length,
      countriesWithOverrides: countriesWithOverrides.length,
      countriesWithoutOverrides,
      profileOverridePairs: profileOverridePairs.length,
      variableItems: variableItems.length,
      taxonomyOnlyItems: taxonomyOnlyItems.length,
      itemsMissingLocalizedEnglish: itemsMissingLocalizedEnglish.length,
      itemsMissingSource: itemsMissingSource.length,
      missingSourceReferences: missingSourceReferences.length,
      categoryCounts,
      confidenceCounts,
      countryOverrideConfidenceCounts,
      priorityCoverage,
      topCountryCoverage,
    },
    null,
    2,
  ),
);
