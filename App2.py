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

#Create engine
engine = create_engine("sqlite:///../sqldata/clean_test.db",echo=True) #Set echo=True for debugging
inspector = inspect(engine)
Base = declarative_base()


#clean_no_index.csv ---> dataframe ---> to_dict(orient='records') --> sqlite
def populate(engine, table, csvfile):
    conn = engine.connect()
    df =pd.read_csv(csvfile,encoding='latin-1')
    data = df.to_dict(orient='records')
    conn.execute(table.insert(), data)

#Establish class base
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
    
#run populate function on sqlite db
populate(engine,Vegetarian.__table__,"../CleanData/clean_test.csv")


conn = engine.connect()
Base.metadata.create_all(engine)
session = Session(bind=engine)

print(inspector.get_table_names())
data = engine.execute("PRAGMA table_info([vegetarian]);")
for item in data:
    print(item)

Base.metadata.create_all(engine)
session.commit()

data = engine.execute("PRAGMA table_info([vegetarian]);")
for item in data:
    print(item)

Base.metadata.create_all(engine)
session.commit()

first_row = session.query(Vegetarian).all()
first_row.__dict__