import type { Comic, ResponseComicAdapter } from '../services'

export function comicAdapter(payload: Comic): ResponseComicAdapter {
  return {
    alt: payload.alt,
    img: payload.img,
    num: payload.num,
    title: payload.title,
    transcript: payload.transcript,
    stars: 0
  }
}
