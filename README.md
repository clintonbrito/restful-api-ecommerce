# RESTful API E-commmerce Project

This is a MVP e-commerce-like API developed from scratch. It allows users to manage users, clients, product and sales. The project follows the MVC architecture and includes user authentication with JWT.

<br>

## 🧪 Technologies

This project was developed using:

  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
  ![AdonisJS](https://img.shields.io/badge/Adonis%20JS-5A45FF.svg?style=for-the-badge&logo=adonisjs&logoColor=white)
  ![JWT](https://img.shields.io/badge/JWT-000000.svg?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
  ![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
  ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
  ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

<br>

## 🚀 Getting started locally

<p style>Clone this repository to your local machine and access the cloned directory:</p>

<pre><code>git clone git@github.com:clintonbrito/restful-api-ecommerce.git
cd restful-api-ecommerce.git</code></pre>

<p>Run this command to create all the project's Docker containers and install the dependencies:</p>

<pre><code>docker compose up -d --build</code></pre>

<p>If you need to stop and remove the project's Docker containers, you can use the following command:</p>

<pre><code>docker compose down</code></pre>

Check the docker logs using the command `docker logs -f app` which address is running the application and open your browser or any prefered API client in order to test the endpoints through the address below, for example:

<pre><code>http://localhost:3333/</code></pre>

<br>

## 📖 API Documentation

Explore the API documentation to understand the available endpoints, request parameters, and responses. The documentation is built using XXXX, which provides an interactive and user-friendly interface.

### Accessing API Documentation

1. **Run the Application:**
   Make sure the application is running locally. Follow the [Getting Started](#-getting-started-locally) section for instructions on starting the application.

2. **Open XXXX UI:**
   Once the application is running, you can access the XXXX UI by navigating to the following URL in your web browser:

<pre><code>http://localhost:3333/api/v1/ui</code></pre>

3. **Explore Endpoints:**
   In the XXXX UI, you'll find a list of available endpoints along with details about request parameters, expected responses, and sample requests. Use this interface to understand how to interact with the API.

Feel free to explore and test the API directly from the XXXX UI. If you encounter any issues or have questions, refer to the [Issues](https://github.com/clintonbrito/restful-api-ecommerce/issues) section for support.

<br>

## 🎨 Development Patterns

### Commit Patterns

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)
<a href="https://gitmoji.dev">
  <img
    src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square"
    alt="Gitmoji"
  />
</a>

This project adopts [Gitmoji](https://github.com/carloscuesta/gitmoji) and the commit convention known as [Conventional Commits](https://www.conventionalcommits.org/). This means that we follow a standardized format for our commit messages, making it easier to generate changelogs and adopt semantic versioning.

Example commit messages format:

<pre><code>feat: add login functionality
fix: resolve issue with user registration
wip: connecting back-end to front-end</code></pre>

### Branch Patterns

The branches in this project follow a specific pattern to facilitate organization and understanding of ongoing development. Some of the common prefixes used include `feature/`, `bugfix/`, `docs/`:

Example branch names:

<pre><code>feature/docker-setup
bugfix/eslint-errors
docs/update-readme</code></pre>

<br>

## 📝 License
This project is licensed under the MIT License. See the <a target="_blank" rel="noopener" href="https://github.com/clintonbrito/restful-api-ecommerce/blob/main/LICENSE">LICENSE</a> file for details.
