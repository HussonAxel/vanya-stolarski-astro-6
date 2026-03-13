import { c as createComponent } from './astro-component_CjVDIu3q.mjs';
import { l as maybeRenderHead, D as renderTemplate, Y as addAttribute } from './transition_DxZe40lS.mjs';

const FOUR_HOURS_IN_MS = 4 * 60 * 60 * 1e3;
const ULULE_API_BASE_URL = "https://api.ulule.com/v1";
const ULULE_API_VERSION = "2022-10-24";
const fallbackCampaign = {
  label: "Derniere campagne Ulule",
  title: "Fous-Papillons",
  subtitle: "Edition collector, visuels exclusifs et contenus de campagne.",
  description: "Un bandeau pense comme une vitrine de campagne: couverture, atmosphere, bonus editoriaux et pieces visuelles creees pour porter le projet.",
  primaryHref: "/galerie",
  primaryLabel: "Voir les visuels",
  secondaryHref: "/livres/fous-papillons",
  secondaryLabel: "Decouvrir le roman",
  coverSrc: "/assets/covers/fous-papillons-cover.webp",
  coverAlt: "Couverture de Fous-Papillons",
  detailSrc: "/assets/gallery/fous-papillons--esther.webp",
  detailAlt: "Visuel de campagne Fous-Papillons",
  stats: [
    { value: "Collector", label: "Edition mise en avant" },
    { value: "Bonus", label: "Signets et contenus exclusifs" },
    { value: "Visuels", label: "Campagne et communication" }
  ],
  source: "fallback"
};
let campaignCache = null;
let campaignInFlight = null;
const getFirstString = (...values) => values.find((value) => typeof value === "string" && value.trim().length > 0);
const getLocalizedString = (value) => {
  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }
  if (!value || typeof value !== "object") {
    return void 0;
  }
  return getFirstString(
    value.fr,
    value.en,
    value.default,
    value.value,
    value.text
  );
};
const getFirstLocalizedString = (...values) => {
  for (const value of values) {
    const localized = getLocalizedString(value);
    if (localized) {
      return localized;
    }
  }
  return void 0;
};
const stripHtml = (value) => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
const truncate = (value, maxLength) => value.length <= maxLength ? value : `${value.slice(0, maxLength - 1).trim()}...`;
const formatNumber = (value) => new Intl.NumberFormat("fr-FR").format(value);
const formatDate = (rawDate) => {
  if (!rawDate) {
    return void 0;
  }
  const date = new Date(rawDate);
  if (Number.isNaN(date.getTime())) {
    return void 0;
  }
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(date);
};
const normalizeTitle = (title, slug) => {
  const cleanedTitle = title?.replace(/\s+-\s+termin[ée]e?.*$/i, "")?.replace(/\s+-\s+collection.*$/i, "")?.trim();
  if (cleanedTitle) {
    return cleanedTitle;
  }
  if (!slug) {
    return fallbackCampaign.title;
  }
  const leadingSegment = slug.split("---")[0] ?? slug;
  return leadingSegment.split("-").filter(Boolean).map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1)).join(" ");
};
const formatRemainingTime = (rawDate) => {
  if (!rawDate) {
    return { value: "Archive", label: "Statut" };
  }
  const endDate = new Date(rawDate);
  if (Number.isNaN(endDate.getTime())) {
    return { value: "Archive", label: "Statut" };
  }
  const diff = endDate.getTime() - Date.now();
  if (diff <= 0) {
    return { value: "Cloturee", label: "Campagne" };
  }
  const days = Math.max(1, Math.ceil(diff / (1e3 * 60 * 60 * 24)));
  return { value: `${days} j`, label: "Temps restant" };
};
const readProjectUrl = (project) => getFirstString(
  project.absolute_url,
  project.url,
  project.web_url,
  project.urls?.web?.detail,
  project.urls?.web?.checkout,
  project.urls?.public,
  project.urls?.campaign,
  project.sharing_urls?.fr,
  project.sharing_urls?.en
) ?? fallbackCampaign.primaryHref;
const readProjectImage = (project) => getFirstString(
  project.share_image?.fr?.versions?.full?.url,
  project.share_image?.fr?.versions?.large?.url,
  project.main_image?.fr?.versions?.full?.url,
  project.main_image?.fr?.versions?.large?.url,
  project.main_image?.fr?.versions?.medium?.url,
  project.share_image?.versions?.large,
  project.share_image?.versions?.full,
  project.main_image?.versions?.large,
  project.main_image?.versions?.big,
  project.main_image?.versions?.full,
  project.main_image?.versions?.normal,
  project.main_image?.url,
  project.image?.versions?.large,
  project.image?.versions?.big,
  project.image?.versions?.full,
  project.image?.url
);
const readDetailImage = (project) => getFirstString(
  project.main_image?.fr?.versions?.full?.url,
  project.main_image?.fr?.versions?.large?.url,
  project.share_image?.fr?.versions?.full?.url,
  project.share_image?.fr?.versions?.large?.url
) ?? fallbackCampaign.detailSrc;
const buildCampaignFromProject = (project) => {
  const slug = getFirstString(project.slug);
  const title = normalizeTitle(
    getFirstLocalizedString(project.name, project.title, project.name_fr, project.title_fr),
    slug
  );
  const subtitle = truncate(
    getFirstLocalizedString(
      project.subtitle,
      project.tagline,
      project.summary,
      project.subtitle_fr,
      project.tagline_fr,
      project.summary_fr
    ) ?? fallbackCampaign.subtitle,
    82
  );
  const descriptionSource = getFirstLocalizedString(
    project.description_short,
    project.pitch,
    project.description,
    project.story,
    project.description_short_fr,
    project.pitch_fr,
    project.description_fr,
    project.story_fr
  );
  const percent = Number(project.percent ?? project.progress ?? 0);
  const supportersCount = Number(
    project.supporters_count ?? project.backers_count ?? project.users_count ?? 0
  );
  const amountRaised = Number(project.amount_raised ?? project.committed ?? 0);
  const currencyDisplay = getFirstString(project.currency_display) ?? "€";
  const endDate = getFirstString(project.date_end, project.end_date);
  const remainingStat = formatRemainingTime(
    endDate
  );
  const endDateLabel = formatDate(endDate);
  const imageSrc = readProjectImage(project) ?? fallbackCampaign.coverSrc;
  const projectUrl = readProjectUrl(project);
  const strippedDescription = descriptionSource ? stripHtml(descriptionSource) : "";
  const description = truncate(
    strippedDescription ? strippedDescription : [
      percent > 0 ? `Finance a ${Math.round(percent)}%` : void 0,
      supportersCount > 0 ? `${formatNumber(supportersCount)} contributeurs` : void 0,
      endDateLabel ? `cloturee le ${endDateLabel}` : void 0
    ].filter(Boolean).join(", "),
    120
  );
  return {
    label: fallbackCampaign.label,
    title,
    subtitle,
    description,
    primaryHref: projectUrl,
    primaryLabel: "Voir la campagne",
    secondaryHref: getFirstString(undefined                                    ) ?? fallbackCampaign.secondaryHref,
    secondaryLabel: getFirstString(undefined                                     ) ?? fallbackCampaign.secondaryLabel,
    coverSrc: imageSrc,
    coverAlt: getFirstLocalizedString(project.share_image?.fr?.alt, project.main_image?.fr?.alt) ?? `Campagne Ulule pour ${title}`,
    detailSrc: readDetailImage(project),
    detailAlt: getFirstLocalizedString(project.main_image?.fr?.alt, project.share_image?.fr?.alt) ?? `Visuel Ulule pour ${title}`,
    stats: [
      {
        value: percent > 0 ? `${Math.round(percent)}%` : "Projet",
        label: percent > 0 ? "Objectif atteint" : "Campagne"
      },
      {
        value: supportersCount > 0 ? formatNumber(supportersCount) : "Public",
        label: supportersCount > 0 ? "Contributeurs" : "Mobilisation"
      },
      {
        value: amountRaised > 0 ? `${formatNumber(amountRaised)} ${currencyDisplay}` : remainingStat.value,
        label: amountRaised > 0 ? "Collecte" : remainingStat.label
      }
    ],
    source: "ulule"
  };
};
const fetchUluleCampaign = async () => {
  const projectId = getFirstString(undefined                                );
  if (!projectId) {
    return fallbackCampaign;
  }
  const response = await fetch(`${ULULE_API_BASE_URL}/projects/${projectId}`, {
    headers: {
      Accept: "application/json",
      "Ulule-Version": ULULE_API_VERSION,
      "User-Agent": "vanya-stolarski-site/1.0"
    }
  });
  if (!response.ok) {
    throw new Error(`Ulule API request failed with status ${response.status}`);
  }
  const payload = await response.json();
  const project = payload?.project ?? payload?.data ?? payload;
  if (!project || typeof project !== "object") {
    throw new Error("Ulule API returned an unexpected payload");
  }
  return buildCampaignFromProject(project);
};
const getUluleCampaignCard = async () => {
  const now = Date.now();
  if (campaignCache && campaignCache.expiresAt > now) {
    return campaignCache.data;
  }
  if (campaignInFlight) {
    return campaignInFlight;
  }
  campaignInFlight = fetchUluleCampaign().then((data) => {
    campaignCache = {
      data,
      expiresAt: Date.now() + FOUR_HOURS_IN_MS
    };
    return data;
  }).catch((error) => {
    console.error("[ulule] unable to refresh campaign", error);
    if (campaignCache) {
      return campaignCache.data;
    }
    return fallbackCampaign;
  }).finally(() => {
    campaignInFlight = null;
  });
  return campaignInFlight;
};

