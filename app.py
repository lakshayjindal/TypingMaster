import os
from flask import Flask, render_template, request, redirect, url_for, flash
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import create_engine, text
from models import User, TypingScore
from database import db

app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY") or "typing_tutor_secret_key"

# Configure PostgreSQL database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///todo.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_pre_ping": True,
    "pool_recycle": 300,
}

# Initialize database
db.init_app(app)

# Initialize login manager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        user = User.query.filter_by(username=username).first()

        if user and check_password_hash(user.password_hash, password):
            login_user(user)
            return redirect(url_for('practice'))
        flash('Invalid username or password')
    return render_template('auth/login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        phone_number = request.form.get('phone_number')
        region = request.form.get('region')

        if User.query.filter_by(username=username).first():
            flash('Username already exists')
            return redirect(url_for('register'))

        user = User(
            username=username,
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number,
            password_hash=generate_password_hash(password),
            region=region
        )

        try:
            db.session.add(user)
            db.session.commit()
            flash('Registration successful')
            return redirect(url_for('login'))
        except Exception as e:
            db.session.rollback()
            app.logger.error(f"Registration error: {str(e)}")
            flash('An error occurred during registration')
            return redirect(url_for('register'))

    return render_template('auth/register.html')

@app.route('/practice')
@login_required
def practice():
    return render_template('practice.html')

@app.route('/submit_score', methods=['POST'])
@login_required
def submit_score():
    try:
        data = request.get_json()
        score = TypingScore(
            user_id=current_user.id,
            wpm=data['wpm'],
            accuracy=data['accuracy'],
            language=data['language']
        )
        db.session.add(score)
        db.session.commit()
        return {'status': 'success'}
    except Exception as e:
        app.logger.error(f"Score submission error: {str(e)}")
        db.session.rollback()
        return {'status': 'error', 'message': str(e)}, 500

@app.route('/leaderboard')
def leaderboard():
    try:
        scores = db.session.query(
            User.first_name,
            User.last_name,
            User.region,
            db.func.max(TypingScore.wpm).label('max_wpm'),
            db.func.avg(TypingScore.accuracy).label('avg_accuracy')
        ).join(TypingScore).group_by(User.id).order_by(db.desc('max_wpm')).limit(10).all()

        formatted_scores = [{
            'full_name': f"{score.first_name} {score.last_name}",
            'region': score.region,
            'max_wpm': score.max_wpm,
            'avg_accuracy': score.avg_accuracy
        } for score in scores]

        return render_template('leaderboard.html', scores=formatted_scores)
    except Exception as e:
        app.logger.error(f"Leaderboard error: {str(e)}")
        flash('Error loading leaderboard')
        return redirect(url_for('index'))

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out successfully.')
    return redirect(url_for('index'))

# Create database tables within application context
with app.app_context():
    db.create_all()