from flask import Flask, render_template
app = Flask(__name__)

title = "Parkspot 3.0"

@app.route("/")
def hello():
    return render_template('home.html', title=title)


if __name__ == '__main__':
    app.run(debug=True)
