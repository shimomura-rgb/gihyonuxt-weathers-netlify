<script setup lang="ts">
import type {City} from "@/interfaces";

const route = useRoute();
const cityList = useState<Map<number, City>>("cityList");
const selectedCity = computed(
	(): City => {
		const idNo = Number(route.params.id);
		return cityList.value.get(idNo) as City;
	}
);
const asyncData = useWeatherInfoFetcher(selectedCity.value);
const weatherDescription = asyncData.data;
const pending = asyncData.pending;
</script>

<template>
	<p v-if="pending">データ取得中…</p>
	<section v-else>
		<h2>{{selectedCity.name}}の天気</h2>
		<p>{{weatherDescription}}</p>
	</section>
	<p>リストに<NuxtLink v-bind:to="{name: 'index'}">戻る</NuxtLink></p>
</template>
