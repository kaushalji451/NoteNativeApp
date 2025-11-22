## Offline Notes App (Expo + React Native)

A fully offline, multi-user notes application built using Expo, React Native, and AsyncStorage.
The app supports local authentication, per-user notes, image attachments, search, sorting, and account switching — all without any backend.

 Features
## 1. Authentication (Offline Only)

Local Sign Up & Login (no internet required).

User credentials stored securely using AsyncStorage.

Each user has:

Unique username

Password or PIN

After login, users only see their own notes.

Multiple users can use the same device and app.

## 2. Notes Management

For each logged-in user:

View list of created notes.

Create, edit, and delete notes.

Each note includes:

Title

Body text

image

Notes stored locally per user in AsyncStorage:

users/{username}/notes


### Notes List Preview Includes:

Title

Short snippet of body text

Thumbnail

## 3. Image Support

On Create/Edit Note screen:

Add image from gallery using expo-image-picker.

Capture image using camera.

Images remain stored even after app restart (copied to persistent file system).

### 4. Search & Sort

On the Notes List screen:

Search

Search notes by title or body text.

Runs in real-time.

Sort Options

Last Updated

Newest → Oldest

Oldest → Newest

Title

A → Z

Z → A

Search + Sort work together seamlessly.

### 5. Logout

Logout button returns to the Login screen.

Allows switching accounts easily.

Notes remain saved locally.

### Project Structure
/app
  /screens
   - CreatePage.jsx
   - EditPage.jsx
   - HomePage.jsx
   - LoginPage.jsx
   - RegisterPage.jsx
   - SwitchPage.jsx
   - WelcomePage.jsx
/components
/utils
/assets
App.jsx

### Technologies Used
Feature	Library
App Framework	Expo SDK 54
UI & Components	React Native
Local Storage	AsyncStorage
Forms	React Hook Form + Yup
Navigation	React Navigation + Native Stack
Image Picker	expo-image-picker
Styling	NativeWind (Tailwind CSS for RN)
Animations	Reanimated (if required)
### Installation
### Install Dependencies
npm install

### Start Project
npm start

### Run on Device
npm run android
npm run ios
npm run web

### Testing Notes

Create multiple user accounts to test user-isolated data.

Restart app to verify:

Session resets after logout

Notes and images persist

Verify sorting and searching combinations

Test camera + gallery image imports

### Future Improvements (Optional)

Folder support for notes

Note color coding / tagging

Cloud sync option (Firebase / Supabase)

### License

This project is free to use for personal or educational purposes.