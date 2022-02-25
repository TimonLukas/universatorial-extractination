<template lang="pug">
button.ui-button: slot
</template>

<style lang="sass" scoped>
// Based on https://codepen.io/cobra_winfrey/pen/mdJeqZb
$border-width: 2px
$border-color: #888888
$transition-duration: 0.25s
$transition-direction: 0

$gradient1: linear-gradient(to right, $border-color 0%, $border-color 100%)
$gradient2: linear-gradient(to top, $border-color 50%, transparent 50%)
$gradient3: linear-gradient(to top, $border-color 50%, transparent 50%)
$gradient4: linear-gradient(to right, $border-color 0%, $border-color 100%)
$gradient5: linear-gradient(to left, $border-color 0%, $border-color 100%)

.ui-button
  position: relative
  color: #EEEEEE
  padding: 1rem
  background: #333333
  border: 1px solid #555555
  text-align: center
  flex-grow: 1
  cursor: pointer
  transition: background $transition-duration
  box-shadow: 0 .15rem 10px rgba(0, 0, 0, 0.75)

  &:before
    filter: blur(2px)
    content: ""
    position: absolute
    width: calc(100% + #{$border-width * 2})
    height: calc(100% + #{$border-width * 2})
    top: -$border-width
    left: -$border-width
    background-image: $gradient1, $gradient2, $gradient3, $gradient4, $gradient5
    background-size: 100% $border-width, $border-width 200%, $border-width 200%, 0 $border-width, 0 $border-width
    background-position: 50% 100%, 0 0, 100% 0, 100% 0, 0 0
    background-repeat: no-repeat
    transform: scaleX(0) rotate(#{$transition-direction * 180}deg)
    transition: transform $transition-duration ease-in-out $transition-duration * 2, background-position $transition-duration ease-in-out $transition-duration, background-size $transition-duration ease-in-out 0s

  &:hover
    background: #444444

    &:before
      background-size: 200% $border-width, $border-width 400%, $border-width 400%, 55% $border-width, 55% $border-width
      background-position: 50% 100%, 0 100%, 100% 100%, 100% 0, 0 0
      transform: scaleX(1) rotate(#{$transition-direction * 180}deg)
      transition-delay: 0s, $transition-duration, $transition-duration * 2
</style>
