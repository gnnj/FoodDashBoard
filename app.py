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
from flask import Flask, jsonify, render_template, Markup

import json


# Flask set up
app = Flask(__name__)


#Create engine
engine = create_engine("sqlite:///clean_complete_dataset.db",echo=False) #Set echo=True for debugging
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
def state_chart():
	results = session.query(Vegetarian).all()
	state = []
	for restaurant in results:
	    state_dict = {}
	    #state_dict["restaurant_name"] = restaurant.restaurant_name
	    state_dict["state"] = restaurant.state
	    state.append(state_dict)
	all_restaurants_df = pd.DataFrame(state)
	count = all_restaurants_df['state'].value_counts().tolist()
	count_index = all_restaurants_df['state'].value_counts().index.tolist()
	labels = count_index
	values = count
	return render_template('state.html', values=values, labels=labels)

@app.route("/by_type")
def type_chart():
	results = session.query(Vegetarian).all()
	food_type = []
	for restaurant in results:
		food_type_dict = {}
		food_type_dict["cuisine_type"] = restaurant.cuisine_type
		food_type.append(food_type_dict)
	food_type_df = pd.DataFrame(food_type)
	food_type_df
	count = food_type_df['cuisine_type'].value_counts().tolist()
	count_index = food_type_df['cuisine_type'].value_counts().index.tolist()
	count_index
	labels = count_index
	values = count
	return render_template('type.html', values=values, labels=labels)

@app.route("/pie")
def pie_chart():
	results = session.query(Vegetarian).all()
	state = []
	for restaurant in results:
	    state_dict = {}
	    #state_dict["restaurant_name"] = restaurant.restaurant_name
	    state_dict["state"] = restaurant.state
	    state.append(state_dict)
	all_restaurants_df = pd.DataFrame(state)
	count = all_restaurants_df['state'].value_counts().tolist()
	count_index = all_restaurants_df['state'].value_counts().index.tolist()
	labels = count_index
	values = count
	colors = ["#CCCCCC", "#CCCCFF", "#FFCCFF", "#FFCCCC", "#FFCC99", "#FFCC66", "#FFCC33", "#FFCC00", "#CC9900", "#CC9933", "#CC9966", "#CC9999", "#CC99CC", "#CC99FF", "#FF99FF", "#FF99CC", "#FF9999", "#FF9966", "#FF9933", "#FF9900", "#CC6600", "#CC6633", "#CC6666", "#CC6699", "#CC66CC", "#CC66FF", "#FF66FF", "#FF66CC", "#FF6699", "#FF6666", "#FF6633", "#FF6600", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#FF33FF", "#FF33CC", "#FF3399", "#FF3366", "#FF3333", "#FF3300", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF"]
	return render_template('pie_chart.html', set=zip(values, labels, colors))
 
if __name__ == '__main__':
    app.run(debug=True)