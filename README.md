<h1>PlantDX</h1>

<div align="left">
  <img src="https://img.shields.io/badge/version-1.0.0-red.svg">
  <img src="https://img.shields.io/github/stars/yushin-ito/plantDX?color=yellow">
  <img src="https://img.shields.io/github/commit-activity/t/yushin-ito/plantDX">
  <img src="https://img.shields.io/badge/license-MIT-green">
</div>

<br>

<h2>📝 Overview</h2>
<P>In Toba, where tourism is thriving, there are many hotels and restaurants, and a lot of vegetable oil is disposed. The city also has a thriving aqua culture industry, which discards many oyster shells as well. 
Therefore, a biodiesel fuel (BDF) production plant was built to recycle vegetable oil and oyster shells as BDF. 
However, there was a technical problem with the process of stirring the waste oil and methanol. It was impossible to visually see if the strring was going well. If the stirring was not done properly, the subsequent process would be affected.
So we began research to develop an Image Analysis AI that classifies the achievement rate of agitation into five levels based on post agitation images and an IoT system to make the plant more manageable.</p>

<br>

<h2>🔧 Usage</h2>
<a href="https://open.vscode.dev/yushin-ito/plantDX">
  <img src="https://img.shields.io/static/v1?logo=visualstudiocode&label=&message=Open%20in%20Visual%20Studio%20Code&labelColor=2c2c32&color=007acc&logoColor=007acc">
</a>
<br>
<br>
<ol>
  <li>Clone the repository</li>
  <p><pre><code>git clone https://github.com/yushin-ito/plantDX.git</code></pre></p>
  <li>Go to the app directory</li>
  <p><pre><code>cd app</code></pre></p>
  <li>Install all the necessary dependencies</li>
  <p><pre><code>npm install</code></pre></p>
  <li>Start the dev server</li>
  <p><pre><code>npm run dev</code></pre></p>
</ol>

<br>

<h2>✅ Todo</h2>
<ol>
  <li>Capture images by TimerCameraF(ESP32) and send them to a web server</li>
  <li>Set up a web server with M5Stamp(ESP32) to collect and send images and sensor data</li>
  <li>Team development of Web Applications using Supabase and Next.js</li>
  <li>Development of AI (CNN) to classify the achievement rate of agitation using Tensorflow</li>
</ol>

<br>

<h2>🌐 System</h2>
<div align="center">
  <picture>
    <img src="https://github.com/yushin-ito/PlantDX/assets/75526539/fbb01ea2-44c3-4aa5-aa46-e998afadcfc4" width="80%">
  </picture>
</div>

<h2>🚀 Features</h2>
<ul>
  <li>
    <h3>Web Application</h3>
    <p>Developed UI to display and remotely control the status of BDF production plant.</p>
  </li>
  <br>
  <picture>
      <img src="https://github.com/yushin-ito/PlantDX/assets/75526539/a9508100-2d48-4259-8f45-5d7ba24345b3">
  </picture>
  <br>
  <br>
  <li>
    <h3>IoT Device</h3>
    <p>Two IoT devices will be used to monitor and remotely operate the BDF production plant.</p>
  </li>
  <br>
  <picture>
      <img src="https://github.com/user-attachments/assets/f8f01847-3748-47e5-98e7-20790cccbb36">
  </picture>
  <br>
  <br>
  <li>
    <h3>Image Analysis AI</h3>
    <p>The image of waste oil and methanol after stirring is used to classify the achievement rate of the stirring into 5 levels.</p>
  </li>
  <br>
  <picture>
      <img src="https://github.com/yushin-ito/PlantDX/assets/75526539/b054a5b8-d793-4f71-9f47-2f45e1fe5fdc">
  </picture>
</ul>

<br>

<h2>🛠️ Technology</h2>
<ul>
  <li>Next.js</li>
  <li>Next UI</li>
  <li>React-Hook-Form</li>
  <li>Supabase</li>
  <li>ESLint</li>
</ul>

<h2>👀 Author</h2>
<ul>
  <li>Yushin Ito</li>
  <li>Valtteri</li>
</ul>

<br>

<h2>📜 License</h2>
<a href="https://github.com/yushin-ito/plantDX/blob/main/LICENSE">MIT License</a>
