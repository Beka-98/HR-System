# HR System

نظام إدارة الموارد البشرية (HR Management System) بخلفية عملية وسهلة التشغيل، بصيغة MVP مناسبة للعرض والتطوير.

## المميزات

- لوحة تحكم رئيسية
- إدارة الموظفين
- سجل الحضور والانصراف
- إدارة طلبات الإجازات
- كشف الرواتب
- تقارير أساسية
- واجهة ويب تفاعلية
- بيانات تجريبية جاهزة

## التقنيات

- Node.js
- Express
- HTML / CSS / JavaScript

## التشغيل

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

3. Open the app:

```text
http://localhost:5000
```

## هيكل المشروع

```text
HR-System/
├── public/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── package.json
├── README.md
├── server.js
└── .gitignore
```

## API Endpoints

- GET /api/dashboard
- GET /api/employees
- POST /api/employees
- GET /api/attendance
- POST /api/attendance
- GET /api/leaves
- POST /api/leaves
- GET /api/payroll
- GET /api/reports

## ملاحظات

هذا المشروع هو نسخة MVP قابلة للتوسع، ويمكن تطويره لاحقاً إلى:
- نظام مصادقة حقيقي (JWT)
- قاعدة بيانات PostgreSQL
- واجهة React/Next.js
- تقارير PDF/Excel
- إشعارات البريد والرسائل
- نظام أذونات متقدم

## المطور

Beka-98

