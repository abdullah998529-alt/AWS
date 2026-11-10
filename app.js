// ══════════════════════════════════════════
//  SocialVibe – app.js
// ══════════════════════════════════════════

// ── Sample Data ─────────────────────────
const USERS = [
  { id: 1,  name: "Emma Rivera",   avatar: "https://i.pravatar.cc/45?img=5",  bio: "Sunrise chaser 🌅" },
  { id: 2,  name: "James Okafor",  avatar: "https://i.pravatar.cc/45?img=11", bio: "Wildlife photographer 🦁" },
  { id: 3,  name: "Sofia Patel",   avatar: "https://i.pravatar.cc/45?img=47", bio: "Eco activist 🌍" },
  { id: 4,  name: "Lucas Chen",    avatar: "https://i.pravatar.cc/45?img=33", bio: "Hiker & Explorer 🏔️" },
  { id: 5,  name: "Mia Thompson",  avatar: "https://i.pravatar.cc/45?img=49", bio: "Forest bathing enthusiast 🌲" },
];

const SUGGESTIONS = [
  { name: "Noah Walker",  avatar: "https://i.pravatar.cc/45?img=14", mutual: "12 mutual friends" },
  { name: "Lily Zhang",   avatar: "https://i.pravatar.cc/45?img=25", mutual: "8 mutual friends" },
  { name: "Omar Hassan",  avatar: "https://i.pravatar.cc/45?img=58", mutual: "5 mutual friends" },
  { name: "Anna Brown",   avatar: "https://i.pravatar.cc/45?img=44", mutual: "15 mutual friends" },
];

const GALLERY_IMGS = [
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=200",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200",
  "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=200",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200",
  "https://images.unsplash.com/photo-1467533003447-e295ff1b0435?w=200",
  "https://images.unsplash.com/photo-1543966888-7c1dc482a810?w=200",
];

const SEED_POSTS = [
  {
    id: 1,
    user: USERS[0],
    text: "Golden hour never disappoints 🌅 Caught this stunning view after a 6-hour hike. Worth every step! #NaturePhotography #GoldenHour",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800",
    time: "2 hours ago",
    likes: 142,
    liked: false,
    shares: 18,
    comments: [
      { author: "Lucas Chen", avatar: "https://i.pravatar.cc/36?img=33", text: "This is absolutely breathtaking! Where was this taken?", time: "1h ago" },
      { author: "Sofia Patel", avatar: "https://i.pravatar.cc/36?img=47", text: "Nature's canvas is unmatched 🎨 Love this shot!", time: "45m ago" },
    ]
  },
  {
    id: 2,
    user: USERS[1],
    text: "Early morning safari – this majestic lion showed up just as the sun was rising 🦁🌄 Sometimes patience is the best camera setting. #Wildlife #Safari",
    image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800",
    time: "4 hours ago",
    likes: 289,
    liked: false,
    shares: 54,
    comments: [
      { author: "Emma Rivera", avatar: "https://i.pravatar.cc/36?img=5", text: "Incredible! You're so brave! 😮", time: "3h ago" },
      { author: "Mia Thompson", avatar: "https://i.pravatar.cc/36?img=49", text: "This made my day! What a gorgeous creature 🦁", time: "2h ago" },
    ]
  },
  {
    id: 3,
    user: USERS[2],
    text: "The Amazon is not just a jungle — it's the lungs of our planet 🌿💚 Let's protect it together. Every small action counts! #GreenEarth #EcoActivism",
    image: "https://images.unsplash.com/photo-1536147116438-62679a5e01f2?w=800",
    time: "6 hours ago",
    likes: 376,
    liked: false,
    shares: 97,
    comments: [
      { author: "James Okafor", avatar: "https://i.pravatar.cc/36?img=11", text: "Thank you for raising awareness, Sofia 💚", time: "5h ago" },
    ]
  },
  {
    id: 4,
    user: USERS[3],
    text: "Summit reached! 🏔️ 4,200m above sea level and the view is simply unreal. This is why I hike. #Mountains #HikingLife #TravelDiaries",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    time: "Yesterday",
    likes: 211,
    liked: false,
    shares: 32,
    comments: [
      { author: "Emma Rivera", avatar: "https://i.pravatar.cc/36?img=5", text: "Goals! 🙌 Adding this to my bucket list right now!", time: "23h ago" },
      { author: "Sofia Patel", avatar: "https://i.pravatar.cc/36?img=47", text: "Wow! Just wow. The perspective is amazing!", time: "20h ago" },
      { author: "Mia Thompson", avatar: "https://i.pravatar.cc/36?img=49", text: "You make it look so easy Lucas 😄", time: "18h ago" },
    ]
  },
  {
    id: 5,
    user: USERS[4],
    text: "Forest bathing this weekend was exactly what my soul needed 🌲✨ The sound of leaves, the smell of earth... pure therapy. Try it! #ForestBathing #Mindfulness",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800",
    time: "2 days ago",
    likes: 165,
    liked: false,
    shares: 23,
    comments: [
      { author: "Lucas Chen", avatar: "https://i.pravatar.cc/36?img=33", text: "This looks so peaceful! 🌿", time: "2d ago" },
    ]
  }
];

