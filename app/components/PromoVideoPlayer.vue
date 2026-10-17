<script setup lang="ts">
const props = withDefaults(defineProps<{
  autoplay?: boolean
  campaign?: string
}>(), {
  autoplay: true,
  campaign: 'promo_video',
})

const videoRef = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)
const isMuted = ref(true)
const progress = ref(0)
const hasInteracted = ref(false)

function togglePlay() {
  hasInteracted.value = true
  if (!videoRef.value) return
  if (videoRef.value.paused) {
    videoRef.value.play().then(() => {
      isPlaying.value = true
    }).catch(() => {})
  } else {
    videoRef.value.pause()
    isPlaying.value = false
  }
}

function toggleMute() {
  hasInteracted.value = true
  if (!videoRef.value) return
  videoRef.value.muted = !videoRef.value.muted
  isMuted.value = videoRef.value.muted
  if (videoRef.value.paused) {
    videoRef.value.play().then(() => {
      isPlaying.value = true
    }).catch(() => {})
  }
}

function onTimeUpdate() {
  if (!videoRef.value || !videoRef.value.duration) return
  progress.value = (videoRef.value.currentTime / videoRef.value.duration) * 100
}

function onEnded() {
  isPlaying.value = false
  progress.value = 100
}

onMounted(() => {
  if (!videoRef.value) return

  // Autoplay when visible via IntersectionObserver
  if (props.autoplay && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!videoRef.value) return
          if (entry.isIntersecting && !hasInteracted.value) {
            videoRef.value.play().then(() => {
              isPlaying.value = true
            }).catch(() => {
              // Browser policy may prevent autoplay; remains paused with poster
              isPlaying.value = false
            })
          } else if (!entry.isIntersecting && !videoRef.value.paused && !hasInteracted.value) {
            videoRef.value.pause()
            isPlaying.value = false
          }
        })
      },
      { threshold: 0.35 }
    )

    observer.observe(videoRef.value)

    onUnmounted(() => {
      observer.disconnect()
    })
  }
})
</script>

<template>
  <div class="promo-video-wrapper">
    <div class="promo-video-device" :class="{ 'is-paused': !isPlaying }">
      <video
        ref="videoRef"
        class="promo-video"
        src="/sapid-promo.mp4"
        poster="/sapid-promo-poster.jpg"
        playsinline
        loop
        :muted="isMuted"
        preload="metadata"
        aria-label="Sapid app promo and feature demonstration"
        @timeupdate="onTimeUpdate"
        @play="isPlaying = true"
        @pause="isPlaying = false"
        @ended="onEnded"
        @click="togglePlay"
      />

      <!-- Play / Pause Overlay Button -->
      <button
        type="button"
        class="overlay-play-btn"
        :class="{ visible: !isPlaying }"
        :aria-label="isPlaying ? 'Pause promo video' : 'Play promo video'"
        @click="togglePlay"
      >
        <Icon :name="isPlaying ? 'lucide:pause' : 'lucide:play'" />
      </button>

      <!-- Sound Mute/Unmute Badge -->
      <button
        type="button"
        class="sound-badge"
        :aria-label="isMuted ? 'Unmute video audio' : 'Mute video audio'"
        @click.stop="toggleMute"
      >
        <Icon :name="isMuted ? 'lucide:volume-x' : 'lucide:volume-2'" />
        <span>{{ isMuted ? 'Sound on' : 'Sound off' }}</span>
      </button>

      <!-- Video Timeline Progress Bar -->
      <div class="video-progress-bar" role="progressbar" :aria-valuenow="Math.round(progress)" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-fill" :style="{ width: `${progress}%` }" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.promo-video-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.promo-video-device {
  position: relative;
  width: 100%;
  max-width: 320px;
  aspect-ratio: 9 / 16;
  border-radius: 2.25rem;
  background-color: #0c0f0d;
  overflow: hidden;
  box-shadow:
    0 25px 60px -15px rgba(17, 24, 39, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    0 12px 30px -10px rgba(46, 125, 68, 0.25);
  transform: translateZ(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.promo-video-device:hover {
  box-shadow:
    0 30px 70px -12px rgba(17, 24, 39, 0.45),
    0 0 0 1px rgba(125, 201, 139, 0.3),
    0 16px 36px -8px rgba(46, 125, 68, 0.35);
}

.promo-video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  background: #0c0f0d;
}

/* Play/Pause Center Button */
.overlay-play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(12, 15, 13, 0.82);
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  color: var(--color-white);
  font-size: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease, background-color 0.2s ease;
  backdrop-filter: blur(8px);
  z-index: 10;
}

.overlay-play-btn.visible {
  opacity: 1;
  pointer-events: auto;
  transform: translate(-50%, -50%) scale(1);
}

.promo-video-device:hover .overlay-play-btn {
  opacity: 1;
  pointer-events: auto;
  transform: translate(-50%, -50%) scale(1);
}

.overlay-play-btn:hover {
  background: rgba(46, 125, 68, 0.9);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translate(-50%, -50%) scale(1.08);
}

/* Sound badge in top corner */
.sound-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  background: rgba(12, 15, 13, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #e4eae4;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: all 0.2s ease;
  z-index: 10;
}

.sound-badge:hover {
  background: rgba(46, 125, 68, 0.85);
  border-color: rgba(125, 201, 139, 0.5);
  color: #ffffff;
  transform: scale(1.04);
}

/* Progress bar at bottom */
.video-progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.18);
  overflow: hidden;
  z-index: 10;
}

.progress-fill {
  height: 100%;
  background: var(--color-primary-400);
  transition: width 0.1s linear;
}

@media (max-width: 640px) {
  .promo-video-device {
    max-width: 280px;
    border-radius: 1.75rem;
  }
  .overlay-play-btn {
    width: 54px;
    height: 54px;
    font-size: 1.5rem;
  }
}
</style>
