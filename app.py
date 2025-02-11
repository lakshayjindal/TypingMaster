import os
from flask import Flask, render_template, request, redirect, url_for, flash
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask_migrate import Migrate  # ✅ Import Flask-Migrate
from models import User, TypingScore
from database import db

# ✅ Initialize Flask app
app = Flask(__name__)
# ✅ Load configuration from config.py
app.config.from_pyfile("config.py")
app.secret_key = os.environ.get("FLASK_SECRET_KEY") or "typing_tutor_secret_key"

# ✅ Initialize database & migrations
db.init_app(app)
migrate = Migrate(app, db)  # ✅ Enables `flask db` commands

# ✅ Initialize Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# ✅ Home Route
@app.route('/')
def index():
    return render_template('index.html')

# ✅ Login Route
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

# ✅ Register Route
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

# ✅ Practice Route (Requires Login)
@app.route('/practice')
@login_required
def practice():
    return render_template('practice.html')

# ✅ Submit Score Route (Requires Login)
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

# ✅ Leaderboard Route
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

# ✅ Logout Route
@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out successfully.')
    return redirect(url_for('index'))

# ✅ Ensure Tables are Created in Supabase (Alternative to Migrations)
with app.app_context():
    db.create_all()
