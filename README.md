# DevoCare - Digital Healthcare Platform

![DevoCare Logo](images/logo.png)

DevoCare is a comprehensive digital healthcare solution that connects patients, healthcare providers, and medical facilities through an integrated ecosystem of web applications and APIs.

## 🏗️ Project Architecture

The DevoCare platform consists of four main components:

```
DevoCare/
├── 🌐 Main Website (Static HTML/CSS/JS)
├── 👥 Patient Portal (Angular 19)
├── 🏥 Go-EMR Portal (React 18 + Vite)
└── 🔌 Backend API (Node.js + Express + MongoDB)
```

---

## 📁 Project Structure

### 1. **Main Website** (`/`)
Static marketing website with modern design and responsive layout.

```
├── index.html              # Homepage
├── about.html              # About Us page
├── abha.html               # ABHA Health ID integration page
├── css/
│   ├── index.css           # Homepage styles with design system
│   ├── about.css           # About page styles
│   └── abha.css            # ABHA page styles
├── js/
│   └── main.js             # Navigation and utility functions
└── images/                 # Assets and logos
```

**Tech Stack:**
- HTML5, CSS3, JavaScript (ES6+)
- Font Awesome icons
- Google Fonts (Inter)
- Responsive design with mobile-first approach

**Features:**
- ✅ Modern glassmorphism UI design
- ✅ **Accessibility Toolbar:** Text resize, Day/Night vision, Language selector
- ✅ Premium dropdown navigation for Products
- ✅ Official DevoCare branding with **transparent logo**
- ✅ Refined "About Us" page with team insights
- ✅ ABHA (Ayushman Bharat Health Account) integration info
- ✅ Responsive across all devices

---

### 2. **Patient Portal** (`/patient-app`)
HIPAA-compliant patient portal built with Angular 19 following Nx-style architecture.

```
patient-app/
├── src/app/
│   ├── shell/              # Main layout with sidebar navigation
│   ├── dashboard/          # Patient dashboard
│   ├── appointments/       # Appointment management
│   ├── health-records/     # Medical records (meds, labs, allergies)
│   ├── messages/           # Secure messaging
│   ├── billing/            # Billing and payments
│   ├── forms/              # Forms and documents
│   ├── settings/           # User settings
│   ├── auth/               # Authentication (Login, MFA, Register)
│   └── shared/             # Shared components and services
├── public/
│   └── logo.png            # DevoCare logo
└── package.json
```

**Tech Stack:**
- **Framework:** Angular 19 (Standalone components, Signals)
- **UI Library:** PrimeNG 19
- **CSS Framework:** PrimeFlex
- **Styling:** SCSS
- **State Management:** Angular Signals
- **Routing:** Angular Router

**Architecture Pattern:**
- `feature/` - Smart/container components (routed)
- `data-access/` - Services, state management, API calls
- `ui/` - Presentational components (@Input/@Output)
- `utils/` - Guards, pipes, validators, helpers

**Features:**
- ✅ Secure login with Multi-Factor Authentication (MFA)
- ✅ Patient dashboard with health summary
- ✅ Appointment scheduling and management
- ✅ Health records (medications, lab results, allergies, immunizations)
- ✅ Secure messaging with healthcare providers
- ✅ Billing and payment management
- ✅ Forms and document management
- ✅ User profile and settings
- ✅ "Back to Website" navigation
- ✅ Responsive sidebar navigation

**Demo Credentials:**
```
Email: patient@demo.com
Password: demo123
MFA Code: 123456 (or any 6 digits)
```

**Build & Deploy:**
```bash
cd patient-app
npm install
npm start              # Development server
npm run build          # Production build → dist/patient-portal/browser/
```

---

### 3. **Go-EMR Portal** (`/go-emr`)
Modern Electronic Medical Records system for healthcare providers, inspired by OpenEMR.