const $$LatestUluleCampaign = createComponent(async ($$result, $$props, $$slots) => {
  const campaign = await getUluleCampaignCard();
  return renderTemplate`${maybeRenderHead()}<div class="section-panel group relative h-full min-h-[20rem] overflow-hidden rounded-[2.7rem] border border-[#3a4d45]/20 bg-[#3a4d45] p-7 shadow-xl backdrop-blur-md transition-all duration-500 hover:border-[#FFFAFA]/28 hover:bg-[#486158] hover:shadow-[0_34px_120px_-58px_rgba(0,0,0,0.62)] md:min-h-0 md:p-8 lg:p-9"> <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,250,250,0.12),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,250,250,0.08),transparent_30%)] opacity-80"></div> <div class="pointer-events-none absolute right-[-8%] bottom-[-22%] h-64 w-64 rounded-full bg-[#FFFAFA]/8 blur-3xl transition-transform duration-700 group-hover:scale-110"></div> <div class="relative z-10 grid h-full gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(240px,300px)] lg:items-end"> <div class="space-y-5"> <div class="space-y-4"> <div class="flex flex-wrap items-center gap-3"> <span class="inline-flex rounded-full border border-[#FFFAFA]/14 bg-[#FFFAFA]/10 px-3.5 py-1.5 font-sans text-[9px] font-bold tracking-[0.28em] text-[#FFFAFA] uppercase backdrop-blur-sm"> ${campaign.label} </span> <span class="inline-flex rounded-full border border-[#FFFAFA]/12 bg-[#2f413a] px-3.5 py-1.5 font-sans text-[9px] font-bold tracking-[0.22em] text-[#FFFAFA] uppercase">
Ulule
</span> </div> <div class="space-y-3"> <h3 class="max-w-lg font-serif text-[2.65rem] leading-[0.94] text-[#FFFAFA] text-balance md:text-[3rem] lg:text-[3.15rem]"> ${campaign.title} </h3> <p class="max-w-xl font-sans text-[0.94rem] leading-relaxed text-[#FFFAFA]/82"> ${campaign.subtitle} </p> <p class="max-w-xl font-sans text-[0.85rem] leading-relaxed text-[#FFFAFA]/66 md:text-[0.9rem]"> ${campaign.description} </p> </div> </div> <div class="grid gap-3 sm:grid-cols-3"> ${campaign.stats.map((stat) => renderTemplate`<div class="rounded-[1.5rem] border border-[#FFFAFA]/12 bg-[#FFFAFA]/8 px-4 py-3.5 backdrop-blur-sm transition-colors duration-500 group-hover:bg-[#FFFAFA]/10"> <p class="font-serif text-[1.4rem] leading-none text-[#FFFAFA]"> ${stat.value} </p> <p class="mt-1.5 font-sans text-[8px] font-bold tracking-[0.16em] text-[#FFFAFA]/70 uppercase"> ${stat.label} </p> </div>`)} </div> <div class="flex flex-wrap gap-2.5"> <a${addAttribute(campaign.primaryHref, "href")}${addAttribute(campaign.primaryHref.startsWith("http") ? "_blank" : void 0, "target")}${addAttribute(campaign.primaryHref.startsWith("http") ? "noreferrer" : void 0, "rel")} class="inline-flex h-10 items-center rounded-full border border-transparent bg-[#FFFAFA] px-5 font-sans text-[9px] font-bold tracking-[0.22em] text-[#3d3834] uppercase transition-all duration-300 hover:border-[#FFFAFA]/20 hover:bg-[#2f413a] hover:text-[#FFFAFA]"> ${campaign.primaryLabel} </a> ${campaign.secondaryHref && campaign.secondaryLabel && renderTemplate`<a${addAttribute(campaign.secondaryHref, "href")} class="inline-flex h-10 items-center rounded-full border border-[#FFFAFA]/16 bg-transparent px-5 font-sans text-[9px] font-bold tracking-[0.22em] text-[#FFFAFA] uppercase transition-all duration-300 hover:border-[#FFFAFA]/34 hover:bg-[#FFFAFA] hover:text-[#3d3834]"> ${campaign.secondaryLabel} </a>`} </div> </div> <div class="relative min-h-[13rem] lg:min-h-[15rem]"> <div class="pointer-events-none absolute inset-x-[14%] bottom-4 h-8 rounded-full bg-[#1d2723]/38 blur-2xl"></div> <div class="pointer-events-none absolute left-1/2 top-3 h-40 w-40 -translate-x-1/2 rounded-full bg-[#FFFAFA]/10 blur-3xl"></div> <div class="absolute inset-x-0 bottom-0 flex justify-center"> <div class="w-full max-w-[17.5rem] rounded-[2.15rem] border border-[#FFFAFA]/14 bg-[#fffaf8]/95 p-4 shadow-[0_34px_100px_-46px_rgba(0,0,0,0.58)] transition-all duration-700 group-hover:shadow-[0_42px_120px_-50px_rgba(0,0,0,0.62)]"> <div class="flex aspect-[4/5] items-center justify-center rounded-[1.55rem] bg-[linear-gradient(180deg,#f7f1ec_0%,#ebe2dc_100%)] p-4"> <img${addAttribute(campaign.coverSrc, "src")}${addAttribute(campaign.coverAlt, "alt")} class="h-full w-auto max-w-full object-contain drop-shadow-[0_20px_30px_rgba(61,56,52,0.2)]" loading="lazy"> </div> </div> </div> </div> </div> </div>`;
}, "D:/Documents/Projects/vanya-stolarski-astro-6/src/components/LatestUluleCampaign.astro", void 0);

const $$file = "D:/Documents/Projects/vanya-stolarski-astro-6/src/components/LatestUluleCampaign.astro";
const $$url = undefined;

export { $$LatestUluleCampaign as default, $$file as file, $$url as url };
