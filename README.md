# 🛡️ CloudShield – Secure & Scalable AWS Web Application

CloudShield is a secure, scalable, and highly available web application infrastructure built on Amazon Web Services (AWS).

This project demonstrates hands-on implementation of AWS networking, load balancing, Auto Scaling, database security, web application protection, monitoring, notifications, and auditing.

## 🚀 Project Overview

The application is hosted on EC2 instances managed by an Auto Scaling Group and distributed through an Application Load Balancer. AWS WAF protects the application from common web attacks, while Amazon RDS MySQL provides a private database layer.

Amazon CloudWatch and SNS provide monitoring and email notifications, while AWS CloudTrail records AWS account and API activity for auditing.
## ☁️ AWS Services Used

- **Amazon VPC** – Custom networking environment
- **Amazon EC2** – Hosts the web application
- **Application Load Balancer (ALB)** – Distributes incoming traffic
- **EC2 Auto Scaling** – Automatically scales EC2 instances based on CPU utilization
- **Amazon RDS (MySQL)** – Private relational database
- **AWS WAF** – Protects the application from common web attacks
- **Amazon CloudWatch** – Monitors infrastructure and CPU utilization
- **Amazon SNS** – Sends email notifications for alarms
- **AWS CloudTrail** – Records AWS API and account activity
- **Amazon S3** – Stores CloudTrail logs
- **AWS IAM** – Controls access to AWS resources
- **Security Groups** – Controls network traffic between resources

## 🏗️ Project Architecture

The CloudShield infrastructure follows a secure and scalable multi-tier AWS architecture.

