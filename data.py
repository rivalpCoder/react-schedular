pipelines = [
    {"id": 1, "name": "Build & Test", "status": "success", "branch": "main", "duration": "2m 30s", "triggered_by": "john.doe"},
    {"id": 2, "name": "Deploy Staging", "status": "running", "branch": "feature/auth", "duration": "1m 10s", "triggered_by": "jane.smith"},
    {"id": 3, "name": "Deploy Production", "status": "failed", "branch": "main", "duration": "3m 45s", "triggered_by": "devops-bot"},
    {"id": 4, "name": "Security Scan", "status": "success", "branch": "main", "duration": "5m 00s", "triggered_by": "john.doe"},
    {"id": 5, "name": "IaC Terraform Apply", "status": "pending", "branch": "infra/update", "duration": "-", "triggered_by": "jane.smith"},
]

services = [
    {"id": 1, "name": "Auth Service", "env": "production", "status": "healthy", "uptime": "99.9%", "region": "us-east-1"},
    {"id": 2, "name": "Payment Service", "env": "production", "status": "healthy", "uptime": "99.7%", "region": "us-west-2"},
    {"id": 3, "name": "Notification Service", "env": "staging", "status": "degraded", "uptime": "95.0%", "region": "eu-west-1"},
    {"id": 4, "name": "API Gateway", "env": "production", "status": "healthy", "uptime": "100%", "region": "us-east-1"},
    {"id": 5, "name": "Data Pipeline", "env": "staging", "status": "down", "uptime": "80.0%", "region": "ap-south-1"},
]

team = [
    {"id": 1, "name": "John Doe", "role": "DevOps Engineer", "email": "john.doe@example.com", "tools": ["Terraform", "AWS", "Docker"]},
    {"id": 2, "name": "Jane Smith", "role": "SRE Engineer", "email": "jane.smith@example.com", "tools": ["Kubernetes", "Prometheus", "Grafana"]},
    {"id": 3, "name": "Bob Lee", "role": "Cloud Architect", "email": "bob.lee@example.com", "tools": ["CDK", "CloudFormation", "EKS"]},
    {"id": 4, "name": "Alice Ray", "role": "Security Engineer", "email": "alice.ray@example.com", "tools": ["GuardDuty", "Vault", "SAST"]},
]
