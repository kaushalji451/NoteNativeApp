import AsyncStorage from '@react-native-async-storage/async-storage';

const saveNoteForUser = async (noteData) => {

    let currentUser = await AsyncStorage.getItem("currentUser");
    if (!currentUser) {
        console.log("not user found");
        return;
    }
    currentUser = JSON.parse(currentUser);

    try {
        const key = `user_notes_${currentUser.id}`;

        // Get existing notes
        const stored = await AsyncStorage.getItem(key);
        const notes = stored ? JSON.parse(stored) : [];

        // Generate random 4-digit ID
        const randomId = Math.floor(1000 + Math.random() * 9000);

        // Attach ID to the note
        const noteWithId = {
            ...noteData,
            noteId: randomId,
            lastUpdated: Date.now()
        };

        // Add new note
        notes.push(noteWithId);

        // Save back
        await AsyncStorage.setItem(key, JSON.stringify(notes));

        console.log("Saved:", key, "=>", noteWithId);
        console.log("Note saved successfully!");

    } catch (error) {
        console.log("Error saving note", error);
    }
};


export default saveNoteForUser;
