# 📊 Personal Finance Tracker

A user-friendly, full-stack web application built with the MERN stack to help you track income, expenses, and visualize your financial data with dynamic charts.

<!-- *(Replace the link above with a GIF of your project in action)* -->

-----

## 🚀 Features

  - **User Authentication**: Secure user registration and login system using JWT or Firebase Auth.
  - **Transaction Management**: Easily Add, Edit, and Delete income and expense transactions.
  - **Categorization**: Assign categories to transactions (e.g., Food, Rent, Salary, Freelance).
  - **Financial Overview**: Instantly view your total income, total expenses, and current balance.
  - **Dynamic Charts**: Visualize financial data with interactive bar and pie charts powered by **Recharts**.
  - **Historical Data**: Automatically tracks and displays financial data for the **last 6 months**.
  - **Responsive Design**: A clean and modern UI that works seamlessly on desktops, tablets, and mobile devices.

-----

## 💻 Tech Stack

  - **Frontend**: React, Tailwind CSS, Axios
  - **Database**: Firestore Database
  - **Authentication**: Firebase Auth
  - **Charting Library**: Recharts (for animated, interactive charts)
  - **Date Utility**: `date-fns`

-----

## 🔐 Authentication

Authentication is handled using **JSON Web Tokens (JWT)**. When a user logs in, a token is generated and stored in a secure, `HttpOnly` cookie. This token is sent with subsequent requests to protected API endpoints, ensuring that only authenticated users can access their financial data.

Alternatively, this setup can be easily adapted to use **Firebase Authentication**.

-----

## 📊 Charts Logic

The dashboard features two primary charts from **Recharts** to provide insightful financial summaries:

1.  **Bar Chart (Monthly Summary)**:

      - Displays total income vs. total expenses for each of the **last 6 months**.
      - Data is dynamically aggregated on the backend based on the user's transactions.
      - Uses `date-fns` to calculate the monthly ranges.

2.  **Pie Chart (Expense Distribution)**:

      - Shows a breakdown of expenses by category for the current month.
      - Helps users quickly identify where their money is going.

-----

## ⚙️ Installation & Setup

To get a local copy up and running, follow these simple steps.

### Prerequisites

  - Node.js (v14 or later)
  - npm or yarn
  - MongoDB (local instance or a cloud instance from MongoDB Atlas)

### Installation Steps

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/AkshatRaval/LevelUp-Finance-Personal-Finance-App.git
    cd LevelUp-Finance-Personal-Finance-App
    ```

2.  **Setup the Backend:**

    ```bash
    # Navigate to the server directory
    cd server

    # Install dependencies
    npm install

    # Create a .env file (see Environment Variables section)
    touch .env

    # Start the development server
    npm run dev
    ```

3.  **Setup the Frontend:**

    ```bash
    # Navigate to the client directory from the root
    cd ../client

    # Install dependencies
    npm install

    # Start the React development server
    npm run dev
    ```

    Your application should now be running at `http://localhost:5173` (or another port if specified).

-----

**For Firebase Authentication (Client-side):**
If using Firebase, create a `.env.local` file in the `client/` directory.

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

-----

## 📄 Database Schema

The application uses two main schemas: `User` and `Transaction`.

### User Schema (`User.js`)

```javascript
{
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String, // Hashed password
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

### Transaction Schema (`Transaction.js`)

```javascript
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Foreign key relationship to the User model
    required: true
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  note: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

-----

## ☁️ Deployment

  - **Frontend (Client)**: Deploy easily to static hosting providers like **Vercel** or **Netlify**.
  - **Backend (Server)**: Host on services like **Render**, **Railway**, or Heroku.
  - **Database**: Use **MongoDB Atlas** for a free, cloud-hosted MongoDB database.

-----

## 🔮 Future Scope

Here are some features planned for future releases:

  - [ ] **Budget Planner**: Set monthly budgets for different expense categories.
  - [ ] **Recurring Transactions**: Automatically log recurring payments like rent or subscriptions.
  - [ ] **Data Export**: Export financial data to CSV or PDF formats.
  - [ ] **Dark Mode**: A toggle for a comfortable viewing experience in low light.
  - [ ] **AI Spending Insights**: Get smart suggestions based on your spending habits.

-----

## 🤝 How to Contribute

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

-----

## 📧 Contact

**Author**: [Your Name]

**GitHub**: [@AkshatRaval](https://github.com/AkshatRaval)

**Portfolio**: [Akshat Raval Portfolio](https://akshatravalportfolio.vercel.app)

-----

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.