```
go-emr/
├── src/
│   ├── components/
│   │   └── layout/         # Layout with header/footer
│   ├── pages/
│   │   ├── Home.jsx        # Landing page
│   │   ├── Features.jsx    # Features showcase
│   │   ├── Security.jsx    # Security & compliance
│   │   └── Pricing.jsx     # Pricing plans
│   ├── styles/
│   │   └── index.css       # TailwindCSS styles
│   ├── App.jsx             # Main app with routing
│   └── main.jsx            # Entry point with HashRouter
├── public/
│   └── logo.png            # DevoCare logo
├── index.html
├── vite.config.js
└── tailwind.config.js
```

**Tech Stack:**
- **Framework:** React 18
- **Build Tool:** Vite 5
- **Routing:** React Router DOM 6 (HashRouter for subfolder deployment)
- **CSS Framework:** TailwindCSS 3
- **Icons:** Lucide React
- **Styling:** Dark mode support with context API

**Features:**
- ✅ Modern EMR landing page
- ✅ Feature showcase (Patient Management, Clinical Documentation, etc.)
- ✅ Security & compliance information (HIPAA, SOC 2)
- ✅ Pricing plans
- ✅ Dark/Light mode toggle
- ✅ "Back to Website" navigation
- ✅ Responsive design
- ✅ DevoCare branding integration

**Build & Deploy:**
```bash
cd go-emr
npm install
npm run dev            # Development server
npm run build          # Production build → dist/
```

**Deployment Notes:**
- Uses `base: './'` in Vite config for subfolder deployment
- Logo imported as module for proper asset bundling
- HashRouter for client-side routing compatibility

---

### 4. **Backend API** (`/backend-api`)
RESTful API server for patient portal authentication and data management.

```
backend-api/
├── models/
│   ├── User.js             # User model (patients)
│   ├── Appointment.js      # Appointment model
│   └── HealthRecord.js     # Health records model
├── routes/
│   ├── auth.js             # Authentication routes
│   ├── appointments.js     # Appointment CRUD
│   └── records.js          # Health records CRUD
├── middleware/
│   └── auth.js             # JWT authentication middleware
├── server.js               # Express server setup
├── seed.js                 # Database seeding script
├── ecosystem.config.js     # PM2 configuration
├── server-setup.sh         # Server deployment script
└── .env                    # Environment variables
```

**Tech Stack:**
- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **CORS:** cors middleware
- **Process Manager:** PM2 (for production)

**API Endpoints:**

**Authentication:**
- `POST /api/auth/register` - Register new patient
- `POST /api/auth/login` - Login with credentials
- `POST /api/auth/verify-mfa` - Verify MFA code

**Appointments:**
- `GET /api/appointments` - Get user appointments
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

**Health Records:**
- `GET /api/records` - Get user health records
- `POST /api/records` - Add health record
- `PUT /api/records/:id` - Update record
- `DELETE /api/records/:id` - Delete record

**Environment Variables:**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/devocare
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:4200
```

**Build & Deploy:**
```bash
cd backend-api
npm install
npm run seed           # Seed database with demo data
npm run dev            # Development with nodemon
npm start              # Production
```

**Production Deployment:**
```bash
# Using PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## 🔗 Integrations

### 1. **ABHA (Ayushman Bharat Health Account)**
- Digital health ID integration for Indian healthcare ecosystem
- Dedicated information page (`abha.html`)
- Patient health record portability

### 2. **MongoDB Atlas**
- Cloud database for patient data
- Secure, scalable storage
- Automatic backups

### 3. **JWT Authentication**
- Stateless authentication
- Secure token-based sessions
- MFA support

### 4. **PrimeNG UI Components**
- Enterprise-grade Angular components
- Consistent design system
- Accessibility compliant

### 5. **TailwindCSS**
- Utility-first CSS framework
- Dark mode support
- Responsive design utilities

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Git

### Full Stack Setup

1. **Clone the repository:**
```bash
git clone https://github.com/AashviNara/DevoCare.git
cd DevoCare
```

