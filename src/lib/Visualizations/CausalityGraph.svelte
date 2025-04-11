<script lang="ts">
  import { onMount } from 'svelte';
  import { HeatmapChart } from '@carbon/charts-svelte';
  import '@carbon/charts-svelte/styles.css';
  import { scaleSequential } from 'd3-scale';
  import { interpolateOrRd } from 'd3-scale-chromatic';
  import { ScaleTypes } from '@carbon/charts/interfaces';

  // Data state
  let sentimentToStockData: HeatmapDataPoint[] = [];
  let stockToSentimentData: HeatmapDataPoint[] = [];
  let isLoading = true;
  let activeTab: 'sentimentToStock' | 'stockToSentiment' = 'sentimentToStock';
  let error: string | null = null;

// Type definitions
type HeatmapDataPoint = {
  stock: string;
  lag: number;
  value: number;
};

// Color scale for heatmaps
const colorScale = scaleSequential(interpolateOrRd).domain([0, 4]);

// Corrected heatmap options with working white text
const heatmapOptions = {
  title: '',
  axes: {
    bottom: {
      title: 'Lag (days)',
      mapsTo: 'lag',
      scaleType: ScaleTypes.LABELS
    },
    left: {
      title: 'Stock',
      mapsTo: 'stock',
      scaleType: ScaleTypes.LABELS
    }
  },
  color: {
    scale: colorScale,
    gradient: {
      enabled: true
    }
  },
  heatmap: {
    colorLegend: {
      title: '-log10(p-value)'
    },
    cell: {
      label: (d: any) => d.datum.value.toFixed(2),  // Corrected access to value
      labelStyle: {
        fill: 'white',
        'font-size': '12px',
        'font-weight': 'bold',
        'text-shadow': '0 0 2px black'  // Adds shadow for better visibility
      }
    }
  }
};


  // Sample data matching your CSV structure
  const sampleSentimentToStock = [
    { stock: 'NIO', lag: 1, value: 3.11 }, { stock: 'NIO', lag: 2, value: 2.42 },
    { stock: 'NIO', lag: 3, value: 3.01 }, { stock: 'NIO', lag: 4, value: 3.22 },
    { stock: 'NIO', lag: 5, value: 2.97 }, { stock: 'TSLA', lag: 1, value: 2.87 },
    { stock: 'TSLA', lag: 2, value: 2.23 }, { stock: 'TSLA', lag: 3, value: 2.10 },
    { stock: 'TSLA', lag: 4, value: 2.34 }, { stock: 'TSLA', lag: 5, value: 1.96 },
    { stock: 'AMZN', lag: 1, value: 1.55 }, { stock: 'AMZN', lag: 2, value: 2.45 },
    { stock: 'AMZN', lag: 3, value: 2.34 }, { stock: 'AMZN', lag: 4, value: 2.22 },
    { stock: 'AMZN', lag: 5, value: 1.80 }, { stock: 'MSFT', lag: 1, value: 1.43 },
    { stock: 'GOOG', lag: 2, value: 2.43 }, { stock: 'GOOG', lag: 3, value: 2.23 },
    { stock: 'GOOG', lag: 4, value: 1.85 }, { stock: 'GOOG', lag: 5, value: 1.62 },
    { stock: 'PG', lag: 2, value: 1.38 }
  ];

  const sampleStockToSentiment = [
    { stock: 'TSLA', lag: 1, value: 3.32 }, { stock: 'TSLA', lag: 2, value: 3.19 },
    { stock: 'TSLA', lag: 3, value: 2.57 }, { stock: 'TSLA', lag: 4, value: 2.52 },
    { stock: 'TSLA', lag: 5, value: 2.22 }
  ];

  // Load data
  onMount(async () => {
  try {
    sentimentToStockData = sampleSentimentToStock;
    stockToSentimentData = sampleStockToSentiment;
    isLoading = false;
  } catch (err) {
    error = 'Failed to load data';
    isLoading = false;
  }
});

function getCurrentData() {
  return activeTab === 'sentimentToStock' ? sentimentToStockData : stockToSentimentData;
}
</script>

<div class="causality-container">
  <h2>
    {activeTab === 'sentimentToStock' 
      ? 'Granger Causality: Sentiment → Stock Returns' 
      : 'Granger Causality: Stock Returns → Sentiment'}
  </h2>

  {#if error}
    <div class="error">{error}</div>
  {:else if isLoading}
    <div class="loading">Loading causality data...</div>
  {:else}
    <div class="tabs">
      <button 
        class:active={activeTab === 'sentimentToStock'}
        on:click={() => activeTab = 'sentimentToStock'}
      >
        Sentiment → Stock
      </button>
      <button 
        class:active={activeTab === 'stockToSentiment'}
        on:click={() => activeTab = 'stockToSentiment'}
      >
        Stock → Sentiment
      </button>
    </div>

    <div class="heatmap-container">
      <HeatmapChart
        data={getCurrentData()}
        options={heatmapOptions}
      />
    </div>
  {/if}
</div>

<style>
  .causality-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: sans-serif;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  h2 {
    color: #2c3e50;
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 1.5rem;
  }

  .tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
    gap: 1rem;
  }
   /* Additional style to ensure text visibility */
:global(.carbon-charts-heatmap .cell-label) {
  paint-order: stroke;
  stroke: rgba(0,0,0,0.3);
  stroke-width: 2px;
}

  .tabs button {
    padding: 0.5rem 1.5rem;
    background: #f0f0f0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s;
  }

  .tabs button.active {
    background: #0062ff;
    color: white;
  }

  .tabs button:hover:not(.active) {
    background: #e0e0e0;
  }

  .heatmap-container {
    height: 500px;
    width: 100%;
    margin-top: 1rem;
  }

  .loading, .error {
    text-align: center;
    padding: 2rem;
    font-size: 1.1rem;
  }

  .error {
    color: #d32f2f;
  }

  @media (max-width: 768px) {
    .heatmap-container {
      height: 400px;
    }
    
    h2 {
      font-size: 1.3rem;
    }
  }
</style>