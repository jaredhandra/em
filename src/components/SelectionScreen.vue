<template>
  <q-stepper v-model="step" header-nav ref="stepper" color="primary" animated>
    <q-step
      :name="1"
      title="Select manufacturer"
      icon="storefront"
      :done="step > 1"
      :header-nav="step > 1"
    >
      Select a Manufacturer from the list.
      <q-list id="manufacturer-list" bordered separator>
        <q-item
          @click="setManufacturer(manufacturer)"
          :active="selectedManufacturer.id === manufacturer.id"
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
      title="Upload sheet"
      icon="cloud_upload"
      :done="step > 2"
      :header-nav="step > 2"
    >
      Please upload the file from the manufacturer.
      <q-file outlined v-model="uploadedFile">
        <template v-slot:prepend>
          <q-icon name="attach_file"></q-icon>
        </template>
      </q-file>
      <q-stepper-navigation>
        <q-btn @click="uploadFile()" color="primary" label="Process" />
        <!-- <q-btn :disabled="isFileUploaded" @click="uploadFile()" color="primary" label="Process" /> -->
        <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
      </q-stepper-navigation>
    </q-step>
  </q-stepper>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { convertExcelSheet } from "../utils/excelCreation";

export default {
  name: "SelectionScreen",
  data () {
    return {
      step: 2,
      selectedManufacturer: "ideal",
      uploadedFile: null
    };
  },
  computed: {
    isManfacturerSelected () {
      return this.selectedManufacturer === "";
    },
    isFileUploaded () {
      return this.uploadedFile === null;
    },
    ...mapState({
      manufacturers: state => state.manufacturers.manufacturersList
    })
  },
  methods: {
    setManufacturer: function (id) {
      this.selectedManufacturer = id;
    },
    uploadFile: function () {
      convertExcelSheet(this.selectedManufacturer.options, this.uploadedFile);
      this.done2 = true;
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
