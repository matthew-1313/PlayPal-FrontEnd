<script>
    export let title = "PlayPals"
</script>
<section class="wrapper">
    <div class="top">{title}</div>
    <div class="bottom" aria-hidden="true">{title}</div>
  </section>
<style>
* {
  box-sizing: border-box;
}
:root {
  --text-color: hsl(0, 0%, 100%);
}
.wrapper {
  --background-color: black;
  display: grid;
  place-content: center;
  background-color: var(--background-color);
  min-height: 10vh;
  font-family: "Oswald", sans-serif;
  font-size: clamp(1.5rem, 1rem + 6vw, 10rem);
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-color);
}

.wrapper > div {
  grid-area: 1/1/-1/-1;
}
.top {
  clip-path: polygon(0% 0%, 100% 0%, 100% 48%, 0% 58%);
}
.bottom {
  clip-path: polygon(0% 60%, 100% 50%, 100% 100%, 0% 100%);
  color: transparent;
  background: -webkit-linear-gradient(177deg, black 53%, var(--text-color) 65%);
  background: linear-gradient(177deg, black 53%, var(--text-color) 65%);
  background-clip: text;
  -webkit-background-clip: text;
  transform: translateX(-0.02em);
}

</style>