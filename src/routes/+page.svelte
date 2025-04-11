<script>
  import { base } from "$app/paths";
</script>

<!-- <h1>Sivapriya Gopi's Portfolio</h1>

<section>
  <h2>Assignments</h2>
  <div class="links">
      <a href="{base}/A0">Assignment 0</a>
      <a href="{base}/A1">Assignment 1</a>
      <a href="{base}/A2">Assignment 2</a>
      <a href="{base}/A3">Assignment 3</a>
      <a href="{base}/A4">Assignment 4</a>
  </div>
</section> -->

<section>
  <h2>Project</h2>
  <div class="links">
      <a href="{base}/projects/stock-sentiment">Stock Sentiment Analysis</a>
  </div>
</section>

<style>
  h1 {
      color: #2c3e50;
      margin-bottom: 2rem;
  }
  
  section {
      margin-bottom: 2rem;
  }
  
  h2 {
      color: #34495e;
      margin-bottom: 1rem;
  }
  
  .links {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
  }
  
  a {
      color: #2980b9;
      text-decoration: none;
      font-size: 1.1rem;
      transition: color 0.2s;
  }
  
  a:hover {
      color: #3498db;
      text-decoration: underline;
  }
</style>