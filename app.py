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
# Flask imports
from flask import Flask, jsonify, render_template

# Flask set up
app = Flask(__name__)

# Database setup and connection
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, desc, distinct

#Create engine
engine = create_engine("sqlite:///data.db",echo=True) #Set echo=True for debugging
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
	    return (
        f"Available Routes:<br/>"
        f"/map<br/>"
        f"/bubble_chart<br/>"
        f"/by_state<br/>"
        f"/by_type<br/>"
        f"/by_rating<br/>"
    )
#    return render_template("index.html")

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
	results = session.query(Vegetarian).all()
	states = []
	for restaurant in results:
		state_dict = {}
		state_dict["restaurant_name"] = restaurant.restaurant_name
		state_dict["address"] = restaurant.address
		state_dict["city"] = restaurant.city
		state_dict["state"] = restaurant.state
		state_dict["zip_code"] = restaurant.zip_code
		state_dict["phone"] = restaurant.phone
		state_dict["cuisine_type"] = restaurant.cuisine_type
		state_dict["rating"] = restaurant.rating
		state_dict["price"] = restaurant.price
		state_dict["latitude"] = restaurant.latitude
		state_dict["longitude"] = restaurant.longitude
		states.append(state_dict)
		st = df.states.groupby(by='state')
		print(st)
	return jsonify(st)




# @app.route("/by_type")

# @app.route("/by_rating")

if __name__ == '__main__':
    app.run(debug=True)