// ── State ───────────────────────────────
let posts = JSON.parse(JSON.stringify(SEED_POSTS)); // deep clone
let postIdCounter = posts.length + 1;
let selectedImage = null;

// ── DOM References ───────────────────────
const postsContainer = document.getElementById('postsContainer');
const postText       = document.getElementById('postText');
const postBtn        = document.getElementById('postBtn');
const imgUpload      = document.getElementById('imgUpload');
const imgPreview     = document.getElementById('imgPreview');
const imgPreviewContainer = document.getElementById('imgPreviewContainer');
const removeImg      = document.getElementById('removeImg');
const lightbox       = document.getElementById('lightbox');
const lightboxImg    = document.getElementById('lightboxImg');
const lightboxClose  = document.getElementById('lightboxClose');
const suggestionsEl  = document.getElementById('suggestions');
const miniGalleryEl  = document.getElementById('miniGallery');
const searchInput    = document.getElementById('searchInput');

// ── Init ─────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderAllPosts();
  renderSuggestions();
  renderMiniGallery();
});

// ── Render Functions ─────────────────────

function renderAllPosts() {
  postsContainer.innerHTML = '';
  posts.forEach(p => postsContainer.appendChild(createPostCard(p)));
}

function createPostCard(post) {
  const card = document.createElement('div');
  card.className = 'post-card';
  card.dataset.id = post.id;

  card.innerHTML = `
    <div class="post-header">
      <img src="${post.user.avatar}" alt="${post.user.name}" class="post-avatar"/>
      <div class="post-user-info">
        <h4>${post.user.name}</h4>
        <span class="post-meta"><i class="fa-solid fa-clock"></i> ${post.time} &nbsp;•&nbsp; <i class="fa-solid fa-earth-americas"></i> Public</span>
      </div>
      <i class="fa-solid fa-ellipsis post-options"></i>
    </div>

    <div class="post-content">
      <p class="post-text">${post.text}</p>
      ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image" data-src="${post.image}"/>` : ''}
    </div>

    <div class="post-stats">
      <span><i class="fa-solid fa-heart" style="color:#c53030"></i> ${post.likes} Likes</span>
      <span>${post.comments.length} Comments &nbsp;·&nbsp; ${post.shares} Shares</span>
    </div>

    <div class="post-actions">
      <button class="post-action-btn like-btn ${post.liked ? 'liked' : ''}" data-id="${post.id}">
        <i class="fa-${post.liked ? 'solid' : 'regular'} fa-heart"></i> Like
      </button>
      <button class="post-action-btn comment-toggle-btn" data-id="${post.id}">
        <i class="fa-regular fa-comment"></i> Comment
      </button>
      <button class="post-action-btn share-btn" data-id="${post.id}">
        <i class="fa-solid fa-share-nodes"></i> Share
      </button>
    </div>

    <div class="comments-section hidden" id="comments-${post.id}">
      <div class="comments-list" id="comments-list-${post.id}">
        ${post.comments.map(c => createCommentHTML(c)).join('')}
      </div>
      <div class="comment-input-area">
        <img src="https://i.pravatar.cc/36?img=12" alt="Me" class="comment-avatar"/>
        <input type="text" class="comment-input" placeholder="Write a comment…" id="comment-input-${post.id}"/>
        <button class="btn-send-comment" data-id="${post.id}"><i class="fa-solid fa-paper-plane"></i></button>
      </div>
    </div>
  `;

  // Like
  card.querySelector('.like-btn').addEventListener('click', () => toggleLike(post.id, card));

  // Comment toggle
  card.querySelector('.comment-toggle-btn').addEventListener('click', () => {
    const section = card.querySelector(`#comments-${post.id}`);
    section.classList.toggle('hidden');
    if (!section.classList.contains('hidden')) {
      card.querySelector(`#comment-input-${post.id}`).focus();
    }
  });

  // Send comment
  card.querySelector('.btn-send-comment').addEventListener('click', () => {
    addComment(post.id, card);
  });

  // Comment on Enter key
  const ci = card.querySelector(`#comment-input-${post.id}`);
  ci.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addComment(post.id, card);
  });

  // Share
  card.querySelector('.share-btn').addEventListener('click', () => {
    const p = posts.find(x => x.id === post.id);
    p.shares++;
    card.querySelector('.post-stats').querySelector('span:last-child').textContent =
      `${p.comments.length} Comments · ${p.shares} Shares`;
    showToast('Post shared successfully! 🔗');
  });

  // Image lightbox
  if (post.image) {
    card.querySelector('.post-image').addEventListener('click', (e) => {
      openLightbox(e.target.dataset.src);
    });
  }

  return card;
}