```text
                         Internet
                            |
                            v
                        AWS WAF
                            |
                            v
                Application Load Balancer
                            |
                            v
                     Target Group
                            |
                    Auto Scaling Group
                     /             \
                  EC2               EC2
                     \             /
                      \           /
                       v         v
                     Amazon RDS MySQL
                      (Private DB)

Monitoring:
CloudWatch ---> SNS ---> Email Notification

Auditing:
CloudTrail ---> Amazon S3

## 🔐 Networking & Security

CloudShield uses a custom Amazon VPC to provide an isolated networking environment for the application.

### Network Design

- Public subnets are used for the internet-facing Application Load Balancer.
- EC2 instances are managed through an Auto Scaling Group across multiple Availability Zones.
- Amazon RDS MySQL is deployed privately with public access disabled.
- Security Groups control communication between different application layers.

### Security Groups

- **ALB Security Group** – Allows incoming HTTP traffic to the Application Load Balancer.
- **EC2 Security Group** – Allows application traffic from the ALB.
- **RDS Security Group** – Allows MySQL traffic on port 3306 only from the EC2 Security Group.

This prevents direct public access to the database and provides controlled communication between AWS resources.
## ⚖️ Load Balancing & Auto Scaling

CloudShield uses an Application Load Balancer (ALB) and EC2 Auto Scaling to provide high availability and scalability.

### Application Load Balancer

- Distributes incoming web traffic across healthy EC2 instances.
- Uses a Target Group to perform health checks on EC2 instances.
- Automatically stops routing traffic to unhealthy instances.

### Auto Scaling

The Auto Scaling Group is configured with:

- **Minimum capacity:** 2 instances
- **Desired capacity:** 2 instances
- **Maximum capacity:** 4 instances
- **Scaling policy:** Target Tracking Scaling
- **Metric:** Average CPU Utilization
- **Target value:** 50%

Auto Scaling was successfully tested using `stress-ng`. When CPU utilization increased, the Auto Scaling Group automatically scaled from 2 to 4 EC2 instances. After the CPU load decreased, the additional instances were automatically terminated during scale-in.

## 🛡️ AWS WAF Protection

AWS WAF is associated with the Application Load Balancer to protect the CloudShield application from common web attacks and malicious traffic.

### WAF Rules

The Web ACL includes the following protection rules:

- **AWS Managed Core Rule Set** – Provides protection against common web vulnerabilities.
- **AWS Managed Known Bad Inputs** – Blocks request patterns associated with known malicious inputs.
- **AWS Managed SQL Database Rules** – Helps protect against SQL injection attacks.
- **CloudShield-RateLimit** – Custom rate-based rule used to limit excessive requests.

The Web ACL is directly associated with the CloudShield Application Load Balancer.

## 🗄️ Amazon RDS MySQL Database

Amazon RDS MySQL is used as the private database layer for the CloudShield application.

### Database Configuration

- **Database engine:** MySQL
- **Database name:** `cloudshield`
- **Database port:** 3306
- **Public access:** Disabled
- **Encryption:** Enabled
- **DB subnet group:** Deployed across 2 Availability Zones
- **Security:** Access restricted using the RDS Security Group

### Secure EC2-to-RDS Connectivity

The RDS Security Group allows MySQL traffic on port **3306** only from the EC2 Security Group.

Database connectivity was successfully tested from an EC2 instance using the MySQL client.

A test table was created and sample data was inserted and retrieved successfully, confirming secure read/write connectivity between EC2 and Amazon RDS.

## 📊 Monitoring & Notifications

Amazon CloudWatch and Amazon SNS are used to monitor the CloudShield infrastructure and provide automated email notifications.

### Amazon CloudWatch

CloudWatch monitors EC2 performance and CPU utilization.

A Target Tracking Scaling Policy was configured for the Auto Scaling Group with:

- **Metric:** Average CPU Utilization
- **Target value:** 50%
- **Instance warm-up:** 300 seconds

A high CPU CloudWatch alarm was also configured to monitor increased CPU utilization.

### Amazon SNS

Amazon SNS is integrated with CloudWatch for email notifications.

- An SNS topic was created for CloudShield alerts.
- An email subscription was configured and confirmed.
- CloudWatch alarms can send notifications through SNS when alarm conditions are triggered.

This provides automated monitoring and alerting for the CloudShield infrastructure.
## 📜 Auditing & Logging

AWS CloudTrail is used to record AWS account activity and API operations performed within the CloudShield environment.

### AWS CloudTrail

A multi-Region CloudTrail trail named `CloudShield-Trail` was configured.

CloudTrail records management events such as:

- Resource creation and modification
- AWS service API calls
- Security and configuration changes
- Infrastructure management activity

CloudTrail Event History was successfully verified during testing.

### Amazon S3 Log Storage

CloudTrail logs are delivered to an Amazon S3 bucket for centralized audit log storage.

This provides an audit trail that can be used to review AWS account activity and investigate infrastructure changes.

## 🧪 Testing & Results

The CloudShield infrastructure was tested to verify availability, scalability, security, monitoring, and database connectivity.

### Tests Performed

- ✅ Website successfully accessed through the Application Load Balancer
- ✅ EC2 instances passed Target Group health checks
- ✅ Auto Scaling successfully scaled from 2 to 4 EC2 instances during high CPU utilization
- ✅ Auto Scaling successfully scaled back after CPU utilization decreased
- ✅ CPU load testing performed using `stress-ng`
- ✅ AWS WAF associated with the Application Load Balancer
- ✅ WAF managed rules and custom rate-limit rule configured
- ✅ Private Amazon RDS MySQL database successfully connected from EC2
- ✅ Database table creation, data insertion, and retrieval successfully tested
- ✅ CloudWatch CPU monitoring and alarms configured
- ✅ SNS email subscription successfully confirmed
- ✅ CloudTrail logging successfully enabled
- ✅ CloudTrail Event History successfully verified
- ✅ CloudTrail logs configured for storage in Amazon S3

### Final Result

The CloudShield environment successfully demonstrated a secure, scalable, highly available, monitored, and auditable AWS web application architecture.

## 🎯 Skills Demonstrated

Through the CloudShield project, the following AWS and cloud infrastructure skills were implemented:

- Amazon VPC networking and subnet configuration
- EC2 instance deployment and management
- Application Load Balancer configuration
- Target Group and health check management
- EC2 Auto Scaling and Target Tracking policies
- CPU-based scale-out and scale-in testing
- AWS WAF configuration and web application protection
- Amazon RDS MySQL deployment and secure database connectivity
- Security Group configuration and access control
- Amazon CloudWatch monitoring and alarms
- Amazon SNS email notifications
- AWS CloudTrail auditing
- Amazon S3 log storage
- Linux administration and troubleshooting
- AWS infrastructure testing and troubleshooting

## 🏁 Project Conclusion

CloudShield demonstrates the implementation of a secure, scalable, highly available, and monitored web application infrastructure on AWS.

The project combines networking, compute, load balancing, Auto Scaling, web security, database services, monitoring, notifications, and auditing into a complete cloud architecture.

By completing this project, practical experience was gained in designing, deploying, securing, monitoring, testing, and troubleshooting AWS infrastructure.
