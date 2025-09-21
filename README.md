# Shiv Accounting System

A comprehensive accounting management system built with Node.js, Express.js, PostgreSQL, and vanilla JavaScript.

## Features

### 🏠 Dashboard
- Real-time statistics and metrics
- Quick action buttons
- Recent activities overview
- Visual data representation

### 👥 User Management
- Create, read, update, and delete users
- Role-based access control (Admin, Accountant, User)
- User status management
- Secure authentication

### 📊 Chart of Accounts
- Complete chart of accounts management
- Support for Assets, Liabilities, Equity, Revenue, and Expenses
- Account code organization
- Hierarchical account structure

### 🛒 Purchase Management
- Purchase Orders creation and tracking
- Purchase Bills management
- Payment tracking
- Vendor management

### 💰 Sales Management
- Sales Orders processing
- Sales Invoices generation
- Receipt management
- Customer tracking

### 📈 Reports
- Profit & Loss statements
- Balance Sheet reports
- Trial Balance
- Cash Flow statements

## Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **pg** - PostgreSQL client for Node.js
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **HTML5** - Markup language
- **CSS3** - Styling with modern features
- **Vanilla JavaScript** - Client-side scripting
- **Font Awesome** - Icons
- **Responsive Design** - Mobile-friendly interface

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** (comes with Node.js)

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd shiv-acc
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup

#### Option A: Using PostgreSQL Command Line
```bash
# Create database
createdb myappdb

# Run the schema file
psql -d myappdb -f database_schema.sql
```

#### Option B: Using pgAdmin
1. Open pgAdmin
2. Create a new database named `myappdb`
3. Run the SQL commands from `database_schema.sql`

### 4. Configure Database Connection

Update the database connection settings in `server.js`:

```javascript
const pool = new Pool({
  user: "your_username",        // Your PostgreSQL username
  host: "localhost",
  database: "myappdb",
  password: "your_password",    // Your PostgreSQL password
  port: 5432,
});
```

### 5. Start the Application

#### Start the Backend Server
```bash
node server.js
```

The server will start on `http://localhost:5000`

#### Open the Frontend
Open `frontend/index.html` in your web browser or serve it using a local server:

```bash
# Using Python (if installed)
cd frontend
python -m http.server 8000

# Using Node.js http-server (if installed globally)
cd frontend
http-server -p 8000
```

Then visit `http://localhost:8000`

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Users
- `GET /users` - Get all users
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Chart of Accounts
- `GET /api/accounts` - Get all accounts
- `POST /api/accounts` - Create new account
- `PUT /api/accounts/:id` - Update account
- `DELETE /api/accounts/:id` - Delete account

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Database Schema

The application uses the following main tables:

- **users** - User management
- **chart_of_accounts** - Chart of accounts
- **purchase_orders** - Purchase orders
- **purchase_bills** - Purchase bills
- **sales_orders** - Sales orders
- **sales_invoices** - Sales invoices
- **payments** - Payment records

## Project Structure

```
shiv-acc/
├── frontend/
│   ├── index.html          # Main HTML file
│   ├── styles.css          # CSS styles
│   └── script.js           # JavaScript functionality
├── backend/                # Backend files (if separated)
├── server.js              # Main server file
├── express.js             # Express configuration
├── database_schema.sql    # Database schema
├── package.json           # Dependencies
└── README.md             # This file
```

## Features in Detail

### Dashboard
- **Statistics Cards**: Display key metrics like total users, accounts, revenue, and expenses
- **Quick Actions**: Fast access to common tasks
- **Recent Activities**: Timeline of recent system activities
- **Responsive Design**: Works on desktop, tablet, and mobile

### User Management
- **CRUD Operations**: Full create, read, update, delete functionality
- **Role Management**: Admin, Accountant, and User roles
- **Status Tracking**: Active/Inactive user status
- **Form Validation**: Client-side and server-side validation

### Chart of Accounts
- **Account Types**: Assets, Liabilities, Equity, Revenue, Expenses
- **Account Codes**: Unique identifiers for each account
- **Hierarchical Structure**: Support for sub-accounts
- **Search and Filter**: Easy account lookup

### Purchase Management
- **Purchase Orders**: Create and track purchase orders
- **Purchase Bills**: Manage vendor bills
- **Payment Tracking**: Record payments made
- **Vendor Management**: Track vendor information

### Sales Management
- **Sales Orders**: Process customer orders
- **Sales Invoices**: Generate customer invoices
- **Receipt Management**: Track customer payments
- **Customer Management**: Maintain customer records

## Security Features

- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Prevention**: Parameterized queries
- **CORS Configuration**: Proper cross-origin resource sharing
- **Error Handling**: Comprehensive error handling and logging

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support and questions, please contact the development team.

## Future Enhancements

- [ ] Advanced reporting with charts and graphs
- [ ] Multi-currency support
- [ ] Inventory management
- [ ] Tax calculations
- [ ] Backup and restore functionality
- [ ] API documentation with Swagger
- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] Cloud deployment support

## Changelog

### Version 1.0.0
- Initial release
- Basic CRUD operations for users and accounts
- Dashboard with statistics
- Purchase and sales management structure
- Responsive design
- PostgreSQL integration

### Video-Link : https://drive.google.com/file/d/1lZVbEXswrSp-TcPJ1OIPyES5wUap7f_w/view?usp=drivesdk
