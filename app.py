import os
from models import User, TypingScore
from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)
app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY") or "typing_tutor_secret_key"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///typing_tutor.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# Import models after db initialization


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
            if password is not None:
                login_user(user)
                return redirect(url_for('practice'))
        flash('Invalid username or password')
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
        db.session.add(user)
        db.session.commit()
        flash('Registration successful')
        return redirect(url_for('login'))
    return render_template('auth/register.html')

@app.route('/practice')
@login_required
def practice():
    return render_template('practice.html')

@app.route('/submit_score', methods=['POST'])
@login_required
def submit_score():
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

@app.route('/leaderboard')
def leaderboard():
    scores = db.session.query(
        User.first_name,
        User.last_name,
        User.region,
        db.func.max(TypingScore.wpm).label('max_wpm'),
        db.func.avg(TypingScore.accuracy).label('avg_accuracy')
    ).join(TypingScore).group_by(User.id).order_by(db.desc('max_wpm')).limit(10).all()

    # Convert the scores to a list of dictionaries with computed full_name
    formatted_scores = [{
        'full_name': f"{score.first_name} {score.last_name}",
        'region': score.region,
        'max_wpm': score.max_wpm,
        'avg_accuracy': score.avg_accuracy
    } for score in scores]

    return render_template('leaderboard.html', scores=formatted_scores)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out successfully.')
    return redirect(url_for('index'))

with app.app_context():
    db.create_all()