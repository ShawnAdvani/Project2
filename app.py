from flask import Flask, jsonify, render_template
from sqlalchemy import create_engine, func
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
import numpy as np
import pandas as pd


rds_connection_string = "postgres:postgres@localhost:5432/YouTube"
engine = create_engine(f'postgresql://{rds_connection_string}')

conn = engine.connect()
# df = pd.read_sql('SELECT * FROM public."GBdata"', conn)
# df["publish_time"] = df["publish_time"].str.slice(stop=10)
# print(df["publish_time"][0])



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

@app.route("/GBtime")
def GBtime():
    conn = engine.connect()
    sqlquery = """
                SELECT
                LEFT(publish_time, 4) as Year,
                AVG(views) as Tot_Views
            FROM 
                public."GBdata"
            Group by 
                LEFT(publish_time, 4)
            Order by
                Year ASC
             """
    df = pd.read_sql(sqlquery, conn)
    conn.close()
    return df.to_json(orient="index")

@app.route("/UStime")
def UStime():
    conn = engine.connect()
    sqlquery = """
                SELECT
                LEFT(publish_time, 4) as Year,
                AVG(views) as Tot_Views
            FROM 
                public."USdata"
            Group by 
                LEFT(publish_time, 4)
            Order by
                Year ASC
             """
    df = pd.read_sql(sqlquery, conn)
    conn.close()
    return df.to_json(orient="index")

if __name__ == "__main__":
    app.run(debug=True)