
export type TMovie = {
  num_votes: number;
  runtime_minutes:  number;
  genres: string[];
  year: Date;
  average_rating: number;
  tconst: string;
  title_type: string;
  primary_title: string;
  original_title: string;
}

export type T3DModel = {
    path: string;
    speed: number;
    duration: number;
    x: number;
    y: number;
    z: number;
    scale: number;
};
export interface CorrelationData {
  stock_name: string;
  max_correlation: number;
  lag: number;
}
