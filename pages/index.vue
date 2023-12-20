<script setup lang="ts">
import type {City} from "@/interfaces";

//都市情報リストをステートから取得。
const cityList = useState<Map<number, City>>("cityList");
</script>

<template>
	<section>
		<h2>都市リスト</h2>
		<ul>
			<li
				v-for="[id, city] in cityList"
				v-bind:key="id">
				<NuxtLink v-bind:to="{name: 'WeatherInfo-id', params: {id: id}}">
					{{city.name}}の天気
				</NuxtLink>
			</li>
		</ul>
	</section>
</template>
