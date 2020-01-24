from flask import Flask, jsonify, render_template
from sqlalchemy import create_engine, func
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
import numpy as np
import pandas as pd


rds_connection_string = "DATABASE_URL"
engine = create_engine(f'postgresql://{rds_connection_string}')

conn = engine.connect()
# df = pd.read_sql('SELECT * FROM public."GBdata"', conn)
# df["publish_time"] = df["publish_time"].str.slice(stop=10)
# print(df["publish_time"][0])



app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index2.html')

@app.route("/bubble")
def bubble():
    return render_template('bubble2.html')

@app.route("/line")
def line():
    return render_template('line2.html')

@app.route("/bar")
def bar():
    return render_template('bar2.html')

@app.route("/doughnut")
def doughnut():
    return render_template('doughnut2.html')

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

@app.route("/GBlikes")
def GBlikes():
    conn = engine.connect()
    df = pd.read_sql('SELECT * FROM public."GBdata_sumCat" ORDER BY category_id ASC', conn)
    conn.close()
    return df.to_json(orient="index")

@app.route("/USlikes")
def USlikes():
    conn = engine.connect()
    df = pd.read_sql('SELECT * FROM public."USdata_sumCat" ORDER BY category_id ASC', conn)
    conn.close()
    return df.to_json(orient="index")

@app.route("/GBTopLikes")
def GBTopLikes():
    conn = engine.connect()
    df = pd.read_sql('SELECT * FROM public."GBdata_sumCat" ORDER BY likes DESC', conn)
    conn.close()
    return df.to_json(orient="index")

@app.route("/USTopLikes")
def USTopLikes():
    conn = engine.connect()
    df = pd.read_sql('SELECT * FROM public."USdata_sumCat" ORDER BY likes DESC', conn)
    conn.close()
    return df.to_json(orient="index")


if __name__ == "__main__":
    app.run(debug=True)