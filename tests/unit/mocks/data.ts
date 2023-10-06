import { createApp } from 'vue'

export const comicData = {
  alt: "Don't we all.",
  img: 'https://imgs.xkcd.com/comics/barrel_cropped_(1).jpg',
  num: 1,
  stars: 3,
  title: 'Barrel - Part 1',
  transcript:
    "[[A boy sits in a barrel which is floating in an ocean.]]\nBoy: I wonder where I'll float next?\n[[The barrel drifts into the distance. Nothing else can be seen.]]\n{{Alt: Don't we all.}}"
}

export const comicAPIData = {
  month: '1',
  num: 1,
  link: '',
  year: '2006',
  news: '',
  safe_title: 'Barrel - Part 1',
  transcript:
    "[[A boy sits in a barrel which is floating in an ocean.]]\nBoy: I wonder where I'll float next?\n[[The barrel drifts into the distance. Nothing else can be seen.]]\n{{Alt: Don't we all.}}",
  alt: "Don't we all.",
  img: 'https://imgs.xkcd.com/comics/barrel_cropped_(1).jpg',
  title: 'Barrel - Part 1',
  day: '1'
}

export const dataComponent = {
  HomeInfo: createApp({
    template: `<div></div>`
  }) as any,
  HomeActions: createApp({
    template: `<div></div>`
  }) as any,
  comic: {
    getIsLoading: true
  } as any,
  loader: '/src/assets/icons/loader.svg'
}
