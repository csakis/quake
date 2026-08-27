<!-- Grid container splits remaining space into 3 fractions -->
<div class="grid flex-1 grid-cols-1 lg:grid-cols-3 overflow-hidden">

	<!-- Left Side Bar / Sub-context Menu (1/3 width) -->
	<section class="border-b lg:border-b-0 lg:border-r border-gray-200 bg-gray-50 p-6 overflow-y-auto">
		<h2 class="font-semibold text-lg mb-4">Context Sidebar (1/3)</h2>
		<p class="text-sm text-gray-600 mb-4">Great for items lists, data filtering, or sub-category feeds.</p>
		<div class="space-y-3">
			<div class="p-3 bg-white rounded border border-gray-200 shadow-xs">Item Card 1</div>
			<div class="p-3 bg-white rounded border border-gray-200 shadow-xs">Item Card 2</div>
			<div class="p-3 bg-white rounded border border-gray-200 shadow-xs">Item Card 3</div>
		</div>
	</section>

	<!-- Main Component Content (2/3 width) -->
	<main class="lg:col-span-2 bg-white p-6 overflow-y-auto">
		<h1 class="text-2xl font-bold mb-4">Main Content View (2/3)</h1>
		<p class="text-gray-600 leading-relaxed">
			This area displays your primary focused content, detail views, or large data forms.
			Both columns will scroll independently without forcing the global application navbar
			or left application sidebar to slide out of view.
		</p>
	</main>

</div>
