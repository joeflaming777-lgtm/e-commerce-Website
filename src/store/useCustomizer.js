import { create } from 'zustand'

export const BAT_OPTIONS = {
  woodTone: {
    label: 'Willow grade',
    values: [
      { key: 'english', name: 'English Willow (Pro)', color: '#E7D7B6' },
      { key: 'kashmir', name: 'Kashmir Willow', color: '#C9B487' },
      { key: 'vintage', name: 'Vintage Dry Willow', color: '#E0C48F' },
      { key: 'dark', name: 'Premium Select', color: '#B39A6F' },
    ],
  },
  gripColor: {
    label: 'Grip colour',
    values: [
      { key: 'espresso', name: 'Espresso', color: '#3F2A1A' },
      { key: 'graphite', name: 'Graphite', color: '#2B2B2B' },
      { key: 'cream', name: 'Cream', color: '#F3EBD9' },
      { key: 'oxblood', name: 'Oxblood', color: '#6E2B2B' },
      { key: 'willow', name: 'Willow', color: '#6B4A2B' },
    ],
  },
  sticker: {
    label: 'Sticker style',
    values: [
      { key: 'classic', name: 'Classic', color: '#1F1A33' },
      { key: 'crimson', name: 'Crimson', color: '#8A1F21' },
      { key: 'forest', name: 'Forest', color: '#1F4A33' },
      { key: 'gold', name: 'Gold', color: '#A9821F' },
    ],
  },
}

export const JERSEY_OPTIONS = {
  baseColor: {
    label: 'Body colour',
    values: [
      { key: 'navy', name: 'Navy', color: '#1F2840' },
      { key: 'forest', name: 'Forest', color: '#1F4632' },
      { key: 'espresso', name: 'Espresso', color: '#3A2A1E' },
      { key: 'black', name: 'Ink', color: '#23201C' },
      { key: 'oxblood', name: 'Oxblood', color: '#67251F' },
    ],
  },
  sleeveColor: {
    label: 'Sleeve / trim',
    values: [
      { key: 'cream', name: 'Cream', color: '#EFE7D9' },
      { key: 'gold', name: 'Gold', color: '#C09A3E' },
      { key: 'white', name: 'Ivory', color: '#F7F3EC' },
      { key: 'orange', name: 'Tangerine', color: '#D9702A' },
    ],
  },
}

export const BALL_COLORS = [
  { key: 'red', name: 'Test Red', color: '#B33A2B' },
  { key: 'white', name: 'T20 White', color: '#F5F1E6' },
  { key: 'pink', name: 'Day-Night Pink', color: '#E27B8C' },
  { key: 'yellow', name: 'Training Yellow', color: '#E8B93A' },
]

export const useCustomizer = create((set) => ({
  bat: { woodTone: 'english', gripColor: 'espresso', sticker: 'classic', engraving: '' },
  jersey: { baseColor: 'navy', sleeveColor: 'cream', name: '', number: '07' },
  ball: { color: 'red', seamText: '' },
  setBat: (patch) => set((s) => ({ bat: { ...s.bat, ...patch } })),
  setJersey: (patch) => set((s) => ({ jersey: { ...s.jersey, ...patch } })),
  setBall: (patch) => set((s) => ({ ball: { ...s.ball, ...patch } })),
}))