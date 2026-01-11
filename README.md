📌 Portfolio Backend API
A RESTful Portfolio API built with Python + Flask + MySQL, deployed on Render, using Railway MySQL as the production database.
This backend serves portfolio data for a frontend/UI and is fully production-ready.

🚀 Live URLs
Portfolio UI Hosted Live Link- https://ranikumari08.github.io/My-Portfolio/
Backend API
👉 https://my-portfolio-1-pes7.onrender.com
Health Check
👉 https://my-portfolio-1-pes7.onrender.com/health
GitHub Repo
👉 https://github.com/Ranikumari08/My-Portfolio

📄 Resume
📌 Resume Link:
👉 https://drive.google.com/file/d/1wj-vECV6nYDA6CwKjrs8Q_VQCebVZU5m/view?usp=drive_link

🛠 Tech Stack
Backend: Python, Flask
Database: MySQL (Railway – Cloud)
Deployment: Render
Server: Gunicorn
Connector: mysql-connector-python
Version Control: Git & GitHub

📂 Features

RESTful API architecture
Cloud-hosted MySQL database
Secure environment variable configuration
Health check endpoint for deployment monitoring
Modular endpoints for different portfolio sections
Production-ready deployment on Render

🧱 Architecture
Client / UI
     |
     |  (HTTP + CORS enabled)
     v
Flask REST API (Render)
     |
     v
Railway MySQL Database

API exposes JSON endpoints
Database connection handled via environment variables
CORS enabled to allow frontend → backend communication

🔗 API Endpoints
| Endpoint          | Method | Description                    |
| ----------------- | ------ | ------------------------------ |
| `/`               | GET    | API info + available endpoints |
| `/health`         | GET    | Health check (returns 200)     |
| `/profile`        | GET    | Profile details                |
| `/skills/top`     | GET    | Skills list                    |
| `/projects`       | GET    | Projects                       |
| `/work`           | GET    | Work experience                |
| `/education`      | GET    | Education                      |
| `/certifications` | GET    | Certifications                 |
| `/links`          | GET    | GitHub / LinkedIn / Portfolio  |

📌 Example Response
/health
{
  "status": "ok"
}

🔐 CORS Configuration
CORS is enabled using flask-cors to allow frontend applications to call the hosted API.
from flask_cors import CORS
CORS(app)

🗄 Database Schema (Summary)
Database: railway
| Table            | Purpose                          |
| ---------------- | -------------------------------- |
| `profile`        | Personal & profile info          |
| `skills`         | Technical skills                 |
| `projects`       | Project details                  |
| `education`      | Education history                |
| `work`           | Work experience                  |
| `certifications` | Certifications                   |
| `links`          | GitHub, LinkedIn, Portfolio URLs |

🧪 Sample curl Requests
Health Check
curl https://my-portfolio-1-pes7.onrender.com/health

Get Profile
curl https://my-portfolio-1-pes7.onrender.com/profile

Get Projects
curl https://my-portfolio-1-pes7.onrender.com/projects

⚙️ Environment Variables
The application uses environment variables for secure configuration.
MYSQLHOST=your_mysql_host
MYSQLPORT=your_mysql_port
MYSQLUSER=your_mysql_user
MYSQLPASSWORD=your_mysql_password
MYSQLDATABASE=railway

▶️ Run Locally
1️⃣ Clone the repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

2️⃣ Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

3️⃣ Install dependencies
pip install -r requirements.txt

4️⃣ Set environment variables
(Create a .env file or set variables manually)

5️⃣ Run the app
python app.py

App will run on:
http://127.0.0.1:10000

☁️ Deployment
Backend deployed using Render Web Service
Database hosted on Railway MySQL
Gunicorn used as the production WSGI server
Automatic redeploy on GitHub commits

🧠 Key Learnings
Designed and implemented REST APIs using Flask
Migrated local MySQL database to Railway cloud MySQL
Managed environment variables for production security
Debugged real-world deployment and database issues
Gained hands-on experience with cloud deployment workflows

👩‍💻 Author
Rani Kumari
Final Year, M.Tech CSE – VIT Vellore

