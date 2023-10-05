<script setup lang="ts">
import { useComicStore } from '../store'

const comic = useComicStore()

const setStar = (star: number) => comic.setStar(star)

const starClass = (star: number) => {
  return {
    active: star <= comic.getComic.stars,
    disabled: star > comic.getComic.stars
  }
}
</script>

<template>
  <h1 class="home-section__h1">{{ comic.getComic.title.toUpperCase() }}</h1>
  <img class="home-section__img" :src="comic.getComic.img" :alt="comic.getComic.alt" />

  <div class="home-section__stars">
    <h3>Puntuacion:</h3>
    <p>
      <template v-for="star in 5" :key="star">
        <i @click="setStar(star)" class="home-section__stars__icon" :class="starClass(star)"></i>
      </template>
    </p>
  </div>
</template>
