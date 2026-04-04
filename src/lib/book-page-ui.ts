type CTAViewModel = {
  label: string;
  href: string;
  kind: "primary" | "secondary" | "ghost";
  icon: "external" | "download" | "play";
  external?: boolean;
  download?: boolean;
};

type BookEditionViewModel = {
  id: string;
  label: string;
  meta: {
    format?: string;
    price?: string;
    pages?: number;
    isbn?: string;
    releaseDate?: string;
    status?: string;
  };
  content: {
    hook?: string;
    description?: string;
  };
  ctas: CTAViewModel[];
};

const iconMarkup = {
  external:
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>',
  download:
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"></path><path d="m7 10 5 5 5-5"></path><path d="M5 21h14"></path></svg>',
  play:
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6v12l10-6z"></path></svg>',
};

const ctaClassNames: Record<CTAViewModel["kind"], string> = {
  primary:
    "inline-flex items-center justify-center gap-3 rounded-full px-5 py-3.5 font-sans text-[11px] font-bold tracking-[0.22em] uppercase transition-all duration-300 bg-[#3a4d45] text-[#FFFAFA] hover:bg-[#2f4039]",
  secondary:
    "inline-flex items-center justify-center gap-3 rounded-full border border-[#FFFAFA]/18 bg-transparent px-5 py-3.5 font-sans text-[11px] font-bold tracking-[0.22em] text-[#FFFAFA] uppercase transition-all duration-300 hover:border-[#3a4d45]/35 hover:bg-[#FFFAFA] hover:text-[#3d3834]",
  ghost:
    "inline-flex items-center justify-center gap-3 rounded-full border border-[#FFFAFA]/18 bg-transparent px-5 py-3.5 font-sans text-[11px] font-bold tracking-[0.22em] text-[#FFFAFA] uppercase transition-all duration-300 hover:border-[#ff0000]/35 hover:bg-[#FFFAFA] hover:text-[#3d3834]",
};

const setText = (root: HTMLElement, selector: string, value?: string) => {
  root.querySelectorAll(selector).forEach((node) => {
    node.textContent = value ?? "";
  });
};

const renderCtas = (container: HTMLElement, ctas: CTAViewModel[]) => {
  container.replaceChildren();

  if (ctas.length === 0) {
    container.classList.add("hidden");
    return;
  }

  container.classList.remove("hidden");

  ctas.forEach((cta) => {
    const anchor = document.createElement("a");
    anchor.href = cta.href;
    anchor.className = ctaClassNames[cta.kind];

    if (cta.external) {
      anchor.target = "_blank";
      anchor.rel = "noreferrer";
    }

    if (cta.download) {
      anchor.setAttribute("download", "");
    }

    anchor.append(document.createTextNode(cta.label));
    anchor.insertAdjacentHTML("beforeend", iconMarkup[cta.icon]);
    container.append(anchor);
  });
};

export const bindEditionPanels = () => {
  document.querySelectorAll("[data-edition-panel]").forEach((panel) => {
    if (!(panel instanceof HTMLElement) || panel.dataset.bound === "true") {
      return;
    }

    panel.dataset.bound = "true";

    const editions = JSON.parse(
      panel.dataset.editions ?? "[]",
    ) as BookEditionViewModel[];
    if (!Array.isArray(editions) || editions.length === 0) {
      return;
    }

    const heroGrid = panel.parentElement;
    const gallery = heroGrid?.querySelector("[data-gallery]");
    const linksContainer = panel.querySelector("[data-edition-links]");
    if (!(linksContainer instanceof HTMLElement)) {
      return;
    }

    const applyEdition = (index: number) => {
      const edition = editions[index] ?? editions[0];
      if (!edition) {
        return;
      }

      setText(panel, "[data-edition-hook]", edition.content.hook);
      setText(panel, "[data-edition-description]", edition.content.description);
      setText(panel, "[data-edition-format]", edition.meta.format);
      setText(panel, "[data-edition-release]", edition.meta.releaseDate);

      const pagesCopy = panel.querySelector("[data-edition-pages-copy]");
      const pagesSeparatorBefore = panel.querySelector(
        "[data-edition-pages-separator-before]",
      );
      const pagesSeparatorAfter = panel.querySelector(
        "[data-edition-pages-separator-after]",
      );
      const hasPages = edition.meta.pages !== undefined && edition.meta.pages !== null;

      if (pagesCopy instanceof HTMLElement) {
        pagesCopy.textContent = hasPages ? `${edition.meta.pages} pages` : "";
        pagesCopy.classList.toggle("hidden", !hasPages);
      }
      if (pagesSeparatorBefore instanceof HTMLElement) {
        pagesSeparatorBefore.classList.toggle("hidden", !hasPages);
      }
      if (pagesSeparatorAfter instanceof HTMLElement) {
        pagesSeparatorAfter.classList.toggle("hidden", !hasPages);
      }

      renderCtas(linksContainer, edition.ctas);
    };

    if (gallery instanceof HTMLElement) {
      gallery.addEventListener("book-gallery:change", (event) => {
        if (!(event instanceof CustomEvent)) {
          return;
        }

        applyEdition(Number(event.detail?.index ?? 0));
      });
    }

    applyEdition(0);
  });
};