function createCommentHTML(c) {
  return `
    <div class="comment">
      <img src="${c.avatar}" alt="${c.author}" class="comment-avatar"/>
      <div class="comment-content">
        <div class="comment-author">${c.author}</div>
        <div class="comment-text">${c.text}</div>
        <div class="comment-time">${c.time}</div>
      </div>
    </div>
  `;
}

// ── Like Logic ───────────────────────────
function toggleLike(id, card) {
  const post = posts.find(p => p.id === id);
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;

  const btn = card.querySelector('.like-btn');
  btn.classList.toggle('liked', post.liked);
  btn.querySelector('i').className = `fa-${post.liked ? 'solid' : 'regular'} fa-heart`;

  const statsSpan = card.querySelector('.post-stats span:first-child');
  statsSpan.innerHTML = `<i class="fa-solid fa-heart" style="color:#c53030"></i> ${post.likes} Likes`;
}

// ── Add Comment ──────────────────────────
function addComment(id, card) {
  const input = card.querySelector(`#comment-input-${id}`);
  const text  = input.value.trim();
  if (!text) return;

  const newComment = {
    author: "Alex Green",
    avatar: "https://i.pravatar.cc/36?img=12",
    text,
    time: "just now"
  };

  const post = posts.find(p => p.id === id);
  post.comments.push(newComment);

  const list = card.querySelector(`#comments-list-${id}`);
  const div  = document.createElement('div');
  div.innerHTML = createCommentHTML(newComment);
  div.firstElementChild.style.animation = 'fadeIn 0.3s ease';
  list.appendChild(div.firstElementChild);

  input.value = '';

  // Update comment count
  const statsSpan = card.querySelector('.post-stats span:last-child');
  const p = posts.find(x => x.id === id);
  statsSpan.textContent = `${p.comments.length} Comments · ${p.shares} Shares`;

  list.scrollTop = list.scrollHeight;
}

