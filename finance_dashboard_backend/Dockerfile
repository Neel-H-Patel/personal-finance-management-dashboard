FROM python:3.9-alpine

# Install system dependencies
RUN apk update && apk add --no-cache postgresql-client
RUN apk add --no-cache curl

# Set the working directory in the container
WORKDIR /app

# Copy requirements.txt and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code
COPY . .

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Command to run on container start
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "finance_dashboard_backend.wsgi:application", "--workers", "3", "--timeout", "120"]
