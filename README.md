
# Finance Management Dashboard 📊

A full-stack finance management dashboard built using **Angular**, **Django**, and **PostgreSQL**. This web app helps users track expenses, plan budgets, and manage financial goals through interactive visualizations and secure user authentication. The project is deployed on AWS with a CI/CD pipeline for seamless updates.

[Visit the Web App](https://apifinancedashboard.com/) 🌐

![Version](https://img.shields.io/badge/version-1.0-blue)  
![Uptime](https://img.shields.io/badge/uptime-99.9%25-brightgreen)  
![Users](https://img.shields.io/badge/users-30%2B-blue)

## Features ✨

- **Expense Tracking**: Monitor and categorize daily expenses with visual analytics.
- **Budget Planning**: Set and track budgets with intuitive, interactive tools.
- **Goal Management**: Plan and manage personal financial goals.
- **Secure User Authentication**: User data is protected with secure sign-in functionality.
- **Responsive UI**: Built with Angular, the dashboard is fully responsive on all devices.
- **RESTful API**: A well-designed API for seamless communication between frontend and backend services.
- **CI/CD Pipeline**: Automated deployment using GitHub Actions, reducing deployment time by 75%.

## Tech Stack 🛠️

- **Frontend**: Angular
- **Backend**: Django (Python)
- **Database**: PostgreSQL
- **CI/CD**: GitHub Actions, AWS
- **Deployment**: AWS (EC2, S3)

## Usage 📱

For quick usage, navigate to 'https://apifinancedashboard.com/' in your browser. You can create an account, log in, and start tracking your finances!

## Setup and Installation 🚀

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/finance-management-dashboard.git
   cd finance-management-dashboard
   ```

2. **Backend Setup**:
   - Create a virtual environment and install dependencies:
     ```bash
     python -m venv env
     source env/bin/activate
     pip install -r requirements.txt
     ```
   - Set up PostgreSQL and configure environment variables.

3. **Frontend Setup**:
   - Navigate to the Angular frontend directory and install dependencies:
     ```bash
     cd frontend
     npm install
     ```

4. **Run the app**:
   - Start the Django backend server:
     ```bash
     python manage.py runserver
     ```
   - Run the Angular frontend:
     ```bash
     ng serve
     ```

## CI/CD Pipeline 📦

The project uses **GitHub Actions** for automated testing and deployment, reducing deployment time by 75% and improving system uptime to 99.9%. The app is deployed on AWS services including EC2 and S3 for optimal scalability and performance.

## Contributing 🤝

Contributions are welcome! If you'd like to improve this project, feel free to fork the repo and submit a pull request. Please make sure to update tests as appropriate.

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
