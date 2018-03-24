# -*- coding: utf-8 -*-

import pandas as pd

from flask import Flask
from flask import render_template
import json

# Database Set up
engine = create_engine("sqlite:///TestDataSet.sqlite")

conn = engine.connect()
data = pd.read_sql("SELECT * FROM TestDataSet", conn)


Base = automap_base()
Base.prepare(engine, reflect = True)

#save tables as variables
data = Base.classes.TestDataSet

#Create a session
session = Session(engine)

# restaurant_list = []
#     #query
#     restaurant = session.query(restaurant.name, restaurant.address, restaurant.city, restaurant.state, restaurant.longitude, restaurant.latitude).all()
 
app = Flask(__name__)


#home route
@app.route("/")
def home():
    return ("Best Restaurants in USA<br/>"
    "/api/v1.0/piechart<br/>"
    "/api/v1.0/dygraph<br/>"
    "/api/v1.0/burblecahrt<br/>"
    "/api/v1.0/mybox<br/>"
    "/api/v1.0/rawData<br>"
    "/api/vi.0/about")


@app.route("/")
def index():
    return render_template("index.html")

# piechart route using function
@app.route("/api/v1.0/piechart")
def piechart():
    #call prcp_or temps function with proper datapoint
    results = piechart(sqldata.TestDataSet)
    return jsonify(results)


    stations_list = []
    #query
    stations = session.query(Stations.station, Stations.name, Stations.latitude, Stations.longitude, Stations.elevation).all()
 

@app.route("/data")
def get_data():
    # Data preparation
    .
    .
    .
    return df_clean.to_json(orient='records')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)