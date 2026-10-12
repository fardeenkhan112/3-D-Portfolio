
<script setup lang="ts">
import Header from "./components/Header.vue";
import { useTranslations } from "./i18n/composables/useTranslations";
import { usePreloader } from "./composables/usePreloader";
import Cursor from "./components/Cursor.vue";
import { useAgent } from "./composables/useAgent";
import { useMusic } from "./features/sounds/composables/useMusic";
import { useHowler } from "./features/sounds/composables/useHowler";
import { useRouteObserver } from "./composables/useRouteObserver";
import Home from "./features/home/components/Home.vue";
import Project from "./features/projects/components/Project.vue";
import { useProjectTransition } from "./composables/useProjectTransition";
import { useScroll } from "./composables/useScroll";
import {
  projectVisible,
  isAdminRoute,
} from "./composables/useRouteObserver";
import ProjectBackground from "./features/projects/components/ProjectBackground.vue";
import { useClickSound } from "./features/sounds/composables/useClickSounds";
import AdminPanel from "./features/admin/AdminPanel.vue";

const { isTransitioning } = useProjectTransition();

useTranslations();
usePreloader();
useMusic();
useHowler();
useScroll();
useRouteObserver();
useClickSound();

const { isTouch } = useAgent();
</script>

<template>
  <Header />

  <!-- Main portfolio page -->
  <div :class="{ 'home-wrapper-projectIsReady': projectVisible }">
    <Home />
  </div>

  <!-- Background animation behind project details -->
  <ProjectBackground />

  <!-- Project details wrapper -->
  <div
    class="project-wrapper"
    :class="{
      'project-wrapper-visible': projectVisible,
      'project-wrapper-transitioning': isTransitioning,
    }"
  >
    <div class="project-page-shell">
      <Project />
    </div>
  </div>

  <!-- Admin panel -->
  <AdminPanel v-if="isAdminRoute" />

  <Cursor v-if="!isTouch" />
</template>

<style lang="scss">
.home-wrapper-projectIsReady {
  visibility: hidden;
  position: fixed;
  inset: 0;
  pointer-events: none;
}

.project-wrapper {
  position: fixed;
  inset: 0;
  overflow: hidden;
  z-index: var(--z-index-layout-project);
  visibility: hidden;
  pointer-events: none;
  width: 100%;

  &-visible {
    /*
     * Keep the stacking order, but let the details page
     * use its natural height and scroll normally.
     */
    position: relative;
    inset: auto;
    overflow: visible;
    min-height: 100vh;
    visibility: visible;
    pointer-events: auto;
  }
}

/*
 * Important:
 * Do not use .project-content here.
 * That class belongs to ProjectContent.vue.
 */
.project-page-shell {
  width: 100%;
  min-height: 100vh;
  overflow: visible;
}
</style>
