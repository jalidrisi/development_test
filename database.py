## This script is for reading data from CSV file and save it in sqlite database

import pandas as pd
import sqlite3 as sql
from string import Template
import json

#Connect and Create Database
conn = sql.connect('exports.db')
rows = []

#Read CSV file
df=pd.read_csv("exports.csv")

#Change the format of the table to the required one 
exports= df.set_index('country').stack().rename_axis(['country', 'month_year']).reset_index(name='value')

#Create table exports in the databse and insert data
exports.to_sql('exports', conn)
