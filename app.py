from flask import Flask, render_template, request
import pymysql.cursors, json

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
        userPos = request.form.to_dict()

        range = 0.03

        lowerLat = float(userPos['lat']) - range
        upperLat = float(userPos['lat']) + range
        lowerLng = float(userPos['lng']) - range
        upperLng = float(userPos['lng']) + range

        spots = dbExecute(query = "SELECT * FROM Parkingspots WHERE coords_lat > %s AND coords_lat < %s AND coords_long > %s AND coords_long < %s", lowerLat = lowerLat, upperLat = upperLat, lowerLng = lowerLng, upperLng = upperLng)

        # spots = dbExecute(query = "SELECT * FROM Parkingspots")

        spots = json.dumps(spots)

        return spots


    else:
        return render_template('home.html', title=title)


if __name__ == '__main__':
    app.run(debug=True)
