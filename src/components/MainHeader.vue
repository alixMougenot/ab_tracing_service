<!-- Copyright (c) 2023, Alix Mougenot (Au pied des Arbres), alix.mougenot@gmail.com -->
<!-- See license file. -->
<script setup lang="ts"></script>
<template>
  <div class="header-container">
    <div class="flex-row center">
      <div class="title-container">
        <h3>Plop</h3>
      </div>

      <div id="toolbar" class="flex-row"></div>
      <div class="search flex-row">
        <div id="searchbar"></div>
      </div>
    </div>

    <div class="login-container">
      <span class="button">Logout</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
  margin: 0px var(--vp-margin-right);
  height: 100%;
}

#toolbar {
  min-width: 700px;
}

.search {
  min-width: 600px;
  border-radius: 6px;
  padding: 6px 1em;

  #searchbar {
    flex-grow: 1;
  }
}
.login-container {
  display: flex;
  margin-right: 1em;
}
.title-container {
  display: flex;
  width: calc(var(--vp-menu-width) - var(--vp-margin-right));
}

.flex-row {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  column-gap: 1em;

  &.center {
    align-items: center;
  }
}
.logo {
  display: block;
  margin: 0 1em 0 0;
}
</style>
