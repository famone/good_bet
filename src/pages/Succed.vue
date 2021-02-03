<template>
	<section id="p-404">
		<div class="text-center">
			<img src="../assets/img/success.svg" class="successfully"><br>
		 	<h2>{{ $t('success.successDescription') }}</h2><br>
			<router-link tag="button" to="/transactions" class="reg-btn">
        {{ $t('success.goToTransactionsLink') }}
			</router-link>
		</div>
	</section>
</template>

<style>
.successfully {
	height: 35px;
	margin-bottom: 15px;
}
</style>