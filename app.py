from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS  #allows backedn API to be accessed at frontend
import os
app = Flask(__name__)
CORS(app)  #allows all origin 

def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
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
    cursor.execute("SHOW TABLES;")
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
    cursor.execute("SELECT * FROM profile LIMIT 1;")
    profile = cursor.fetchone()
    cursor.close()
    db.close()
    return jsonify(profile), 200


# skills route
@app.route("/skills/top", methods=["GET"])
def get_skills():
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("SELECT skill FROM skills;")
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
        FROM projects p
        JOIN skills s ON p.profile_id = s.profile_id
        WHERE s.skill = %s;
        """
        cursor.execute(query, (skill,))
    else:
        cursor.execute("SELECT * FROM projects;")

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
        SELECT * FROM education
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
        SELECT * FROM certifications
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
    cursor.execute("SELECT * FROM work;")
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
        FROM links
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

# main entry point 
if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
