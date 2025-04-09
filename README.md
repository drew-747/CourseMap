# CourseMap

CourseMap is a web application designed to help UP Computer Science students visualize and track their academic progress through an interactive flowchart system.

## Features

- Interactive course flowchart visualization
- Course status tracking (Not Taken, In Progress, Completed)
- Prerequisite validation
- Course information and advice from seniors
- UP email authentication
- Real-time progress updates

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Firebase account

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/coursemap.git
cd coursemap
```

2. Install dependencies:
```bash
npm install
```

3. Create a Firebase project and add your configuration:
   - Go to the Firebase Console
   - Create a new project
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Add your Firebase configuration to a `.env` file in the root directory:

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Usage

1. Sign in with your UP email address
2. Navigate to the Course Flow page
3. Click on courses to update their status
4. View course information and prerequisites
5. Track your progress through the curriculum

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 