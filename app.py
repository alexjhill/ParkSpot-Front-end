from flask import Flask, render_template, request
import pymysql.cursors, json, ast

app = Flask(__name__)




def dbExecute(**kwargs):
    conn = pymysql.connect (
        host='localhost',
        user='root',
        password='Password',
        db='Parkspot',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )
    cur = conn.cursor()
    if 'lowerLat' in kwargs:
        cur.execute(kwargs.get('query'), (kwargs.get('lowerLat'), kwargs.get('upperLat'), kwargs.get('lowerLng'), kwargs.get('upperLng'), ))
    else:
        cur.execute(kwargs.get('query'))
    result = cur.fetchall()
    cur.close()
    conn.close()
    return result


title = "Parkspot 3.0"

@app.route("/", methods = ['GET', 'POST'])
def homeRoute():
    if request.method == "POST":

        location = request.form.to_dict()

        # Ranges for generating parking spots
        latRange = 0.003
        longRange = latRange * 3

        lowerLat = float(location['lat']) - latRange
        upperLat = float(location['lat']) + latRange
        lowerLng = float(location['lng']) - longRange
        upperLng = float(location['lng']) + longRange

        # Spot query
        spots = dbExecute(query = "SELECT * FROM Parkingspots WHERE coords_lat > %s AND coords_lat < %s AND coords_long > %s AND coords_long < %s", lowerLat = lowerLat, upperLat = upperLat, lowerLng = lowerLng, upperLng = upperLng)

        # Convert result to JSON
        spots = json.dumps(spots)

        # Return result
        return spots


    else:
        return render_template('home.html', title=title)


if __name__ == '__main__':
    app.run(debug=True)
