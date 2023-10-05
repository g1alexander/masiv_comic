<script setup lang="ts">
import { watch } from 'vue'
import { useComicStore } from '../store'

const comic = useComicStore()

watch(
  () => comic.getPage,
  async () => await comic.setComic()
)
</script>

<template>
  <article class="home-section__btns">
    <button v-if="comic.getPage > 1" @click="comic.setPage(comic.getPage - 1)">prev</button>
    <button @click="comic.setPage(comic.getPage + 1)">next</button>
  </article>
</template>