export const bindBookRelatedGalleries = () => {
  document.querySelectorAll("[data-book-related-gallery]").forEach((galleryRoot) => {
    if (!(galleryRoot instanceof HTMLElement) || galleryRoot.dataset.bound === "true") {
      return;
    }

    galleryRoot.dataset.bound = "true";

    const section = galleryRoot.closest("section");
    const modal = section?.querySelector("[data-gallery-modal]");
    const modalImage = section?.querySelector("[data-gallery-modal-image]");
    const modalTitle = section?.querySelector("[data-gallery-modal-title]");
    const modalArtist = section?.querySelector("[data-gallery-modal-artist]");
    const modalDescription = section?.querySelector("[data-gallery-modal-description]");
    const modalBook = section?.querySelector("[data-gallery-modal-book]");
    const modalArtistDetail = section?.querySelector("[data-gallery-modal-artist-detail]");
    const modalDate = section?.querySelector("[data-gallery-modal-date]");
    const modalAlt = section?.querySelector("[data-gallery-modal-alt]");
    const modalLink = section?.querySelector("[data-gallery-modal-link]");
    const closeButtons = Array.from(section?.querySelectorAll("[data-gallery-close]") ?? []);
    const closeButton = section?.querySelector("[data-gallery-close-button]");
    const triggers = Array.from(galleryRoot.querySelectorAll("[data-gallery-trigger]"));
    let lastTrigger: HTMLElement | null = null;

    const openModal = (trigger: HTMLElement) => {
      if (
        !(modal instanceof HTMLElement) ||
        !(modalImage instanceof HTMLImageElement) ||
        !(modalTitle instanceof HTMLElement) ||
        !(modalArtist instanceof HTMLElement) ||
        !(modalDescription instanceof HTMLElement) ||
        !(modalBook instanceof HTMLElement) ||
        !(modalArtistDetail instanceof HTMLElement) ||
        !(modalDate instanceof HTMLElement) ||
        !(modalAlt instanceof HTMLElement) ||
        !(modalLink instanceof HTMLAnchorElement)
      ) {
        return;
      }

      lastTrigger = trigger;
      modalImage.src = trigger.dataset.image ?? "";
      modalImage.alt = trigger.dataset.alt ?? "";
      modalTitle.textContent = trigger.dataset.title ?? "";
      modalArtist.textContent = trigger.dataset.artistLabel ?? "";
      modalDescription.textContent = trigger.dataset.description ?? "";
      modalBook.textContent = trigger.dataset.bookLabel ?? "";
      modalArtistDetail.textContent = trigger.dataset.artistLabel ?? "";
      modalDate.textContent = trigger.dataset.date ?? "";
      modalAlt.textContent = trigger.dataset.alt ?? "";
      const bookHref = trigger.dataset.bookHref ?? "";
      modalLink.href = bookHref || "#";
      modalLink.toggleAttribute("hidden", !bookHref);

      modal.classList.remove("pointer-events-none", "opacity-0");
      modal.classList.add("opacity-100");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      if (closeButton instanceof HTMLButtonElement) {
        closeButton.focus();
      }
    };

    const closeModal = () => {
      if (!(modal instanceof HTMLElement)) {
        return;
      }

      modal.classList.add("pointer-events-none", "opacity-0");
      modal.classList.remove("opacity-100");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";

      if (lastTrigger instanceof HTMLElement) {
        lastTrigger.focus();
      }
    };

    triggers.forEach((trigger) => {
      if (trigger instanceof HTMLElement) {
        trigger.addEventListener("click", () => openModal(trigger));
      }
    });

    if (closeButton instanceof HTMLButtonElement) {
      closeButton.addEventListener("click", closeModal);
    }

    closeButtons.forEach((button) => {
      button.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal?.getAttribute("aria-hidden") === "false") {
        closeModal();
      }
    });
  });
};
