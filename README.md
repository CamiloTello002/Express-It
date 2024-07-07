<p align="center">
  <img width="479" alt="express_it" src="https://github.com/CamiloTello002/Express-It/assets/68115874/36b101f7-824e-4272-86fe-b27263db1f14" align="center">  
</p>

<h3 align="center">Are you an individual looking for a site for expressing your ideas and create a like-minded community? This is for you!</h3>
<p align="center">
  <img width="454" alt="readme_hero" src="https://github.com/CamiloTello002/Express-It/assets/68115874/c3271e8d-e794-4da9-8861-15553febd986">  
</p>


<p><em>Express It</em> is a web application built on top of the MERN stack. It has features such as creating your own account and adding images to your account.</p>

<h2>Technologies used</h2>
<ul>
  <li>React.js</li>
  <li>MongoDB</li>
  <li>Express.js</li>
  <li>Node.js</li>
</ul>
The tech stack used for this project was the MERN stack because it provides the necessary tools for building an application like this.Besides, MongoDB doesn't require strict schemas for users and posts models in the database, which makes it quite flexible.
The components philosophy of React.js made it simpler for building the website structure; besides, I was able to modularize the frontend part, which made a good separation of concerns.

<h2>Quickly try this project with Docker Compose</h2>
<p>Before running this project on your local machine, make sure you have the following programs installed :</p>
<ul>
  <li><a href="https://docs.docker.com/desktop/install/windows-install/" target="_blank">Docker</a></li>
  <li><a href="https://git-scm.com/download/win" target="_blank">Git</a></li>
</ul>
<p>After installing them, open a terminal on a folder you want the project to be downloaded on and issue the following command for downloading the project from its repository:</p>

<pre><code>git clone https://github.com/CamiloTello002/Express-It</code></pre>

<p>After downloading the project, change your working directory to the project directory like this:</p>

<pre><code>cd Express-It</code></pre>

<p>Since your backend needs a .env file for reading their necessary environment variables, we don't have to create it from scratch since you already have a template. Run this command that will take an existing template and create the .env file for your backend service.</p>

<pre><code>cp ./api/.env.example ./api/.env</code></pre>

Once your backend has an .env file, we can proceed to install the database, backend, and frontend services with Docker Compose. Run this command:
<pre><code>docker-compose up -d</code></pre>

<p>Keep in mind that this process can take several minutes since the images and the necessary dependencies that are downloaded can be a bit bulky.</p>

<p>After this process is done, you can check the running application on <code>https://localhost:5000/</code></p>

## API documentation
<p>You can also check the API documentation on <code>https://localhost:4000/api/v1/docs</code></p>
