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
    return df.to_json(orient="index")

@app.route("/US")
def US():
    conn = engine.connect()
    df = pd.read_sql('SELECT * FROM public."USdata"', conn)
    conn.close()
    return df.to_json(orient="index")

@app.route("/GBcat")
def GBcat():
    conn = engine.connect()
    df = pd.read_sql('SELECT * FROM public."GBdata"', conn)
    conn.close()
    df2 = df.groupby(["category"]).views.mean()
    print(df2.head)
    return df2.to_json(orient="index")

@app.route("/UScat")
def UScat():
    conn = engine.connect()
    df = pd.read_sql('SELECT * FROM public."USdata"', conn)
    conn.close()
    df2 = df.groupby(["category"]).views.mean()
    del df2['Nonprofits & Activism']
    print(df2.head)
    return df2.to_json(orient="index")

if __name__ == "__main__":
    app.run(debug=True)