#Imports
import pandas as pd
from datetime import datetime
import csv
import numpy as np

#Sqlalchemy imports
from sqlalchemy import Column, Float, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine,inspect,func
from sqlalchemy import desc,asc
# Flask imports
from flask import Flask, jsonify, render_template

import json


# Flask set up
app = Flask(__name__)

# Database setup and connection
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, desc, distinct

#Create engine
engine = create_engine("sqlite:///sqldata/clean_complete_dataset.db",echo=False) #Set echo=True for debugging
#inspector = inspect(engine)
Base = declarative_base()
conn = engine.connect()
session = Session(bind=engine)

#Establish class base/Class reference
class Vegetarian(Base):
    __tablename__ = "vegetarian"
    id = Column(Integer, primary_key=True)
    restaurant_name = Column(String)
    address = Column(String)
    city = Column(String)
    state = Column(String)
    zip_code = Column(Integer)
    phone = Column(Integer)
    cuisine_type = Column(String)
    rating = Column(String)
    price = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)

@app.route("/")
def home():
	return render_template('index_placeholder.html')

@app.route("/dygraph")
def dygraph():
	    return render_template('dygraph.html')

@app.route("/piechart1")
def piechart1():
	df = pd.read_csv('scripts/piechart_placeholderdata.csv')
	data = df.to_dict(orient='records')
	print(data)
	data= json.dumps(data, indent=2)
	data = {'data': data}
	#jsonify(data)
	return render_template('piechart1.html', data =data)
	#return jsonify(data)

#by_state_test() route working:
#returns price and rating for selected state
@app.route("/by_state/<state>")
def by_state_test(state):

	state = state.strip()
	results = session.query(Vegetarian.state,Vegetarian.price,Vegetarian.rating).filter(Vegetarian.state == state).all()	
	return(jsonify(results))

#/states route for dropdown selector
@app.route("/states")
def states():
	results = session.query(Vegetarian.state).order_by(asc(Vegetarian.state)).distinct().all()

	return(jsonify(list(results)))



   
#Returns complete dataset as a JSON response
@app.route("/map")
def map_data():
	results = session.query(Vegetarian).all()
	all_restaurants = []
	for restaurant in results:
		all_restaurants_dict = {}
		all_restaurants_dict["restaurant_name"] = restaurant.restaurant_name
		all_restaurants_dict["address"] = restaurant.address
		all_restaurants_dict["city"] = restaurant.city
		all_restaurants_dict["state"] = restaurant.state
		all_restaurants_dict["zip_code"] = restaurant.zip_code
		all_restaurants_dict["phone"] = restaurant.phone
		all_restaurants_dict["cuisine_type"] = restaurant.cuisine_type
		all_restaurants_dict["rating"] = restaurant.rating
		all_restaurants_dict["price"] = restaurant.price
		all_restaurants_dict["latitude"] = restaurant.latitude
		all_restaurants_dict["longitude"] = restaurant.longitude
		all_restaurants.append(all_restaurants_dict)
	return jsonify(all_restaurants)

# @app.route("/bubble_chart")

@app.route("/by_state")
def by_state():
	results = session.query(Vegetarian.state, func.count(Vegetarian.state)).group_by(Vegetarian.state).all()
	state_data = results
	return jsonify(state_data)

@app.route("/by_type")
def by_type():
	results = session.query(Vegetarian.cuisine_type, func.count(Vegetarian.cuisine_type)).group_by(Vegetarian.cuisine_type).all()
	type_data = results
	return jsonify(type_data)

@app.route("/by_rating")
def by_rating():
	results = session.query(Vegetarian.rating, func.count(Vegetarian.rating)).group_by(Vegetarian.rating).all()
	rating_data = results
	return jsonify(rating_data)

if __name__ == '__main__':
    app.run(debug=True)