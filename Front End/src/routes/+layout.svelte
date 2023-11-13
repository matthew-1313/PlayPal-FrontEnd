<script>
  import Title from "../lib/title.svelte";
  import overallStyle from "../../src/overallStyle.css";
</script>

<div>
  <Title />
  <slot class="mainStyle" />
</div>

<style>
  /* button {
    border-radius: 8px;
    color: #242424;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: rgba(248, 248, 228, 0.87);
    cursor: pointer;
    transition: border-color 0.25s;
  }
  button:hover {
    border-color: rgba(248, 248, 228, 0.87);
  } */
</style>
