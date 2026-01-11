from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS  #allows backedn API to be accessed at frontend
import os
app = Flask(__name__)
CORS(app)  #allows all origin 

# databse connection
def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("MYSQLHOST"),
        user=os.getenv("MYSQLUSER"),
        password=os.getenv("MYSQLPASSWORD"),
        database=os.getenv("MYSQLDATABASE"),
        port=int(os.getenv("MYSQLPORT"))
    )

# health route
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200


# get tables from database
@app.route('/getTables', methods=['GET'])
def get_tables():
    db = get_db_connection()    #creating connection to database
    cursor = db.cursor()
    cursor.execute("SHOW TABLES FROM myinfo;")
    tables = cursor.fetchall()
    cursor.close()
    db.close()

    table_names = [table[0] for table in tables]
    return jsonify({"tables": table_names}), 200


# profile route
@app.route("/profile", methods=["GET"])
def get_profile():
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM myinfo.profile LIMIT 1;")
    profile = cursor.fetchone()
    cursor.close()
    db.close()
    return jsonify(profile), 200


# skills route
@app.route("/skills/top", methods=["GET"])
def get_skills():
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("SELECT skill FROM myinfo.skills;")
    skills = [row[0] for row in cursor.fetchall()]
    cursor.close()
    db.close()
    return jsonify(skills), 200


# projects route
@app.route("/projects", methods=["GET"])
def get_projects():
    skill = request.args.get("skill")

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    if skill:
        query = """
        SELECT DISTINCT p.*
        FROM myinfo.projects p
        JOIN myinfo.skills s ON p.profile_id = s.profile_id
        WHERE s.skill = %s;
        """
        cursor.execute(query, (skill,))
    else:
        cursor.execute("SELECT * FROM myinfo.projects;")

    projects = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(projects), 200


# route education
@app.route("/education", methods=["GET"])
def get_education():
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("""
        SELECT * FROM myinfo.education
        ORDER BY start_year DESC;
    """)
    education = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(education), 200


# certifications route 
@app.route("/certifications", methods=["GET"])
def get_certifications():
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("""
        SELECT * FROM myinfo.certifications
        ORDER BY year DESC;
    """)
    certifications = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(certifications), 200


# work route
@app.route("/work", methods=["GET"])
def get_work():
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM myinfo.work;")
    work = cursor.fetchall()
    cursor.close()
    db.close()
    return jsonify(work), 200

# get links
@app.route("/links", methods=["GET"])
def get_links():
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    query = """
        SELECT github, linkedin, portfolio
        FROM myinfo.links
        WHERE profile_id = 1
        LIMIT 1
    """
    cursor.execute(query)
    result = cursor.fetchone()

    cursor.close()

    if not result:
        return jsonify({
            "github": "",
            "linkedin": "",
            "portfolio": ""
        }), 200

    return jsonify(result), 200

#root route
@app.route("/")
def home():
    return jsonify({
        "message": "My Portfolio API is running",
        "endpoints": [
            "/profile",
            "/skills/top",
            "/projects",
            "/work",
            "/education",
            "/certifications",
            "/health"
        ]
    })