2. **Setup Backend API:**
```bash
cd backend-api
npm install
cp .env.example .env  # Configure your environment variables
npm run seed          # Seed database
npm run dev           # Start API server on port 5000
```

3. **Setup Patient Portal:**
```bash
cd patient-app
npm install
npm start             # Start on http://localhost:4200
```

4. **Setup Go-EMR Portal:**
```bash
cd go-emr
npm install
npm run dev           # Start on http://localhost:5173
```

5. **Open Main Website:**
```bash
# Simply open index.html in a browser
# Or use a local server:
npx http-server -p 8080
```

---

## 📦 Deployment

### AWS S3 Deployment (Current)

**Main Website:**
- Upload `index.html`, `about.html`, `abha.html`, `css/`, `js/`, `images/` to S3 bucket root

**Patient Portal:**
```bash
cd patient-app
npm run build
# Upload dist/patient-portal/browser/ contents to S3: patient-app/
```

**Go-EMR Portal:**
```bash
cd go-emr
npm run build
# Upload dist/ contents to S3: go-emr/
```

**Backend API:**
- Deploy to DigitalOcean Droplet or AWS EC2
- Use PM2 for process management
- Configure nginx as reverse proxy

### Environment Configuration

**Production URLs:**
- Main Website: `https://www.devocare.com`
- Patient Portal: `https://www.devocare.com/patient-app/`
- Go-EMR: `https://www.devocare.com/go-emr/`
- API: `https://api.devocare.com`

---

## 🔒 Security & Compliance

### HIPAA Compliance Features
- ✅ Secure authentication with MFA
- ✅ Encrypted data transmission (HTTPS)
- ✅ JWT-based session management
- ✅ Password hashing with bcrypt
- ✅ Role-based access control (RBAC)
- ✅ Audit logging structure
- ✅ Secure API endpoints

### Best Practices
- Environment variables for sensitive data
- CORS configuration
- Input validation and sanitization
- Regular security updates

---

## 🎨 Design System

### Brand Colors
```css
--color-primary: #0056b3;    /* Deep Blue */
--color-accent: #4caf50;     /* Fresh Green */
--color-dark: #1a1a1a;
--color-text: #4a4a4a;
--color-light: #f8f9fa;
```

### Typography
- **Font Family:** Inter (Google Fonts)
- **Weights:** 400, 500, 600, 700

### UI Patterns
- Glassmorphism effects
- Smooth transitions and animations
- Responsive grid layouts
- Mobile-first approach

---

## 📝 Development Workflow

### Git Workflow
```bash
# Feature development
git checkout -b feature/feature-name
git add .
git commit -m "feat: description"
git push origin feature/feature-name

# Create pull request on GitHub
```

### Commit Convention
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Build/config changes

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is proprietary software owned by DevoCare Technologies.

---

## 👥 Team

**DevoCare Technologies**
- Modern healthcare solutions
- Digital transformation for healthcare providers
- Patient-centric technology

---

## 📞 Support

For support and inquiries:
- Website: [www.devocare.com](https://www.devocare.com)
- Email: support@devocare.com

---

## 🔄 Version History

### v1.1.0 (Latest Updates - Feb 2026)
- ✅ **Accessibility Toolbar:** Added text size controls, high-contrast night mode, and language selector.
- ✅ **UI Refinements:**
  - Transparent logo integration across all pages.
  - "About Us" page layout improved with "Who We Are" visual storytelling.
  - Homepage "Who We Serve" section updated with custom imagery.
  - Enhanced button styling and spacing for a professional look.
- ✅ **Code Quality:** Improved CSS organization and responsive adjustments.

### v1.0.0 (Initial Release)
- ✅ Main website with ABHA integration
- ✅ Patient Portal with full feature set
- ✅ Go-EMR landing pages
- ✅ Backend API with MongoDB
- ✅ Comprehensive branding updates
- ✅ Navigation improvements
- ✅ Mobile responsiveness

---

**Built with ❤️ by DevoCare Technologies**

*Inspired by OpenEMR and modern healthcare technology standards*
