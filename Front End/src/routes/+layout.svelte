<script>
  import Title from "../lib/title.svelte";
  import overallStyle from "../overallStyle.css";
</script>

<div>
  <Title />
  <slot class="mainStyle" />
</div>
