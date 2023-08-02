<script lang="ts">
  /* VARIABLES */

  // PROPS
  export const overrideClass = false;
  export let combStyle = false;

  // CONSTANT
  const { class: customClass, ...buttonProps } = {
    class: $$restProps.class,
    ...$$restProps,
  };

  // DYNAMIC
  $: defaultClass = combStyle ? 'aaaaa' : 'bbb';
  /*************/
</script>

{#if combStyle}
  NOT YET DONE
  <!-- <div class="button" on:click on:mouseover on:focus on:mouseenter on:mouseleave on:keypress>
    <div class="hex">
      <div />
      <div />
      <div />
      <div class="hex-content">
        <slot />
      </div>
    </div>
  </div> -->
{:else}
  <button
    on:click
    on:mouseover
    on:focus
    on:mouseenter
    on:mouseleave
    class={overrideClass ? customClass : `${defaultClass}${customClass ? ' ' + customClass : ''}`}
    {...buttonProps}
  >
    <slot />
    {combStyle}
  </button>
{/if}

<style lang="scss">
  /* is still in wip
  // Hexagon
  $sqrt3: 1.7320508075688772;
  $edgeSize: 20px;
  $hexWidth: $edgeSize * 2;
  $hexHeight: $sqrt3 * $edgeSize;

  // Display
  $borderHover: 15px;
  $soft-white: rgb(0, 0, 0);

  // Easing
  $ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  $ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);

  .con {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0) rotate(30deg);
  }

  .button {
    cursor: pointer;
    width: $hexWidth;
    height: $hexHeight;
    float: left;

    &:nth-child(3) {
      margin-right: 0;
    }
  }

  .hex {
    position: relative;
    top: 0;
    left: $edgeSize/2;
    width: $edgeSize;
    height: $hexHeight;
    opacity: 0.5;

    // Inset
    &:first-child {
      transform: scale(0.9);
      transition: all 0.3s $ease-out-quart;
      z-index: 0;
    }

    // Outset
    &:nth-child(3) {
      transition: all 0.3s $ease-out-expo;
      z-index: 1;
    }

    div {
      box-sizing: border-box;
      position: absolute;
      top: 0;
      width: $edgeSize;
      height: $hexHeight;

      &:before,
      &:after {
        content: ' ';
        position: absolute;
        background: $soft-white;
        width: 100%;
        height: 1px;

        transition: height 0.3s $ease-out-quart;
      }
      &:before {
        top: 0;
      }
      &:after {
        bottom: 0;
      }
      &:nth-child(1) {
        transform: rotate(0deg);
      }
      &:nth-child(2) {
        transform: rotate(60deg);
      }
      &:nth-child(3) {
        transform: rotate(120deg);
      }

      transform-origin: center center;
    }

    .hex-content {
      position: absolute;
      text-align: center;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;

      color: black;
      height: fit-content;
      &:before,
      &:after {
        content: none;
      }
    }
  }
  */
</style>
