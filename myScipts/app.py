
# coding: utf-8

# In[18]:


#Database setup and connection 
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine,desc
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()


# In[19]:


# PyMySQL
import pymysql
pymysql.install_as_MySQLdb()


# In[20]:


# Use a Session 
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

#engine = create_engine("sqlite:///sqldata/Restaurants.db")
engine = create_engine("sqlite:///TestDataSet.db")
Base.metadata.create_all(engine)

#Creat Session
session = Session(bind=engine)


# In[21]:


#Flask Dependencies
from flask import Flask,jsonify,render_template


# In[22]:


#Flask Set up 
app = Flask(__name__)


# In[24]:


Base = automap_base()
Base.prepare(engine, reflect=True)


# In[16]:


#create routes
@app.route("/")
def home():
    return render_template(index1.html)


# In[26]:


@app.route("/names")
def names():
    sample_names = Samples.__table__.columns
    sample_names_ls = [name.key for name in sample_names]
    return jsonify(sample_names_ls)


# In[27]:


@app.route("/state")
def state():
    sample_state = Samples._table_.columns
    sample_state_ls = [state.key for state in sample_state]
    return jsonify(sample_state_ls)


# In[28]:


if __name__ == '__main__':
    app.run(debug=True)

