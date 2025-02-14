<div align="center">

[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![Tailwind-CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=fff)](https://www.mysql.com/)
[![OpenAI](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-web-services&logoColor=white)](https://openai.com/)

</div>

# log-A-plant
The perfect learning and journalling platform for gardeners! This project was built to push environmentally friendly and sustainable practices to novice and veteran gardeners. We accomplished such learning platform because of our openAI integration, giving gardeners tailored answers to any sustainability question, and unique plant-based recipes to the very plants they've harvested!

- <a target="_blank" href="https://devpost.com/software/log-a-plant">SparkHacks Devpost</a>
- <a target="_blank" href="https://youtu.be/PCS7RNPUsiU?si=bgCWPWpDD9DA39-Z">Demo video</a>
- <a target="_blank" href="https://docs.google.com/presentation/d/1y6puVJ0gbNaMPv7t1iGAgy-hxGHG56sTiLH2ScbE0nY/edit?usp=sharing">Demo Presentation</a>

1. Clone the repository:
    ```sh
    git clone https://github.com/westconn24/garden-app
    cd garden-app
    ```
2. Ensure you have Python installed
   - While this step is dependent on your OS, you can check if it exists by typing: ```python3 --version``` or ```python --version```
   - If Python is not installed, you can view the installation process at <a>https://www.python.org/downloads/</a>

3. Create a virtual environment and activate it:
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

    While this step is not required, it is recomended for less dependency conflicts.
    
4. Install the required npm packages:
    ```sh
    npm install
    ```
5. Install the required pip packages:
    ```sh
    cd backend
    pip install -r requirements.txt
    ```
6. Setup your database environment
   a. While it may not be required to run it on this version, this repo is only verified to work on the MySQL Community 8.0.40 version
   b. Upload the sql dump 'dump.sql' from the repo onto your database
   c. Ensure the standard 3306 port is properly configured and open
7. Configure your .env
   a. Copy the .base-env into .env, and populate all the fields with the requested data
   ```sh
   cp .base-env .env
   ```

## Running the Application
To run the back-end application, execute the `app.py` file within the backend folder. This will start a local flask server where you can interact with the MySQL and OpenAI integration.
```sh
cd backend
python app.py
```
After doing so, you'll want to run the front-end application into another shell instance, by running the `npm start` script
```sh
npm start
```
So long as the .env is properly configured, the front-end should be interactable with your back-end application.

## Endpoints

- `/` - Main menu
