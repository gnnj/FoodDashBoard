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
 
@app.route('/')
def index():
    return render_template('index.html')

@app.route("/by_state")
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
	return render_template('pie_chart.html', values=values, labels=labels)
 
if __name__ == '__main__':
    app.run(debug=True)