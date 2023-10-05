<script lang="ts" setup>
import { useComic } from '../composables'

const { comic, setStar, starClass } = useComic()
</script>

<template>
  <main>
    <span v-if="comic.getIsLoading">loading...</span>
    <section v-else>
      <h1>title: {{ comic.getComic.title }}</h1>
      <img :src="comic.getComic.img" :alt="comic.getComic.alt" />

      <div>Puntuacion:</div>

      <p>
        <template v-for="star in 5" :key="star">
          <i @click="setStar(star)" class="star" :class="starClass(star)"></i>
        </template>
      </p>

      <button v-if="comic.getPage > 1" @click="comic.setPage(comic.getPage - 1)">prev</button>
      <button @click="comic.setPage(comic.getPage + 1)">next</button>
    </section>
  </main>
</template>
