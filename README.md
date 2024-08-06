# MBTI Personality Analysis and Friend Suggestion

## Description

This project analyzes MBTI personalities based on journal entries and suggests potential friends based on compatibility.

## Main Features
- **Interactive Text Editor**: Input journal entries.
- **API 1**: Analyze journal entries to determine MBTI personality.
- **API 2**: Suggest potential friends based on MBTI compatibility.

## Online Demo
- [Watch Demo](https://www.loom.com/share/660554afeb4f444fba808a6c0e16162c?sid=c0f6c8fd-4870-4909-91ef-03f3018124fa)
<img width="569" alt="Screenshot 2024-08-05 at 17 33 19" src="https://github.com/user-attachments/assets/2635bd91-1bfd-4832-b884-2d44e8d25184">

## Website
- [Visit Website](http://333295207857-my-bucket.s3-website-us-west-1.amazonaws.com/)

## Personality Type
- **None**: If there are not enough sentences.

## Project Description

Welcome to the MBTI Personality Checker project!

### Introduction

The MBTI Personality Checker is an innovative project that utilizes OpenAI to analyze an individual's personality based on their diary entries. By leveraging advanced natural language processing techniques, the project provides insights into the user's personality traits and preferences.

### Features

- Diary entry analysis using OpenAI.
- Frontend and backend folders for easy development.
- Frontend setup: Run `npm install` followed by `npm start`.
- Backend setup: Activate the virtual environment with `pipenv shell`, install dependencies with `pipenv install`, and run the server with `python manage.py runserver`.
- Custom `.env` file required for OpenAI GPT Key.

### Usage

To use the MBTI Personality Checker, follow these steps:

1. Set up the frontend by running `npm install` and `npm start` in the frontend folder.
```bash
cd frontend
npm install
npm start
```
2. Activate the virtual environment in the backend folder with `pipenv shell`.
```bash
cd backend
pipenv shell
```
3. Install the required dependencies using `pipenv install`.
```bash
pipenv install
```
4. Run the server with `python manage.py runserver`.
```bash
python manage.py runserver
```
5. Alternatively, visit the website to access the project online.

### Contributing

We welcome contributions from the open-source community. If you'd like to contribute to the MBTI Personality Checker project, please refer to our contribution guidelines.

### License

The MBTI Personality Checker is licensed under the MIT License.

## Tech Stack and Architecture

### Frontend
- **React.js**: Building the user interface.
- **BlockNote**: Rich text editing capabilities.

### Backend
- **Django**: Handling API requests and business logic.
- **Gunicorn**: WSGI HTTP server.

### Deployment
- **AWS EC2**: Hosting the backend.
- **AWS S3**: Hosting the frontend.
- **Nginx**: Reverse proxy and static file server.

### Diagram Flow

#### User Interaction
1. The user interacts with the React.js frontend hosted on AWS S3.
2. They enter their journal entries and click "Analyze".

#### API Request to Backend
1. The frontend sends the journal entry data to the Django backend API endpoint on AWS EC2.

#### Nginx Proxy
1. Nginx, acting as a reverse proxy, receives the API request on a specified endpoint (e.g., http://ec2-instance/api/analyze/).
2. Nginx forwards this request to the Gunicorn server running the Django application.

#### Gunicorn
1. Gunicorn receives the forwarded request from Nginx.
2. Gunicorn passes the request to the Django application.

#### Django Processing
1. Django processes the request, performs the analysis of the journal entries, determines the MBTI personality, and interacts with the database if necessary.
2. Django then generates a response and sends it back to Gunicorn.

#### Response Back to Frontend
1. Gunicorn sends the response back to Nginx.
2. Nginx forwards the response to the React.js frontend.

#### React.js Frontend
1. The frontend receives the response and displays the analysis results to the user.

#### Friend Suggestion
1. The user can request potential friend suggestions based on the MBTI analysis.
2. The frontend sends another API request to the Django backend.
3. Django processes the request, determines friend compatibility, and sends the results back to the frontend.

## Deployment Process

### Step 1: Setup EC2 Instance
1. **Launch an EC2 Instance on AWS**:
   - Go to the AWS Management Console.
   - Navigate to EC2 and click on "Launch Instance."
   - Choose an Amazon Machine Image (AMI), such as Ubuntu Server.
   - Select an instance type (e.g., t2.micro for free tier).
   - Configure instance details and add storage.
   - Add a security group to allow HTTP, HTTPS, and SSH traffic.
   - Review and launch the instance.

2. **SSH into the Instance**:
   - Obtain the public IP address of your EC2 instance.
   - Use your terminal to SSH into the instance.

3. **Install Necessary Packages**:
   - Update the package list and install required packages (Python, pip, pipenv, nginx, git).

### Step 2: Setup Django Backend
1. **Clone the Project Repository**:
   - Clone your Django project repository from GitHub and navigate to the project directory.

2. **Create a Virtual Environment and Install Dependencies**:
   - Create a virtual environment and activate it using pipenv.

3. **Configure Gunicorn and Nginx for Django**:
   - Create and configure the Gunicorn systemd service file.
   - Start and enable the Gunicorn service.

4. **Configure Environment Variable for OpenAI Key**:
   - Create a `.env` file in your project directory and add your OpenAI key.

5. **Collect Static Files**:
   - Run the Django management command to collect static files.

6. **Configure Nginx**:
   - Create and configure the Nginx site configuration file.
   - Enable the Nginx site and restart the service.

### Step 3: Setup S3 for Frontend
1. **Create an S3 Bucket**:
   - Go to the AWS Management Console.
   - Navigate to S3 and click on "Create Bucket."
   - Name your bucket and choose a region.

2. **Configure the Bucket for Static Website Hosting**:
   - Enable static website hosting and specify the index document.

3. **Build the React.js Application Locally**:
   - Run the build command to create the production build.

4. **Upload the Build Files to S3**:
   - Use the AWS CLI to sync the build files to your S3 bucket.

5. **Configure CORS and Permissions for the S3 Bucket**:
   - Add a CORS configuration to allow requests from your frontend.

### Step 4: Connect Frontend and Backend
1. **Update the Frontend Base URL**:
   - Update the base URL for API requests to the public address of your EC2 instance in your React.js project.

2. **Update Django Settings**:
   - Update the `CORS_ALLOWED_ORIGINS` and `ALLOWED_HOSTS` settings in `settings.py` to include your S3 bucket URL and the public DNS of your EC2 instance.

---

Feel free to adjust any part of this README to better fit your project details!
