<template>
  <q-page class="">
    <div class="q-pa-md">
      <SelectionScreen />
    </div>
  </q-page>
</template>

<script>
import SelectionScreen from "../components/SelectionScreen.vue";

export default {
  name: "PageIndex",
  components: {
    SelectionScreen
  }
};
</script>