// ── Create New Post ──────────────────────
postBtn.addEventListener('click', () => {
  const text  = postText.value.trim();
  const image = selectedImage;

  if (!text && !image) {
    showToast('Please write something or add an image! ✍️', 'error');
    return;
  }

  const newPost = {
    id: postIdCounter++,
    user: { id: 0, name: "Alex Green", avatar: "https://i.pravatar.cc/45?img=12", bio: "" },
    text,
    image,
    time: "Just now",
    likes: 0,
    liked: false,
    shares: 0,
    comments: []
  };

  posts.unshift(newPost);
  const card = createPostCard(newPost);
  postsContainer.prepend(card);

  // Reset
  postText.value = '';
  selectedImage  = null;
  imgPreviewContainer.style.display = 'none';
  imgPreview.src = '';
  imgUpload.value = '';

  showToast('Post shared successfully! 🎉');
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// ── Image Upload ─────────────────────────
imgUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (ev) => {
    selectedImage = ev.target.result;
    imgPreview.src = selectedImage;
    imgPreviewContainer.style.display = 'block';
  };
  reader.readAsDataURL(file);
});

removeImg.addEventListener('click', () => {
  selectedImage  = null;
  imgPreview.src = '';
  imgPreviewContainer.style.display = 'none';
  imgUpload.value = '';
});

// ── Lightbox ─────────────────────────────
function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => { lightboxImg.src = ''; }, 300);
}

// ── Search ───────────────────────────────
let searchTimeout;
searchInput.addEventListener('input', () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      renderAllPosts();
      return;
    }
    const filtered = posts.filter(p =>
      p.text.toLowerCase().includes(query) ||
      p.user.name.toLowerCase().includes(query)
    );
    postsContainer.innerHTML = '';
    if (filtered.length === 0) {
      postsContainer.innerHTML = `
        <div class="card" style="text-align:center;color:#a0aec0;padding:3rem;">
          <i class="fa-solid fa-magnifying-glass" style="font-size:3rem;margin-bottom:1rem;display:block;"></i>
          No results for "<strong>${query}</strong>"
        </div>`;
    } else {
      filtered.forEach(p => postsContainer.appendChild(createPostCard(p)));
    }
  }, 300);
});

// ── Suggestions ──────────────────────────
function renderSuggestions() {
  suggestionsEl.innerHTML = '';
  SUGGESTIONS.forEach(s => {
    const div = document.createElement('div');
    div.className = 'suggestion-item';
    div.innerHTML = `
      <img src="${s.avatar}" alt="${s.name}" class="suggestion-avatar"/>
      <div class="suggestion-info">
        <h5>${s.name}</h5>
        <small>${s.mutual}</small>
      </div>
      <button class="btn-follow" onclick="followUser(this)">Follow</button>
    `;
    suggestionsEl.appendChild(div);
  });
}

function followUser(btn) {
  if (btn.textContent === 'Follow') {
    btn.textContent = 'Following';
    btn.style.background = '#c53030';
    showToast('You are now following ' + btn.closest('.suggestion-item').querySelector('h5').textContent + '! 🎉');
  } else {
    btn.textContent = 'Follow';
    btn.style.background = '';
  }
}

// ── Mini Gallery ─────────────────────────
function renderMiniGallery() {
  miniGalleryEl.innerHTML = '';
  GALLERY_IMGS.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Gallery photo';
    img.addEventListener('click', () => openLightbox(src));
    miniGalleryEl.appendChild(img);
  });
}

// ── Toast Notification ───────────────────
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    padding: 1rem 1.5rem;
    background: ${type === 'error' ? '#c53030' : '#38a169'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    font-weight: 600;
    z-index: 9999;
    animation: slideIn 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    max-width: 350px;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ── Extra CSS for Toast Animation ────────
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to   { transform: translateX(0); opacity: 1; }
  }
  @keyframes fadeOut {
    from { opacity: 1; }
    to   { opacity: 0; transform: translateY(10px); }
  }
`;
document.head.appendChild(style);
