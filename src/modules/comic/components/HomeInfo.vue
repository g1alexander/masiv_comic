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
  <h1 data-home="title" class="home-section__h1">{{ comic.getComic.title.toUpperCase() }}</h1>
  <img
    data-home="img"
    class="home-section__img"
    :src="comic.getComic.img"
    :alt="comic.getComic.alt"
  />

  <div class="home-section__stars">
    <h3>Rate:</h3>
    <p>
      <template v-for="star in 5" :key="star">
        <i
          data-home="star"
          :data-star="`s-${star}`"
          @click="setStar(star)"
          class="home-section__stars__icon"
          :class="starClass(star)"
        ></i>
      </template>
    </p>
  </div>
</template>
