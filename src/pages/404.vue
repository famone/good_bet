<template>
  <section id="p-404">
    <div class="text-center">
      <h2>404</h2><br>
      <h2>{{ $t('404.errorTitle') }}</h2><br>
      <router-link tag="button" to="/" class="reg-btn">
        {{ $t('main.goHomeLink') }}
      </router-link>
    </div>
  </section>
</template>