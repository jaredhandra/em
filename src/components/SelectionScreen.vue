<template>
  <q-stepper v-model="step" header-nav ref="stepper" color="primary" animated>
    <q-step
      :name="1"
      title="Select Manufacturer"
      icon="settings"
      :done="step > 1"
      :header-nav="step > 1"
    >
      Select a Manufacturer from the list.
      <q-list id="manufacturer-list" bordered separator>
        <q-item
          @click="setManufacturer(manufacturer.id)"
          :active="selectedManufacturer === manufacturer.id"
          active-class="bg-grey-4 text-grey-9"
          clickable
          v-ripple
          v-for="manufacturer in manufacturers"
          :key="manufacturer.id"
        >
          <q-item-section thumbnail>
            <!-- <img src="../" /> -->
          </q-item-section>
          <q-item-section>{{ manufacturer.name }}</q-item-section>
        </q-item>
      </q-list>
      <q-stepper-navigation>
        <q-btn
          :disabled="isManfacturerSelected"
          @click="
            () => {
              done1 = true;
              step = 2;
            }
          "
          color="primary"
          label="Continue"
        />
      </q-stepper-navigation>
    </q-step>

    <q-step
      :name="2"
      title="Create an ad group"
      caption="Optional"
      icon="create_new_folder"
      :done="step > 2"
      :header-nav="step > 2"
    >
      An ad group contains one or more ads which target a shared set of
      keywords.

      <q-stepper-navigation>
        <q-btn
          @click="
            () => {
              done2 = true;
              step = 3;
            }
          "
          color="primary"
          label="Continue"
        />
        <q-btn
          flat
          @click="step = 1"
          color="primary"
          label="Back"
          class="q-ml-sm"
        />
      </q-stepper-navigation>
    </q-step>

    <q-step
      :name="3"
      title="Create an ad"
      icon="add_comment"
      :header-nav="step > 3"
    >
      Try out different ad text to see what brings in the most customers, and
      learn how to enhance your ads using features like ad extensions. If you
      run into any problems with your ads, find out how to tell if they're
      running and how to resolve approval issues.

      <q-stepper-navigation>
        <q-btn color="primary" @click="done3 = true" label="Finish" />
        <q-btn
          flat
          @click="step = 2"
          color="primary"
          label="Back"
          class="q-ml-sm"
        />
      </q-stepper-navigation>
    </q-step>
  </q-stepper>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SelectionScreen",
  data() {
    return {
      step: 1,
      selectedManufacturer: ""
    };
  },
  computed: {
    isManfacturerSelected() {
      return this.selectedManufacturer === "";
    },
    ...mapState({
      manufacturers: state => state.manufacturers.manufacturersList
    })
  },
  methods: {
    setManufacturer: function(id) {
      this.selectedManufacturer = id;
    }
  }
};
</script>

<style>
.manufacturer-list {
  max-height: 350px;
  overflow: scroll;
}
</style>
