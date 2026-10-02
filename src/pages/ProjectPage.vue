<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { bySlug, nextOf, TEMPLATES } from '../data/projects'
import ProjectHero from '../components/project/ProjectHero.vue'
import ProjectOverview from '../components/project/ProjectOverview.vue'
import ProjectSection from '../components/project/ProjectSection.vue'
import NextProject from '../components/project/NextProject.vue'

const route = useRoute()
const project = computed(() => bySlug(route.params.slug))
// The category chooses the structure; a project can hide sections it does not need.
const sections = computed(() =>
  (TEMPLATES[project.value.cat] || []).filter((s) => !project.value.hide?.includes(s.key)),
)
const next = computed(() => nextOf(project.value.slug))
</script>

<template>
  <!-- :key remounts the page so hero/reveal animations replay when moving between projects -->
  <div v-if="project" :key="project.slug" :data-cat="project.cat" class="project">
    <ProjectHero :project="project" />
    <ProjectOverview :project="project" />
    <ProjectSection v-for="(s, i) in sections" :key="s.key" :project="project" :def="s" :n="String(i + 1).padStart(2, '0')" />
    <NextProject :next="next" />
  </div>
</template>
