let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let editId = null;

let musicCatalog = [
    {
        id: 1,
        title: "Aaguner",
        artist: "Shreya Ghoshal",
        culture: "India",
        mood: "Spiritual",
        genre: "Indian Indie",
        cover: "images/car1.jpeg"
    },
    {
        id: 2,
        title: "Essence",
        artist: "Wizkid",
        culture: "Nigeria",
        mood: "Chill",
        genre: "Afro R&B",
        cover: "images/car2.jpeg"
    },
    {
        id: 3,
        title: "Kakalika",
        artist: "DopeNation",
        culture: "Ghana",
        mood: "Dance",
        genre: "Afrobeats",
        cover: "images/car3.jpeg"
    },
    {
        id: 4,
        title: "Love Story",
        artist: "Indila",
        culture: "France",
        mood: "Sad",
        genre: "R&B",
        cover: "images/car4.jpeg"
    },
    {
        id: 5,
        title: "Monster",
        artist: "EXO",
        culture: "Korea",
        mood: "Dance",
        genre: "K-pop",
        cover: "images/car5.jpeg"
    },
    {
        id: 6,
        title: "Gira Gira",
        artist: "Ado",
        culture: "Japan",
        mood: "Sad",
        genre: "J-pop",
        cover: "images/car6.jpeg"
    },
    {
        id: 7,
        title: "Tshwala Bam",
        artist: "TitoM",
        culture: "South Africa",
        mood: "Dance",
        genre: "Amapiano",
        cover: "images/car7.jpeg"
    }
];

const carCovers = [
    "images/car1.jpeg",
    "images/car2.jpeg",
    "images/car3.jpeg",
    "images/car4.jpeg",
    "images/car5.jpeg",
    "images/car6.jpeg",
    "images/car7.jpeg",
    "images/car8.jpeg",
    "images/car9.jpeg",
    "images/car10.jpeg",
    "images/car11.jpeg"
];

function getCover() {
    const randomIndex = Math.floor(Math.random() * carCovers.length);
    return carCovers[randomIndex];
}

const catalog = document.getElementById("catalog");//genre

function displayMusic(items) {
    catalog.innerHTML = "";

    items.forEach(song => {
        catalog.innerHTML += `
      <div class="card" style="background-image:url('${song.cover || "images/car1.jpg"}')">
    <div class="overlay">
      <h3>${song.title}</h3>
      <p>${song.artist}</p>
      <p>${song.culture}</p>
      <p>${song.mood}</p>
      <p>${song.genre}</p>

      <button onclick="deleteSong(${song.id})">Delete</button> 
      <button onclick="editSong(${song.id})">Edit</button>

      <button onclick="toggleFavorite(${song.id})">
      ${favorites.some(f => f.id === song.id) ? "💖" : "🤍"}
      </button>
    
    </div>
      </div>
    `;
    });
}

function deleteSong(id) {
    musicCatalog = musicCatalog.filter(song => song.id !== id);
    localStorage.setItem("musicCatalog", JSON.stringify(musicCatalog));
    displayMusic(musicCatalog);
}

function editSong(id) {
        const song = musicCatalog.find(song => song.id === id);

        document.getElementById("title").value = song.title;
        document.getElementById("artist").value = song.artist;
        document.getElementById("culture").value = song.culture;
        document.getElementById("mood").value = song.mood;
        document.getElementById("genre").value = song.genre;

        editId = id;
}

function searchMusic(query) {
    const filteredSongs = musicCatalog.filter(song => 
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase()) ||
        song.culture.toLowerCase().includes(query.toLowerCase()) ||
        song.mood.toLowerCase().includes(query.toLowerCase()) ||
        song.genre.toLowerCase().includes(query.toLowerCase())
    );
    displayMusic(filteredSongs);
}
document.getElementById("search").addEventListener("input", function(e) {
    searchMusic(e.target.value);
});

function showAllSongs() {
    displayMusic(musicCatalog);
}

function showFavorites() {
    if (favorites.length === 0) {
        catalog.innerHTML = "<p>No favorites yet!</p>";
        return;
    }
    displayMusic(favorites);
}

function toggleFavorite(id) {
    const song = musicCatalog.find(song => song.id === id);
    const exists = favorites.find(fav => fav.id === id);
    
    if (exists) {
        favorites = favorites.filter(fav => fav.id !== id);
    } else {
        favorites.push(song);
    }
    
    localStorage.setItem("favorites", JSON.stringify(favorites));

    displayMusic(musicCatalog);
}

function getCover() {
    const index = Math.floor(Math.random() * carCovers.length);
    return carCovers[index];
}

displayMusic(musicCatalog);

const form = document.getElementById("songForm");

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    let id;
 
    if (editId) {
        id = editId;
    } else {
        id = Date.now();
    }
    const mood = document.getElementById("mood").value;

    const updatedSong = {
        
        id,
        title: document.getElementById("title").value,
        artist: document.getElementById("artist").value,
        culture: document.getElementById("culture").value,
        mood: document.getElementById("mood").value,
        genre: document.getElementById("genre").value,
        cover: getCover()
    };

    if (editId) {
        musicCatalog = musicCatalog.map(song => song.id === editId ? updatedSong : song);
        editId = null;

    } else {
        const exists = musicCatalog.some(song =>
            song.title.toLowerCase() === updatedSong.title.toLowerCase() &&
            song.artist.toLowerCase() === updatedSong.artist.toLowerCase() &&
            song.culture.toLowerCase() === updatedSong.culture.toLowerCase() &&
            song.mood.toLowerCase() === updatedSong.mood.toLowerCase() &&
            song.genre.toLowerCase() === updatedSong.genre.toLowerCase()
        );
        if (exists && !editId) {
            alert("Song already exists!");
            return;
        }
        // something where the cards size changes with the ratio of the image, so that the image is not stretched or squished
        musicCatalog.push(updatedSong);
    }

    localStorage.setItem("musicCatalog", JSON.stringify(musicCatalog));

    displayMusic(musicCatalog);
    form.reset();
});
