# 🛡️ Insurance Management System

A full-stack **Insurance Management System** developed using **Spring Boot**, **Spring Data JPA**, **MySQL**, **Thymeleaf**, **HTML**, **CSS**, and **JavaScript**. The system helps manage customers, insurance policies, leads, and reports with secure authentication using `X-Auth-Token`.

---

## 📌 Features

### 🔐 Authentication
- Login System
- X-Auth-Token Based Authentication
- Session Management
- Logout Functionality

### 👥 Customer Management
- Add Customer
- View Customers
- Update Customer
- Delete Customer
- Search Customers

### 📄 Policy Management
- Add Policy
- Update Policy
- Delete Policy
- View All Policies
- Search Policies
- Customer-wise Policy Assignment

### 🎯 Lead Management
- Add Lead
- Update Lead
- Delete Lead
- View Leads
- Search Leads
- Lead Status Management

### 📊 Reports
- Total Customers
- Total Policies
- Total Leads
- Active Policies
- Customer Report
- Policy Report
- Lead Report

---

# 🛠️ Technologies Used

## Backend
- Java 21
- Spring Boot
- Spring MVC
- Spring Data JPA
- Hibernate

## Frontend
- HTML5
- CSS3
- JavaScript (ES6)
- Bootstrap 5
- Font Awesome
- Thymeleaf

## Database
- MySQL

## Build Tool
- Maven

## IDE
- Eclipse IDE

---

# 📂 Project Structure

```
InsuranceManagementSystem
│
├── src/main/java
│   ├── controller
│   ├── entity
│   ├── repository
│   ├── service
│   └── config
│
├── src/main/resources
│   ├── templates
│   ├── static
│   │   ├── css
│   │   ├── js
│   │   └── images
│   └── application.properties
│
└── pom.xml
```

---

# 🗄️ Modules

## Customer
- Customer Registration
- Customer List
- Edit Customer
- Delete Customer

## Policy
- Policy Registration
- Assign Policy to Customer
- Edit Policy
- Delete Policy

## Lead
- Lead Registration
- Lead Status Tracking
- Assigned Agent
- Lead Management

## Reports
- Customer Statistics
- Policy Statistics
- Lead Statistics
- Active Policies

---

# 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/InsuranceManagementSystem.git
```

### Open Project

Import the project into **Eclipse IDE** as a Maven project.

### Configure Database

Update `application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/insurance_db
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Run Project

Run the Spring Boot application.

```
http://localhost:8080
```

---

# 🔑 Authentication

Every secured API requires:

```
X-Auth-Token
```

Example:

```
X-Auth-Token: xxxxxxxxxxxxxxxxx
```

---

# 📋 REST APIs

## Customer APIs

| Method | Endpoint |
|---------|----------|
| GET | /api/customers |
| GET | /api/customers/{id} |
| POST | /api/customers |
| PUT | /api/customers/{id} |
| DELETE | /api/customers/{id} |

---

## Policy APIs

| Method | Endpoint |
|---------|----------|
| GET | /api/policies |
| GET | /api/policies/{id} |
| POST | /api/policies |
| PUT | /api/policies/{id} |
| DELETE | /api/policies/{id} |

---

## Lead APIs

| Method | Endpoint |
|---------|----------|
| GET | /api/leads |
| GET | /api/leads/{id} |
| POST | /api/leads |
| PUT | /api/leads/{id} |
| DELETE | /api/leads/{id} |

---

---

# 🎯 Future Enhancements

- Export Reports to PDF
- Export Reports to Excel
- Dashboard Charts
- Email Notifications
- Pagination
- Advanced Filters
- User Roles (Admin / Agent)

---

# 👨‍💻 Developed By

**Harshad Shinde**

Final Year B.Tech (Computer Science & Engineering)

---

# 📜 License

This project is developed for educational and learning purposes.
