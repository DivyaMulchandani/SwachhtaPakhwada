export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Swachhata Pakhwada was launched under which national mission?",
    options: ["Digital India Mission", "Swachh Bharat Mission", "Cyber Security Mission", "National Health Mission"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "The primary aim of Swachhata Pakhwada is to:",
    options: ["Improve exam results", "Promote foreign investment", "Inspire citizens to adopt hygiene and cleanliness practices", "Encourage use of social media"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "Digital Data Cleaning mainly focuses on:",
    options: ["Deleting only images and videos", "Removing unnecessary, redundant, or corrupted data", "Formatting the entire hard drive", "Installing antivirus software"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "Which of the following is NOT a benefit of digital data cleaning?",
    options: ["Enhanced system performance", "Improved security", "Increased electricity consumption", "Efficient storage management"],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "Temporary files are created by:",
    options: ["Internet providers", "Operating system and applications", "Hackers", "Antivirus software"],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "Why is cleaning junk and temporary files important?",
    options: ["It increases storage space", "It prevents security risks", "It avoids application errors", "All of the above"],
    correctAnswer: 3
  },
  {
    id: 7,
    question: "Which tool can be used in Windows for junk file cleaning?",
    options: ["Disk Cleanup / CCleaner", "BleachBit", "CleanMyMac", "JustDeleteMe"],
    correctAnswer: 0
  },
  {
    id: 8,
    question: "On macOS, deleting unused language files is important because:",
    options: ["They can slow down the internet", "They take up unnecessary disk space", "They corrupt applications", "They remove system updates"],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "Which of the following is considered 'Risky' to clean in Linux BleachBit?",
    options: ["Cache", "Thumbnails", "Firefox Passwords", "System logs"],
    correctAnswer: 2
  },
  {
    id: 10,
    question: "Cleaning your digital footprint involves:",
    options: ["Buying a new computer", "Deleting or deactivating old accounts", "Upgrading your RAM", "Installing antivirus"],
    correctAnswer: 1
  },
  {
    "id": 11,
    "question": "Which activity is promoted during Swachhata Pakhwada in workplaces?",
    "options": ["Organizing cleanliness drives", "Installing new software", "Increasing online meetings", "Promoting gaming competitions"],
    "correctAnswer": 0
  },
  {
    "id": 12,
    "question": "Which of the following is a common hygiene practice emphasized in Swachhata Pakhwada?",
    "options": ["Regular handwashing", "Watching TV", "Using social media", "Online shopping"],
    "correctAnswer": 0
  },
  {
    "id": 13,
    "question": "Digital cleaning helps in:",
    "options": ["Reducing clutter on devices", "Slowing down the system", "Increasing battery consumption", "Deleting important files randomly"],
    "correctAnswer": 0
  },
  {
    "id": 14,
    "question": "Which of these actions is discouraged for maintaining digital hygiene?",
    "options": ["Deleting temporary files", "Using strong passwords", "Clicking unknown email links", "Updating software regularly"],
    "correctAnswer": 2
  },
  {
    "id": 15,
    "question": "The key message of Swachhata Pakhwada is to:",
    "options": ["Promote cleanliness and hygiene awareness", "Encourage online gaming", "Focus on advertisements", "Increase digital storage usage"],
    "correctAnswer": 0
  }
];
