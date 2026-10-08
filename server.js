const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const employees = [
  {
    id: 1,
    fullName: 'أحمد علي',
    email: 'ahmed.ali@company.com',
    phone: '+966500123456',
    department: 'Development',
    position: 'Senior Frontend Developer',
    status: 'Active',
    hireDate: '2022-01-10',
    manager: 'سارة محمد',
    salary: 12000
  },
  {
    id: 2,
    fullName: 'سارة محمد',
    email: 'sara.mohamed@company.com',
    phone: '+966500123457',
    department: 'HR',
    position: 'HR Manager',
    status: 'Active',
    hireDate: '2021-05-18',
    manager: 'Executive Team',
    salary: 15000
  },
  {
    id: 3,
    fullName: 'محمود خالد',
    email: 'mahmoud.khalid@company.com',
    phone: '+966500123458',
    department: 'Finance',
    position: 'Accountant',
    status: 'On Leave',
    hireDate: '2020-09-25',
    manager: 'سارة محمد',
    salary: 10500
  },
  {
    id: 4,
    fullName: 'ليلى حسن',
    email: 'layla.hassan@company.com',
    phone: '+966500123459',
    department: 'Design',
    position: 'UI/UX Designer',
    status: 'Active',
    hireDate: '2023-02-15',
    manager: 'سارة محمد',
    salary: 9800
  }
];

const attendance = [
  { id: 1, employeeId: 1, employeeName: 'أحمد علي', date: '2026-10-01', checkIn: '08:30', checkOut: '17:30', status: 'Present' },
  { id: 2, employeeId: 2, employeeName: 'سارة محمد', date: '2026-10-01', checkIn: '08:15', checkOut: '17:15', status: 'Present' },
  { id: 3, employeeId: 3, employeeName: 'محمود خالد', date: '2026-10-01', checkIn: '00:00', checkOut: '00:00', status: 'Leave' },
  { id: 4, employeeId: 4, employeeName: 'ليلى حسن', date: '2026-10-01', checkIn: '08:45', checkOut: '17:00', status: 'Present' }
];

const leaveRequests = [
  { id: 1, employeeId: 1, employeeName: 'أحمد علي', type: 'Annual Leave', startDate: '2026-10-08', endDate: '2026-10-10', reason: 'Family vacation', status: 'Approved' },
  { id: 2, employeeId: 4, employeeName: 'ليلى حسن', type: 'Sick Leave', startDate: '2026-10-05', endDate: '2026-10-06', reason: 'Medical rest', status: 'Pending' },
  { id: 3, employeeId: 3, employeeName: 'محمود خالد', type: 'Annual Leave', startDate: '2026-10-11', endDate: '2026-10-15', reason: 'Travel', status: 'Rejected' }
];

const payroll = [
  { id: 1, employeeId: 1, employeeName: 'أحمد علي', month: '2026-10', baseSalary: 12000, allowances: 900, deductions: 350, netSalary: 12550 },
  { id: 2, employeeId: 2, employeeName: 'سارة محمد', month: '2026-10', baseSalary: 15000, allowances: 1200, deductions: 450, netSalary: 15750 },
  { id: 3, employeeId: 3, employeeName: 'محمود خالد', month: '2026-10', baseSalary: 10500, allowances: 700, deductions: 300, netSalary: 10900 },
  { id: 4, employeeId: 4, employeeName: 'ليلى حسن', month: '2026-10', baseSalary: 9800, allowances: 600, deductions: 250, netSalary: 10150 }
];

app.get('/api/dashboard', (req, res) => {
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((employee) => employee.status === 'Active').length;
  const pendingLeaves = leaveRequests.filter((leave) => leave.status === 'Pending').length;
  const avgSalary = Math.round(payroll.reduce((sum, item) => sum + item.netSalary, 0) / payroll.length);

  res.json({
    stats: [
      { label: 'Total Employees', value: totalEmployees, change: '+8.2%' },
      { label: 'Active Employees', value: activeEmployees, change: '+3.5%' },
      { label: 'Pending Leaves', value: pendingLeaves, change: '-2.1%' },
      { label: 'Avg Salary', value: `${avgSalary} SAR`, change: '+5.8%' }
    ],
    recentActivity: [
      'أحمد علي requested annual leave',
      'سارة محمد approved 3 leave requests',
      'Payroll for October was calculated successfully',
      'Employee attendance report generated'
    ]
  });
});

app.get('/api/employees', (req, res) => {
  res.json(employees);
});

app.post('/api/employees', (req, res) => {
  const employee = {
    id: Date.now(),
    ...req.body,
    status: req.body.status || 'Active',
    salary: Number(req.body.salary || 0)
  };

  employees.push(employee);
  res.status(201).json(employee);
});

app.get('/api/attendance', (req, res) => {
  res.json(attendance);
});

app.post('/api/attendance', (req, res) => {
  const record = {
    id: Date.now(),
    ...req.body,
    status: req.body.status || 'Present'
  };

  attendance.unshift(record);
  res.status(201).json(record);
});

app.get('/api/leaves', (req, res) => {
  res.json(leaveRequests);
});

app.post('/api/leaves', (req, res) => {
  const leave = {
    id: Date.now(),
    ...req.body,
    status: req.body.status || 'Pending'
  };

  leaveRequests.unshift(leave);
  res.status(201).json(leave);
});

app.get('/api/payroll', (req, res) => {
  res.json(payroll);
});

app.get('/api/reports', (req, res) => {
  const presentCount = attendance.filter((entry) => entry.status === 'Present').length;
  const totalSalary = payroll.reduce((sum, item) => sum + item.netSalary, 0);

  res.json({
    attendanceRate: `${Math.round((presentCount / attendance.length) * 100)}%`,
    totalSalary,
    departments: ['Development', 'HR', 'Finance', 'Design'],
    monthlyTrend: [82, 86, 89, 90, 94, 97]
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`HR System running on http://localhost:${PORT}`);
});
