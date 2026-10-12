
<script setup lang="ts">
import { computed } from "vue";

import { projectId } from "../../../composables/useRouteObserver";
import { projectModules } from "../../../content/projects";
import type {
  ProjectContent as ProjectContentData,
} from "../../../content/types";

import { locale } from "../../../i18n/store";
import type { Locale } from "../../../i18n/types";

import Link from "../../../components/Link.vue";
import ProjectContent from "./ProjectContent.vue";

/*
 * Locale shuru mein null hota hai.
 * Jab tak language initialize nahi hoti,
 * English project details show hongi.
 */
const activeLocale = computed<Locale>(() =>
  locale.value === "de" ? "de" : "en",
);

/*
 * URL se project slug read karo.
 *
 * Example:
 * /project/shop-co-ecommerce
 *
 * Iska slug:
 * shop-co-ecommerce
 */
const currentProject = computed<ProjectContentData | null>(() => {
  const slug = projectId.value;

  if (!slug) {
    return null;
  }

  const module = projectModules[activeLocale.value][slug] as
    | { default?: ProjectContentData }
    | undefined;

  return module?.default ?? null;
});
</script>

<template>
  <!-- Actual project details -->
  <main
    v-if="projectId && currentProject"
    class="project-detail-page"
  >
    <ProjectContent
      :key="projectId"
      :content="currentProject"
      :project-id="projectId"
    />
  </main>

  <!-- Invalid project URL fallback -->
  <main v-else class="project-not-found">
    <div class="project-not-found-content">
      <p class="project-not-found-eyebrow">
        404 · PROJECT NOT FOUND
      </p>

      <h1>This project could not be found.</h1>

      <p>
        The project link may be incorrect, or its detail
        content has not been added to the project registry yet.
      </p>

      <Link
        to="/"
        class="project-not-found-link"
      >
        Back to portfolio
      </Link>
    </div>
  </main>
</template>

<style scoped lang="scss">
.project-detail-page {
  width: 100%;
  min-height: 100vh;
}

.project-not-found {
  display: flex;
  min-height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: var(--space-outer);
  color: var(--color-text-400);
  background: var(--color-background-400);
}

.project-not-found-content {
  display: flex;
  max-width: 620px;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-md);
}

.project-not-found-eyebrow {
  color: var(--color-text-300);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.project-not-found-content h1 {
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.05;
}

.project-not-found-content > p:not(.project-not-found-eyebrow) {
  line-height: var(--line-height-copy);
}

.project-not-found-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  margin-top: var(--space-sm);
  padding: 0 var(--space-lg);
  border: 1px solid currentColor;
  border-radius: var(--radius-md);
  color: inherit;
  text-decoration: none;
}
</style>
