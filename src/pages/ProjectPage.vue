<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { bySlug, nextOf } from '../data/projects'
import ProjectDetail from '../components/project/ProjectDetail.vue'
import NextProject from '../components/project/NextProject.vue'

const route = useRoute()
const project = computed(() => bySlug(route.params.slug))
// a project can name its own next project; otherwise follow the list order
const next = computed(() => (project.value.next && bySlug(project.value.next)) || nextOf(project.value.slug))
</script>

<template>
  <!-- :key remounts the page so animations replay when moving between projects -->
  <div v-if="project" :key="project.slug" :data-cat="project.cat" class="project">
    <ProjectDetail :project="project" />
    <NextProject :next="next" />
  </div>
</template>
