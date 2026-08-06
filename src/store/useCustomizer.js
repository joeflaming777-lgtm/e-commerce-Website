import { create } from 'zustand'

export const BAT_OPTIONS = {
  woodTone: {
    label: 'Willow grade',
    values: [
      { key: 'english', name: 'English Willow (Pro)', color: '#E4E4E4' },
      { key: 'kashmir', name: 'Kashmir Willow', color: '#C9C9C9' },
      { key: 'vintage', name: 'Vintage Dry Willow', color: '#B4B4B4' },
      { key: 'dark', name: 'Premium Select', color: '#8A8A8A' },
    ],
  },
  gripColor: {
    label: 'Grip colour',
    values: [
      { key: 'espresso', name: 'Ink', color: '#1A1A1A' },
      { key: 'graphite', name: 'Graphite', color: '#2E2E2E' },
      { key: 'cream', name: 'Ivory', color: '#EFEFEF' },
      { key: 'oxblood', name: 'Charcoal', color: '#1F1F1F' },
      { key: 'willow', name: 'Slate', color: '#454545' },
    ],
  },
  sticker: {
    label: 'Sticker style',
    values: [
      { key: 'classic', name: 'Classic', color: '#0A0A0A' },
      { key: 'crimson', name: 'Charcoal', color: '#2E2E2E' },
      { key: 'forest', name: 'Slate', color: '#4A4A4A' },
      { key: 'gold', name: 'Ivory', color: '#E0E0E0' },
    ],
  },
}

export const JERSEY_OPTIONS = {
  baseColor: {
    label: 'Body colour',
    values: [
      { key: 'navy', name: 'Ink', color: '#0F0F0F' },
      { key: 'forest', name: 'Graphite', color: '#2E2E2E' },
      { key: 'espresso', name: 'Slate', color: '#454545' },
      { key: 'black', name: 'Charcoal', color: '#1F1F1F' },
      { key: 'oxblood', name: 'Stone', color: '#5C5C5C' },
    ],
  },
  sleeveColor: {
    label: 'Sleeve / trim',
    values: [
      { key: 'cream', name: 'Ivory', color: '#EFEFEF' },
      { key: 'gold', name: 'Sand', color: '#C9C9C9' },
      { key: 'white', name: 'White', color: '#FAFAFA' },
      { key: 'orange', name: 'Ash', color: '#9A9A9A' },
    ],
  },
}

export const BALL_COLORS = [
  { key: 'red', name: 'Ink', color: '#262626' },
  { key: 'white', name: 'Ivory', color: '#F5F5F5' },
  { key: 'pink', name: 'Ash', color: '#A8A8A8' },
  { key: 'yellow', name: 'Stone', color: '#6B6B6B' },
]

export const useCustomizer = create((set) => ({
  bat: { woodTone: 'english', gripColor: 'espresso', sticker: 'classic', engraving: '' },
  jersey: { baseColor: 'navy', sleeveColor: 'cream', teamName: '', name: '', number: '07' },
  ball: { color: 'red', seamText: '' },
  setBat: (patch) => set((s) => ({ bat: { ...s.bat, ...patch } })),
  setJersey: (patch) => set((s) => ({ jersey: { ...s.jersey, ...patch } })),
  setBall: (patch) => set((s) => ({ ball: { ...s.ball, ...patch } })),
}))