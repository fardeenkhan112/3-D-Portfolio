
<script setup lang="ts">
import { computed, type PropType } from "vue";
import ImageText from "./ImageText.vue";
import Text from "./Text.vue";
import List from "./List.vue";
import Media from "./Media.vue";

type ComponentType = "imageText" | "text" | "list" | "media";

const componentMap = {
  imageText: ImageText,
  text: Text,
  list: List,
  media: Media,
};

const props = defineProps({
  type: {
    type: String as PropType<ComponentType>,
    required: true,
  },
  props: {
    type: Object as PropType<Record<string, unknown>>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const SelectedComponent = computed(
  () => componentMap[props.type]
);
</script>

<template>
  <component
    :is="SelectedComponent"
    v-bind="props.props"
    :index="props.index"
  />
</template>