import { books } from "../data/books";
import { getBookTitle } from "./books";

const FOUR_HOURS_IN_MS = 4 * 60 * 60 * 1000;
const ULULE_API_BASE_URL = "https://api.ulule.com/v1";
const ULULE_API_VERSION = "2022-10-24";

type CampaignStat = {
  value: string;
  label: string;
};

export type UluleCampaignCard = {
  label: string;
  title: string;
  subtitle: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  coverSrc: string;
  coverAlt: string;
  detailSrc: string;
  detailAlt: string;
  stats: CampaignStat[];
  source: "ulule" | "fallback";
};

type CacheEntry = {
  data: UluleCampaignCard;
  expiresAt: number;
};

const fallbackCampaign: UluleCampaignCard = {
  label: "Dernière campagne Ulule",
  title: "Fous-Papillons",
  subtitle: "Edition collector, visuels exclusifs et contenus de campagne.",
  description:
    "Un bandeau pense comme une vitrine de campagne: couverture, atmosphere, bonus editoriaux et pieces visuelles creees pour porter le projet.",
  primaryHref: "/galerie",
  primaryLabel: "Voir les visuels",
  secondaryHref: "/livres",
  secondaryLabel: "Voir les livres",
  coverSrc: "/assets/covers/fous-papillons-cover.webp",
  coverAlt: "Couverture de Fous-Papillons",
  detailSrc: "/assets/gallery/fous-papillons--esther.webp",
  detailAlt: "Visuel de campagne Fous-Papillons",
  stats: [
    { value: "Collector", label: "Edition mise en avant" },
    { value: "Bonus", label: "Signets et contenus exclusifs" },
    { value: "Visuels", label: "Campagne et communication" },
  ],
  source: "fallback",
};

let campaignCache: CacheEntry | null = null;
let campaignInFlight: Promise<UluleCampaignCard> | null = null;

const getFirstString = (...values: unknown[]) =>
  values.find((value) => typeof value === "string" && value.trim().length > 0) as
    | string
    | undefined;

const getLocalizedString = (value: unknown) => {
  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  if (!value || typeof value !== "object") {
    return undefined;
  }

  return getFirstString(
    (value as Record<string, unknown>).fr,
    (value as Record<string, unknown>).en,
    (value as Record<string, unknown>).default,
    (value as Record<string, unknown>).value,
    (value as Record<string, unknown>).text,
  );
};

const getFirstLocalizedString = (...values: unknown[]) => {
  for (const value of values) {
    const localized = getLocalizedString(value);

    if (localized) {
      return localized;
    }
  }

  return undefined;
};

const stripHtml = (value: string) =>
  value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const truncate = (value: string, maxLength: number) =>
  value.length <= maxLength ? value : `${value.slice(0, maxLength - 1).trim()}...`;

const formatNumber = (value: number) => new Intl.NumberFormat("fr-FR").format(value);

