#This script is for retrieving data from databse and convert them to javascript file 

import json
import collections
import sqlite3 as sql
import psycopg2

#Connect to Database
conn = sql.connect('exports.db')
cursor = conn.cursor()
cursor.execute("SELECT * FROM exports")
rows = cursor.fetchall()
rowarray_list = []
for row in rows:
    t = (row[0], row[1], row[2], row[3])
    rowarray_list.append(t)
j = json.dumps(rowarray_list)
with open("exports.js", "w") as f:
    f.write(j)
    
# Convert query to objects of key-value pairs
objects_list = []
for row in rows:
    d = collections.OrderedDict()
    d["index"] = row[0]
    d["country"] = row[1]
    d["month-year"] = row[2]
    d["value"] = row[3]
    objects_list.append(d)
j = json.dumps(objects_list)
with open("exports.js", "w") as f:
    f.write(j)
conn.close()