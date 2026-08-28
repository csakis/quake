<script>
  // Svelte 5 rune for page layout children
  import "./layout.css";
  import favicon from "#lib/assets/favicon.svg";
  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="flex h-screen w-screen flex-col overflow-hidden bg-gray-50 text-gray-900">
  <!-- Top Navbar -->
  <header class="flex h-16 w-full shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
    <div class="text-xl font-bold">AppLogo</div>
    <nav class="flex gap-4">
      <a href="/" class="hover:text-blue-600">Dashboard</a>
      <a href="/settings" class="hover:text-blue-600">Settings</a>
    </nav>
  </header>

  <!-- Main Body Wrapper -->
  <div class="flex flex-1 overflow-hidden">
    <!-- Left Sidebar (Global App Navigation) -->
    <aside class="hidden w-64 shrink-0 border-r border-gray-200 bg-white p-4 md:block">
      <ul class="space-y-2">
        <li><a href="/" class="block rounded-sm p-2 font-medium hover:bg-gray-100">Overview</a></li>
      </ul>
    </aside>

    <!-- Svelte 5 render tag pushes data to +page.svelte -->
    {@render children()}
  </div>
</div>
