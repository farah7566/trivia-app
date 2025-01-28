Trivia App - Red Hat OpenShift Deployment

Introduction

This project involves the deployment of a Trivia App using Red Hat OpenShift. It is part of the DO101 course, which focuses on containerization, cloud-native development, and managing applications in OpenShift environments.

Features

Cloud-native application deployment

Containerized microservices

Scalable and automated deployment with OpenShift

CI/CD pipeline integration

Environment configuration for optimized performance

Technologies Used

Red Hat OpenShift: Platform for deploying and managing applications

Docker: Containerization of the application

Kubernetes: Orchestration of containers

GitHub: Version control and CI/CD integration

Python/Flask 
HTML\CSS\JS 

Prerequisites

Before deploying the application, ensure you have:

An active Red Hat OpenShift cluster

Access to OpenShift CLI 

Docker installed on your local machine

A GitHub repository for source code and CI/CD integration

Installation & Deployment

1. Clone the Repository

 git clone https://github.com/your-username/trivia-app.git
 cd trivia-app

2. Build and Push the Container Image

docker build -t trivia-app:latest .

3. Log in to OpenShift and Create a New Project

oc login --token=YOUR_ACCESS_TOKEN --server=YOUR_OPENSHIFT_CLUSTER
oc new-project trivia-app

4. Deploy the Application

oc new-app trivia-app:latest --name=trivia-app

5. Expose the Application Route

oc expose svc/trivia-app --hostname=trivia-app.YOUR_DOMAIN.com

6. Verify the Deployment

oc get pods
oc get routes

Troubleshooting

Use oc logs <pod-name> to check application logs.

Use oc status to see the overall health of the application.

Check OpenShift web console for detailed debugging.

Conclusion

This project demonstrates how to deploy and manage a cloud-native Trivia App using Red Hat OpenShift. By leveraging containerization, Kubernetes orchestration, and OpenShift's features, we can efficiently scale and maintain applications in a cloud environment.

