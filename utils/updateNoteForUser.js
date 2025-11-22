import AsyncStorage from '@react-native-async-storage/async-storage';

const updateNoteForUser = async (updatedNote) => {
    let currentUser = await AsyncStorage.getItem("currentUser");

    if (!currentUser) {
        console.log("No user found");
        return;
    }
    currentUser = JSON.parse(currentUser);

    try {
        const key = `user_notes_${currentUser.id}`;

        // Get existing notes
        const stored = await AsyncStorage.getItem(key);
        const notes = stored ? JSON.parse(stored) : [];

        // Check note exists
        const index = notes.findIndex(n => n.noteId === updatedNote.noteId);

        if (index === -1) {
            console.log("Note not found to update");
            return;
        }

        // Update the note
        notes[index] = {
            ...notes[index],
            ...updatedNote,
        };

        // Save back
        await AsyncStorage.setItem(key, JSON.stringify(notes));

        console.log("Updated Note:", notes[index]);
        console.log("Note updated successfully!");

    } catch (error) {
        console.log("Error updating note", error);
    }
};



export default updateNoteForUser;
