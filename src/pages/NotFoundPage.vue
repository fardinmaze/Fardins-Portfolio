<template>
  <section class="nf">
    <div class="wrap">
      <p class="label accent">404</p>
      <h1>Page not found.</h1>
      <p>That page does not exist, or it moved.</p>
      <RouterLink to="/work" class="btn btn-accent">All work <span class="arr">→</span></RouterLink>
    </div>
  </section>
</template>

<style scoped>
.nf { min-height: 80svh; display: flex; align-items: center; padding-top: var(--nav-h); }
.wrap { display: flex; flex-direction: column; gap: 20px; align-items: flex-start; }
h1 { font-size: clamp(2.6rem, 7vw, 5.4rem); text-transform: uppercase; letter-spacing: -0.05em; }
</style>
