<script setup>
import MuBaseCard from '@/ui/cards/MuBaseCard/MuBaseCard.vue'
import MuButton from '@/ui/buttons/MuButton/MuButton.vue'
import MuActionButton from '@/ui/buttons/MuActionButton/MuActionButton.vue'
import MuBackButton from '@/ui/buttons/MuBackButton/MuBackButton.vue'
import MuCloseButton from '@/ui/buttons/MuCloseButton/MuCloseButton.vue'
import MuItemCard from '@/ui/cards/MuItemCard/MuItemCard.vue'
import MuThumbnail from '@/ui/cards/MuThumbnail/MuThumbnail.vue'
import MuPageTitle from '@/ui/typography/MuPageTitle/MuPageTitle.vue'
import MuSectionTitle from '@/ui/typography/MuSectionTitle/MuSectionTitle.vue'
import MuTextInput from '@/ui/inputs/MuTextInput/MuTextInput.vue'
import MuSlider from '@/ui/sections/MuSlider/MuSlider.vue'
import MuSlide from '@/ui/sections/MuSlider/MuSlide.vue'
import MuPracticeTimer from '@/ui/user/MuPracticeTimer/MuPracticeTimer.vue'
import MuDotSeparator from '@/ui/typography/MuDotSeparator/MuDotSeparator.vue'
import MuTabButton from '@/ui/actions/MuTabButton/MuTabButton.vue'
import MuHorizontalCardItemsWrapper from '@/ui/cards/MuHorizontalCardItemsWrapper/MuHorizontalCardItemsWrapper.vue'
import MuCheckBox from '@/ui/inputs/MuCheckBox/MuCheckBox.vue'
import MuFormField from '@/ui/inputs/MuFormField/MuFormField.vue'
import MuTextarea from '@/ui/inputs/MuTextarea/MuTextarea.vue'

const itemCardData = { title: 'Item Card', description: 'Description here' }
const pageTitle = 'My Application Page'
const sectionTitle = 'UI Components Showcase'
const inputValue = ''

const sliderItems = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  imageUrl: `https://picsum.photos/seed/${i + 1}/300/200`, // Using picsum for placeholder images
}))

const thumbnailSrc = 'https://drumeoblog.s3.amazonaws.com/beat/wp-content/uploads/2021/11/25162345/old-man-jared-blog-header.jpg'
</script>

<template>
 <div class="p-4 space-y-4">
  <MuBaseCard>
   <p>If you change this text asdasd, you'll see around 1 second of lag (the more different components with @reference are added, the more lag you'll see), <br />
    also you'll see in the console that all other components are re-built that should not be impacted. If you remove all components except this one, and restart with npm run dev, changes are instant.</p>
  </MuBaseCard>
  
  <MuPageTitle :title="pageTitle" />
  <MuSectionTitle :title="sectionTitle" />



  <MuHorizontalCardItemsWrapper>
    <MuButton>Click Me</MuButton>
  <MuActionButton>Action</MuActionButton>
  <MuTabButton>Tab</MuTabButton>
  </MuHorizontalCardItemsWrapper>
  <MuThumbnail :imgUrl="thumbnailSrc" alt="Placeholder" />

  <MuBackButton />
  <MuCloseButton />

  <MuItemCard :item="itemCardData" />

  <MuTextInput v-model="inputValue" placeholder="Enter text" />

  <MuCheckBox />

  <MuFormField label="Label" :error="true" :error-message="errorMessage" />
  <MuTextarea v-model="inputValue" placeholder="Enter text" />

  <MuSectionTitle title="Slider Showcase" />
  <MuSlider :slides-per-view="4" :slide-width="300">
   <MuSlide v-for="item in sliderItems" :key="item.id">
    <img :src="item.imageUrl" alt="Placeholder Image" class="w-full h-auto object-cover rounded" />
   </MuSlide>
  </MuSlider>

  <MuPracticeTimer />
  <MuDotSeparator />
 </div>
</template>
