// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
declare module '$lib/data/causality-data.json' {
	export type GrangerDataPoint = {
	  'Stock Name': string;
	  Lag: number;
	  'P Value': number;
	};
  
	export type CorrelationDataPoint = {
	  'Stock Name': string;
	  'Max Correlation': number;
	  Lag: number;
	};
  
	export type CausalityData = {
	  sentimentToPrice: GrangerDataPoint[];
	  priceToSentiment: GrangerDataPoint[];
	  correlation: CorrelationDataPoint[];
	};
  
	const value: CausalityData;
	export default value;
  }
