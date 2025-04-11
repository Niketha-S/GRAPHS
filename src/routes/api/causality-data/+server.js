// @ts-check
import causalityData from '$lib/data/causality-data.json';

/**
 * @typedef {{
 *   "Stock Name": string;
 *   Lag: number;
 *   "P Value": number;
 * }} GrangerDataPoint
 * 
 * @typedef {{
 *   "Stock Name": string;
 *   "Max Correlation": number;
 *   Lag: number;
 * }} CorrelationDataPoint
 * 
 * @typedef {{
 *   sentimentToPrice: GrangerDataPoint[];
 *   priceToSentiment: GrangerDataPoint[];
 *   correlation: CorrelationDataPoint[];
 * }} CausalityData
 */

/**
 * Process Granger data for heatmap
 * @param {GrangerDataPoint[]} rawData 
 * @returns {Array<Record<string, string | number>>}
 */
function processGrangerData(rawData) {
  const stocks = [...new Set(rawData.map(d => d['Stock Name']))];
  const lags = [...new Set(rawData.map(d => d.Lag))].sort((a, b) => a - b);
  
  return stocks.map(stock => {
    /** @type {Record<string, string | number>} */
    const stockData = {
      'Stock Name': stock
    };
    
    lags.forEach(lag => {
      const record = rawData.find(d => d['Stock Name'] === stock && d.Lag === lag);
      stockData[lag] = record ? -Math.log10(record['P Value']) : 0;
    });
    
    return stockData;
  });
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export function GET({ url }) {
  try {
    const direction = url.searchParams.get('direction') || 'sentimentToPrice';
    
    let responseData;
    
    if (direction === 'correlation') {
      responseData = causalityData.correlation;
    } else {
      // @ts-ignore - We know this is safe
      const rawData = causalityData[direction];
      responseData = processGrangerData(rawData);
    }

    return new Response(JSON.stringify(responseData), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600'
      },
      status: 200
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 500
    });
  }
}