<script lang="ts">
    import CorrelationLagBar from '$lib/Visualizations/CorrelationLagBar.svelte';
    
    // Define the interface for your data
    interface CorrelationData {
        stock_name: string;
        max_correlation: number;
        lag: number;
    }
    
    let loading: boolean = true;
    let error: string | null = null;
    let correlationData: CorrelationData[] = [];
    
    async function fetchData(): Promise<void> {
        try {
            const response = await fetch('/api/correlation-lag');
            if (!response.ok) throw new Error('Failed to fetch data');
            
            // Explicitly type the parsed JSON data
            const data = await response.json() as CorrelationData[];
            correlationData = data;
            loading = false;
        } catch (err) {
            error = err instanceof Error ? err.message : 'Unknown error occurred';
            loading = false;
        }
    }
    
    fetchData();
</script>

<div class="container">
    <h1>Stock Sentiment Correlation Analysis</h1>
    <p class="description">
        This visualization shows the maximum correlation between stock sentiment and price returns,
        with colors indicating the time lag (in days) at which this correlation occurs.
        Blue indicates sentiment leads price (negative lag), red indicates sentiment lags price (positive lag).
    </p>
    
    {#if loading}
        <div class="loading">Loading data...</div>
    {:else if error}
        <div class="error">Error: {error}</div>
    {:else}
        <div class="chart-wrapper">
            <CorrelationLagBar data={correlationData} />
        </div>
        
        <div class="data-table">
            <h2>Correlation Data</h2>
            <table>
                <thead>
                    <tr>
                        <th>Stock</th>
                        <th>Max Correlation</th>
                        <th>Lag (Days)</th>
                    </tr>
                </thead>
                <tbody>
                    {#each correlationData as item (item.stock_name)}
                        <tr>
                            <td>{item.stock_name}</td>
                            <td>{item.max_correlation.toFixed(4)}</td>
                            <td>{item.lag > 0 ? `+${item.lag}` : item.lag}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
</div>

<style>
    .container {
        max-width: 1000px;
        margin: 0 auto;
        padding: 20px;
    }
    
    h1 {
        color: #333;
        margin-bottom: 10px;
    }
    
    .description {
        color: #666;
        margin-bottom: 30px;
        line-height: 1.5;
    }
    
    .chart-wrapper {
        margin: 30px 0;
        border: 1px solid #eee;
        padding: 20px;
        border-radius: 8px;
        background: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .data-table {
        margin-top: 40px;
    }
    
    table {
        width: 100%;
        border-collapse: collapse;
    }
    
    th, td {
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid #eee;
    }
    
    th {
        background-color: #f5f5f5;
        font-weight: bold;
    }
    
    tr:hover {
        background-color: #f9f9f9;
    }
    
    .loading, .error {
        padding: 20px;
        text-align: center;
        font-size: 18px;
    }
    
    .error {
        color: #d32f2f;
    }
</style>