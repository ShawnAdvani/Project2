from flask import Flask, jsonify, render_template
from sqlalchemy import create_engine, func
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
import numpy as np
import pandas as pd


rds_connection_string = "postgres:postgres@localhost:5432/YouTube"
engine = create_engine(f'postgresql://{rds_connection_string}')

# conn = engine.connect()

conn = engine.connect()
df = pd.read_sql('SELECT * FROM public."GBdata" LIMIT 100', conn)
print(df.head())
# base = automap_base()
# base.prepare(engine, reflect=True)
# dataGB = base.classes.GBdata
# dataUS = base.classes.USdata

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/GB")
def GB():
    df = pd.read_sql('SELECT * FROM public."GBdata"', conn)
    conn.close()
    return df.to_json(orient="index")

@app.route("/US")
def US():
    df = pd.read_sql('SELECT * FROM public."USdata"', conn)
    conn.close()
    return df.to_json(orient="index")

if __name__ == "__main__":
    app.run(debug=True)