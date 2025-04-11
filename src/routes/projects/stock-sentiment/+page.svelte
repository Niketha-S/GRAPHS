<script>
    import ReturnsSentimentLine from "$lib/Visualizations/ReturnsSentimentLine.svelte";
    import CorrelationLagBar from "$lib/Visualizations/CorrelationLagBar.svelte";
    import CausalityGraph from "$lib/Visualizations/CausalityGraph.svelte";
    
</script>

<h1>Stock Sentiment Analysis Project</h1>

<div class="visualizations">
    <section>
        <h2>Returns vs. Sentiment</h2>
        <ReturnsSentimentLine />
    </section>
    <section>
        <h2>Max Correlation by stock with lag based Coloring</h2>
        <CorrelationLagBar />
    </section>
    <section>
        <h2>Causality Analysis</h2>
        <CausalityGraph />
    </section>
</div>

<style>
    h1 {
        color: #2c3e50;
        margin-bottom: 2rem;
        text-align: center;
        font-size: 2rem;
        font-weight: 600;
    }

    h2 {
        color: #34495e;
        margin: 1.5rem 0;
        font-size: 1.5rem;
    }

    .visualizations {
        display: grid;
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
        padding: 1rem;
    }

    section {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
</style>