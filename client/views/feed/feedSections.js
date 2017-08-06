import madhoofAndWharvus from './MadhoofAndWharvus.png'
import stampedPortrait from './StampPortrait.png'
import artworkYugioh from './artworkYugioh.jpg'

// import agrisaurusTimelineAnimation from './agrisaurusTimelineAnimation.gif'
import agrisaurusLightboxAnimation from './agrisuarusLightboxAnimation.gif'
import agrisaurusClustering from './agrisaurusClustering.png'

import farmscapeInstall from './farmscapeInstall.png'
import farmscapeHomepage from './farmscapeHomepage.jpg'

import ytkBloodOrb from './ytkBloodOrb_smooth_short_small.gif'
import ytkBloodOrbStill from './ytkBloodOrb_still.jpg'

import claraBestMatchLoan from './claraBestMatchLoan__once.gif'

const featuredArtwork = [
  {
    imageSrc: madhoofAndWharvus,
    caption: 'Concept art for a comics project',
    size: 'natural',
  },
  {
    imageSrc: stampedPortrait,
    caption: 'Stamped self-portrait',
    size: 'natural',
  },
  {
    imageSrc: artworkYugioh,
    caption: "First photoshop project (2003), for a friend's RPG Maker game.",
    size: 'natural',
  },
]

export default [
  {
    key: 'clara',
    props: {
      primaryColor: 'black',
      secondaryColor: 'white',
      subtitle: 'An intuitive home mortgage experience',
      tldr:
        'Established frontend architecture with react, redux and rxjs. Vetted the frontend team. Developing loan recommendation algorithms.',
      gallerySize: 'medium',
      featuredItems: [
        {
          imageSrc: claraBestMatchLoan,
          size: 'natural',
        },
      ],
    },
  },
  {
    key: 'agrisaurus',
    props: {
      primaryColor: '#3c9ae4', // '#5396c8', // 'blue',
      secondaryColor: 'white',
      subtitle: 'Gardening best practices, accessible to everyone',
      tldr:
        'Designed the UI, implemented features in Backbone.js, and developed plant-packing algorithms to maximum yield/sqft.',
      gallerySize: 'medium',
      featuredItems: [
        {
          imageSrc: agrisaurusLightboxAnimation,
          size: 'natural',
        },
        {
          imageSrc: agrisaurusClustering,
          size: 'natural',
        },
      ],
    },
  },
  {
    key: 'ytk',
    props: {
      primaryColor: '#fffb77', // 'yellow',
      secondaryColor: '#ff3535', // 'red',
      subtitle: 'An interactive web comic, set in the Star Wars universe',
      tldr:
        'Adapted finished art into an interactive web comic, with animations driven by scrolling.',
      gallerySize: 'medium',
      viewports: 2,
      featuredItems: [
        {
          imageSrc: ytkBloodOrb,
          placeholder: ytkBloodOrbStill,
          size: 'natural',
          controlledGIF: true,
        },
      ],
    },
  },
  {
    key: 'farmscape',
    props: {
      primaryColor: '#227a3c', // 'green',
      secondaryColor: 'white',
      subtitle: 'The largest urban farming venture in the US',
      tldr:
        'Designed the original brand and developed multiple iterations of the website.',
      gallerySize: 'medium',
      featuredItems: [
        {
          imageSrc: farmscapeHomepage,
          grow: 2,
          size: 'natural',
        },
        {
          imageSrc: farmscapeInstall,
          size: 'natural',
        },
      ],
    },
  },
  {
    key: 'artwork',
    props: {
      primaryColor: 'white',
      secondaryColor: 'black',
      size: 'fullscreen',
      gallerySize: 'large',
      galleryStyle: 'autoscroll',
      viewports: featuredArtwork.length * 0.9,
      featuredItems: featuredArtwork,
    },
  },
]
