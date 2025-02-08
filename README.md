# log-A-plant

1. Clone the repository:
    ```sh
    git clone https://github.com/westconn24/garden-app
    cd garden-app
    ```
2. Ensure you have Python installed
   - While this step is dependent on your OS, you can check if it exists by typing: ```python3 --version``` or ```python --version```
   - If Python is not installed, you can view the installation at <a>https://www.python.org/downloads/</a>

3. Create a virtual environment and activate it:
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

    While this step is not required, it is recomended for lower dependency conflicts.
    
4. Install the required packages:
    ```sh
    pip install -r requirements.txt
    ```

## Running the Application
After ensuring you have cloned the repo and have python installed, cd into the backend folder and download the required packages.

To run the Flask application, make sure you are still within the backend folder and execute the `app.py` script. This will start a local flask server where you can interact with the RDS database and AI integration.

```sh
python app.py
```

After doing so, you can open another terminal. If you are still within the backend folder run cd ..

Make sure if you have not done so to run the npm install command

```sh
npm install
```

After doing so you may run npm start to start the local web application

```sh
npm start
```

You can find the endpoints at [Endpoints](#endpoints)

## Endpoints

- `/` - Main menu