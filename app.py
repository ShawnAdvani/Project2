from flask import Flask, jsonify, render_template
from sqlalchemy import create_engine, func
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
import numpy as np
import pandas as pd


rds_connection_string = "postgres:postgres@localhost:5432/YouTube"
engine = create_engine(f'postgresql://{rds_connection_string}')

# conn = engine.connect()



app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/GB")
def GB():
    conn = engine.connect()
    df = pd.read_sql('SELECT * FROM public."GBdata"', conn)
    conn.close()
    print(df.head)
    return df.to_json(orient="index")

@app.route("/US")
def US():
    conn = engine.connect()
    df = pd.read_sql('SELECT * FROM public."USdata"', conn)
    conn.close()
    print(df.head)
    return df.to_json(orient="index")

if __name__ == "__main__":
    app.run(debug=True)