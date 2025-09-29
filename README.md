# Online Quiz Portal

A full-stack web application built with Next.js that allows users to take quizzes and receive certificates upon passing. The application features a modern UI, serverless backend, and PDF certificate generation.

## Features

- **Landing Page**: Quiz instructions and personal details collection
- **Interactive Quiz**: 15 multiple-choice questions with navigation
- **Real-time Scoring**: Automatic score calculation and result display
- **Certificate Generation**: PDF certificates for users who pass (≥70%)
- **Responsive Design**: Modern UI with TailwindCSS
- **Serverless Architecture**: Deployable on Vercel with PlanetScale database

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes (Serverless)
- **Database**: PlanetScale MySQL
- **PDF Generation**: pdf-lib
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ 
- npm or yarn
- PlanetScale account (for database)

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
cd quiz-app
npm install
```

### 2. Database Setup

1. Create a PlanetScale account at [planetscale.com](https://planetscale.com)
2. Create a new database
3. Get your connection details (host, username, password)
4. Create a `.env.local` file in the root directory:

```env
DATABASE_HOST=your-planetscale-host
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password
```

### 3. Database Schema

The application will automatically create the required table. The schema includes:

```sql
CREATE TABLE results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  enrollment_number VARCHAR(50) NOT NULL,
  branch VARCHAR(100) NOT NULL,
  course VARCHAR(100) NOT NULL,
  school VARCHAR(255) NOT NULL,
  score INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Vercel

### 1. Prepare for Deployment

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `DATABASE_HOST`
   - `DATABASE_USERNAME` 
   - `DATABASE_PASSWORD`

### 2. Deploy

```bash
npm run build
```

Vercel will automatically deploy your application.

## Project Structure

```
quiz-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── submit-quiz/
│   │   │   │   └── route.ts
│   │   │   └── generate-certificate/
│   │   │       └── route.ts
│   │   ├── quiz/
│   │   │   └── page.tsx
│   │   ├── result/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── lib/
│       ├── database.ts
│       └── quizData.ts
├── public/
├── package.json
└── README.md
```

## API Endpoints

### POST /api/submit-quiz

Submits quiz answers and calculates score.

**Request Body:**
```json
{
  "answers": [0, 1, 2, 3, ...],
  "userDetails": {
    "name": "John Doe",
    "enrollmentNumber": "12345",
    "branch": "Computer Science",
    "course": "Bachelor of Technology",
    "school": "University Name"
  }
}
```

**Response:**
```json
{
  "success": true,
  "score": 12,
  "totalQuestions": 15,
  "percentage": 80,
  "passed": true,
  "resultId": 123
}
```

### POST /api/generate-certificate

Generates a PDF certificate for passing students.

**Request Body:**
```json
{
  "name": "John Doe",
  "course": "Bachelor of Technology",
  "score": 12,
  "totalQuestions": 15
}
```

**Response:** PDF file download

## Quiz Flow

1. **Landing Page**: User fills personal details form
2. **Quiz Page**: User answers 15 multiple-choice questions
3. **Result Page**: Score display and certificate download (if passed)

## Customization

### Adding New Questions

Edit `src/lib/quizData.ts` to add or modify questions:

```typescript
{
  id: 16,
  question: "Your question here?",
  options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  correctAnswer: 0 // Index of correct option (0-3)
}
```

### Styling

The application uses TailwindCSS. Modify classes in the component files to change styling.

### Certificate Design

Edit `src/app/api/generate-certificate/route.ts` to customize the certificate layout, fonts, and content.

**Canva Template**: The certificate design can be customized using the provided Canva template:
- Template Link: https://www.canva.com/design/DAG0Ltn0qZs/ooS_OL8ZnTacd4RKDTSCiQ/edit?ui=eyJBIjp7fX0
- To use this template, you can export the design as a PDF and integrate it as a background in the certificate generation code.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_HOST` | PlanetScale database host | Yes |
| `DATABASE_USERNAME` | PlanetScale username | Yes |
| `DATABASE_PASSWORD` | PlanetScale password | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support, please open an issue in the GitHub repository or contact the development team.