const formatDate = (rawDate: string | undefined) => {
  if (!rawDate) {
    return undefined;
  }

  const date = new Date(rawDate);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const normalizeTitle = (title: string | undefined, slug: string | undefined) => {
  const cleanedTitle = title
    ?.replace(/\s+-\s+termin[ée]e?.*$/i, "")
    ?.replace(/\s+-\s+collection.*$/i, "")
    ?.trim();

  if (cleanedTitle) {
    return cleanedTitle;
  }

  if (!slug) {
    return fallbackCampaign.title;
  }

  const leadingSegment = slug.split("---")[0] ?? slug;
  return leadingSegment
    .split("-")
    .filter(Boolean)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");
};

const normalizeSearchValue = (value: string | undefined) =>
  value
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const findMatchingBook = (title: string | undefined, slug: string | undefined) => {
  const normalizedTitle = normalizeSearchValue(title);
  const normalizedSlug = normalizeSearchValue(slug?.replace(/---.*$/, "").replace(/-/g, " "));

  return books.find((book) => {
    const normalizedBookTitle = normalizeSearchValue(getBookTitle(book));
    const normalizedBookSlug = normalizeSearchValue(book.slug.replace(/-/g, " "));

    if (!normalizedBookTitle || !normalizedBookSlug) {
      return false;
    }

    return (
      normalizedTitle === normalizedBookTitle ||
      normalizedSlug === normalizedBookSlug ||
      normalizedTitle?.includes(normalizedBookTitle) ||
      normalizedBookTitle.includes(normalizedTitle ?? "") ||
      normalizedSlug?.includes(normalizedBookSlug)
    );
  });
};

const formatRemainingTime = (rawDate: string | undefined) => {
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

  const days = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  return { value: `${days} j`, label: "Temps restant" };
};

const readProjectUrl = (project: Record<string, any>) =>
  getFirstString(
    project.absolute_url,
    project.url,
    project.web_url,
    project.urls?.web?.detail,
    project.urls?.web?.checkout,
    project.urls?.public,
    project.urls?.campaign,
    project.sharing_urls?.fr,
    project.sharing_urls?.en,
  ) ?? fallbackCampaign.primaryHref;

const readProjectImage = (project: Record<string, any>) =>
  getFirstString(
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
    project.image?.url,
  );

const readDetailImage = (project: Record<string, any>) =>
  getFirstString(
    project.main_image?.fr?.versions?.full?.url,
    project.main_image?.fr?.versions?.large?.url,
    project.share_image?.fr?.versions?.full?.url,
    project.share_image?.fr?.versions?.large?.url,
  ) ?? fallbackCampaign.detailSrc;

const buildCampaignFromProject = (project: Record<string, any>): UluleCampaignCard => {
  const slug = getFirstString(project.slug);
  const title = normalizeTitle(
    getFirstLocalizedString(project.name, project.title, project.name_fr, project.title_fr),
    slug,
  );
  const subtitle = truncate(
    getFirstLocalizedString(
      project.subtitle,
      project.tagline,
      project.summary,
      project.subtitle_fr,
      project.tagline_fr,
      project.summary_fr,
    ) ??
      fallbackCampaign.subtitle,
    82,
  );
  const descriptionSource = getFirstLocalizedString(
    project.description_short,
    project.pitch,
    project.description,
    project.story,
    project.description_short_fr,
    project.pitch_fr,
    project.description_fr,
    project.story_fr,
  );

  const percent = Number(project.percent ?? project.progress ?? 0);
  const supportersCount = Number(
    project.supporters_count ?? project.backers_count ?? project.users_count ?? 0,
  );
  const amountRaised = Number(project.amount_raised ?? project.committed ?? 0);
  const currencyDisplay = getFirstString(project.currency_display) ?? "€";
  const endDate = getFirstString(project.date_end, project.end_date);
  const matchedBook = findMatchingBook(title, slug);
  const matchedBookHref = matchedBook ? `/livres/${matchedBook.slug}` : undefined;
  const remainingStat = formatRemainingTime(
    endDate,
  );
  const endDateLabel = formatDate(endDate);
  const imageSrc =
    matchedBook?.media.cover.src ?? readProjectImage(project) ?? fallbackCampaign.coverSrc;
  const projectUrl = readProjectUrl(project);
  const strippedDescription = descriptionSource ? stripHtml(descriptionSource) : "";
  const description = truncate(
    strippedDescription
      ? strippedDescription
      : [
          percent > 0 ? `Finance a ${Math.round(percent)}%` : undefined,
          supportersCount > 0 ? `${formatNumber(supportersCount)} contributeurs` : undefined,
          endDateLabel ? `cloturee le ${endDateLabel}` : undefined,
        ]
          .filter(Boolean)
          .join(", "),
    120,
  );

  return {
    label: fallbackCampaign.label,
    title,
    subtitle,
    description,
    primaryHref: projectUrl,
    primaryLabel: "Voir la campagne",
    secondaryHref:
      getFirstString(import.meta.env.ULULE_SECONDARY_HREF) ??
      matchedBookHref ??
      fallbackCampaign.secondaryHref,
    secondaryLabel:
      getFirstString(import.meta.env.ULULE_SECONDARY_LABEL) ??
      (matchedBookHref ? "Voir le livre" : fallbackCampaign.secondaryLabel),
    coverSrc: imageSrc,
    coverAlt: matchedBook
      ? `Couverture de ${getBookTitle(matchedBook)}`
      : getFirstLocalizedString(project.share_image?.fr?.alt, project.main_image?.fr?.alt) ??
        `Campagne Ulule pour ${title}`,
    detailSrc: readDetailImage(project),
    detailAlt:
      getFirstLocalizedString(project.main_image?.fr?.alt, project.share_image?.fr?.alt) ??
      `Visuel Ulule pour ${title}`,
    stats: [
      {
        value: percent > 0 ? `${Math.round(percent)}%` : "Projet",
        label: percent > 0 ? "Objectif atteint" : "Campagne",
      },
      {
        value: supportersCount > 0 ? formatNumber(supportersCount) : "Public",
        label: supportersCount > 0 ? "Contributeurs" : "Mobilisation",
      },
      {
        value:
          amountRaised > 0
            ? `${formatNumber(amountRaised)} ${currencyDisplay}`
            : remainingStat.value,
        label: amountRaised > 0 ? "Collecte" : remainingStat.label,
      },
    ],
    source: "ulule",
  };
};

const fetchUluleCampaign = async () => {
  const projectId = getFirstString(import.meta.env.ULULE_PROJECT_ID);

  if (!projectId) {
    return fallbackCampaign;
  }

  const response = await fetch(`${ULULE_API_BASE_URL}/projects/${projectId}`, {
    headers: {
      Accept: "application/json",
      "Ulule-Version": ULULE_API_VERSION,
      "User-Agent": "vanya-stolarski-site/1.0",
    },
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

export const getUluleCampaignCard = async () => {
  const now = Date.now();

  if (campaignCache && campaignCache.expiresAt > now) {
    return campaignCache.data;
  }

  if (campaignInFlight) {
    return campaignInFlight;
  }

  campaignInFlight = fetchUluleCampaign()
    .then((data) => {
      campaignCache = {
        data,
        expiresAt: Date.now() + FOUR_HOURS_IN_MS,
      };
      return data;
    })
    .catch((error) => {
      console.error("[ulule] unable to refresh campaign", error);

      if (campaignCache) {
        return campaignCache.data;
      }

      return fallbackCampaign;
    })
    .finally(() => {
      campaignInFlight = null;
    });

  return campaignInFlight;
};

export const getUluleFallbackCampaign = () => fallbackCampaign;
