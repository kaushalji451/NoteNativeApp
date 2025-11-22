
const sortNotes = (notes, type) => {
        if (!notes) return [];

        let sorted = [...notes];

        switch (type) {
            case "az":
                sorted.sort((a, b) => a.title.localeCompare(b.title));
                break;

            case "za":
                sorted.sort((a, b) => b.title.localeCompare(a.title));
                break;

            case "newest":
                sorted.sort((a, b) => (b.lastUpdated || 0) - (a.lastUpdated || 0));
                break;

            case "oldest":
                sorted.sort((a, b) => (a.lastUpdated || 0) - (b.lastUpdated || 0));
                break;
        }

        return sorted;
    };

    export default sortNotes;