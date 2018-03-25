 #Implementation and testing of JSON from list/dict object 
 #Precursor to flask routes

#Imports
import pandas as pd
from datetime import datetime
import csv

#Sqlalchemy imports
from sqlalchemy import Column, Float, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine,inspect,func
# Flask imports
from flask import Flask, jsonify, render_template

#Flask set up
app = Flask(__name__)

#Database setup connection 
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, desc 

 #Create engine
engine = create_engine("sqlite:///../sqldata/clean_test.db",echo=False) #Set echo=True for debugging
inspector = inspect(engine)
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

# Create Session 
session = Session(engine)


# Create Routes
@app.route("/")
def home():
    return render_template("index.html")

