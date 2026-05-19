const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./src/models/Book');

dotenv.config();

const books = [
  // Academic
  {
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60',
    price: 85.00,
    category: 'Academic',
    status: 'Available',
    summary: 'The definitive college-level textbook on data structures and algorithms, used worldwide.'
  },
  {
    title: 'Concepts of Physics',
    author: 'H.C. Verma',
    coverImage: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?w=500&auto=format&fit=crop&q=60',
    price: 24.50,
    category: 'Academic',
    status: 'Available',
    summary: 'An iconic, foundational guide detailing general laws of physics and conceptual questions.'
  },
  {
    title: 'Organic Chemistry',
    author: 'Jonathan Clayden',
    coverImage: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=500&auto=format&fit=crop&q=60',
    price: 65.00,
    category: 'Academic',
    status: 'Available',
    summary: 'A first-class textbook on chemical compounds, synthesis, and reaction mechanisms.'
  },
  {
    title: 'Principles of Economics',
    author: 'N. Gregory Mankiw',
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60',
    price: 55.00,
    category: 'Academic',
    status: 'Available',
    summary: 'An accessible, standard introductory reference explaining micro and macroeconomics.'
  },
  {
    title: 'Calculus: Early Transcendentals',
    author: 'James Stewart',
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format&fit=crop&q=60',
    price: 79.99,
    category: 'Academic',
    status: 'Available',
    summary: 'A standard textbook mapping mathematical calculus, functions, derivatives, and integral theory.'
  },

  // Mythological
  {
    title: 'The Palace of Illusions',
    author: 'Chitra Banerjee Divakaruni',
    coverImage: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500&auto=format&fit=crop&q=60',
    price: 14.99,
    category: 'Mythological',
    status: 'Available',
    summary: 'A reimagining of the world-famous Indian epic Mahabharata, told from the perspective of Panchaali.'
  },
  {
    title: 'Mythos',
    author: 'Stephen Fry',
    coverImage: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=500&auto=format&fit=crop&q=60',
    price: 16.50,
    category: 'Mythological',
    status: 'Available',
    summary: 'A vivid, witty, and modern retelling of ancient Greek legends and heroes.'
  },
  {
    title: 'The Shiva Trilogy',
    author: 'Amish Tripathi',
    coverImage: 'https://images.unsplash.com/photo-1550399105-c4dbb6779758?w=500&auto=format&fit=crop&q=60',
    price: 19.99,
    category: 'Mythological',
    status: 'Available',
    summary: 'An action-filled modern mythology novel following the journey of Shiva in ancient Meluha.'
  },
  {
    title: 'Norse Mythology',
    author: 'Neil Gaiman',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=60',
    price: 12.99,
    category: 'Mythological',
    status: 'Available',
    summary: 'Gaiman’s personal, narrative rendition of the ancient gods: Odin, Thor, Loki, and their adventures.'
  },
  {
    title: 'Percy Jackson & The Lightning Thief',
    author: 'Rick Riordan',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=60',
    price: 8.99,
    category: 'Mythological',
    status: 'Available',
    summary: 'A modern fantasy where a boy discovers he is the son of Poseidon and must solve a war among Greek gods.'
  },

  // Motivational
  {
    title: 'The Power of Habit',
    author: 'Charles Duhigg',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60',
    price: 15.99,
    category: 'Motivational',
    status: 'Available',
    summary: 'Explains the science behind habit formation and how changing behaviors yields personal success.'
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    coverImage: 'https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?w=500&auto=format&fit=crop&q=60',
    price: 18.00,
    category: 'Motivational',
    status: 'Available',
    summary: 'A step-by-step framework to build good habits, break bad ones, and achieve massive improvements.'
  },
  {
    title: 'Think and Grow Rich',
    author: 'Napoleon Hill',
    coverImage: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=500&auto=format&fit=crop&q=60',
    price: 9.99,
    category: 'Motivational',
    status: 'Available',
    summary: 'A classic handbook outlining laws of success, based on studying self-made millionaires.'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    coverImage: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=500&auto=format&fit=crop&q=60',
    price: 11.99,
    category: 'Motivational',
    status: 'Available',
    summary: 'An inspiring allegorical story of a young shepherd following his personal legend across Egypt.'
  },
  {
    title: 'Can\'t Hurt Me',
    author: 'David Goggins',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&auto=format&fit=crop&q=60',
    price: 16.99,
    category: 'Motivational',
    status: 'Available',
    summary: 'A powerful life narrative detailing how mental toughness helps overcome life\'s hardest trials.'
  },

  // Biographies
  {
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    coverImage: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60',
    price: 24.99,
    category: 'Biographies',
    status: 'Available',
    summary: 'The definitive biography of the Apple co-founder, based on hundreds of interviews.'
  },
  {
    title: 'Becoming',
    author: 'Michelle Obama',
    coverImage: 'https://images.unsplash.com/photo-1518375475825-783515f4e55e?w=500&auto=format&fit=crop&q=60',
    price: 18.00,
    category: 'Biographies',
    status: 'Available',
    summary: 'An intimate, powerful, and inspiring memoir by the former First Lady of the United States.'
  },
  {
    title: 'The Diary of a Young Girl',
    author: 'Anne Frank',
    coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&auto=format&fit=crop&q=60',
    price: 8.99,
    category: 'Biographies',
    status: 'Available',
    summary: 'The poignant journal kept by a young Jewish girl during the Nazi occupation of the Netherlands.'
  },
  {
    title: 'Leonardo da Vinci',
    author: 'Walter Isaacson',
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=500&auto=format&fit=crop&q=60',
    price: 20.00,
    category: 'Biographies',
    status: 'Available',
    summary: 'A biography that brings the creative genius and polymath Leonardo da Vinci to life.'
  },
  {
    title: 'Alexander Hamilton',
    author: 'Ron Chernow',
    coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&auto=format&fit=crop&q=60',
    price: 19.50,
    category: 'Biographies',
    status: 'Available',
    summary: 'The monumental biography that inspired the hit Broadway musical about America\'s founding father.'
  },

  // Fiction
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=60',
    price: 14.99,
    category: 'Fiction',
    status: 'Available',
    summary: 'A classic story of wealth, love, and tragedy in the Jazz Age on Long Island.'
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60',
    price: 12.99,
    category: 'Fiction',
    status: 'Available',
    summary: 'A deeply moving story about racial injustice and the destruction of innocence in the American South.'
  },
  {
    title: '1984',
    author: 'George Orwell',
    coverImage: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=500&auto=format&fit=crop&q=60',
    price: 9.99,
    category: 'Fiction',
    status: 'Available',
    summary: 'A dystopian masterpiece that explores the dangers of totalitarianism, surveillance, and state control.'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=60',
    price: 15.99,
    category: 'Fiction',
    status: 'Available',
    summary: 'The prelude to the Lord of the Rings, following Bilbo Baggins on an epic adventure to reclaim a treasure.'
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    coverImage: 'https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?w=500&auto=format&fit=crop&q=60',
    price: 11.50,
    category: 'Fiction',
    status: 'Available',
    summary: 'A chilling vision of a futuristic society controlled by technology, conditioning, and pleasure.'
  },

  // Art & Design
  {
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    coverImage: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500&auto=format&fit=crop&q=60',
    price: 17.99,
    category: 'Art & Design',
    status: 'Available',
    summary: 'A bible on user experience design, cognitive psychology, and building usable products.'
  },
  {
    title: 'Steal Like an Artist',
    author: 'Austin Kleon',
    coverImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&auto=format&fit=crop&q=60',
    price: 10.99,
    category: 'Art & Design',
    status: 'Available',
    summary: 'A short, illustrated manual on unlocking creativity and building artistic work.'
  },
  {
    title: 'Interaction Design',
    author: 'Jenny Preece',
    coverImage: 'https://images.unsplash.com/photo-1550136513-548af444a718?w=500&auto=format&fit=crop&q=60',
    price: 52.00,
    category: 'Art & Design',
    status: 'Available',
    summary: 'A complete textbook covering human-computer interaction principles and design cycles.'
  },
  {
    title: 'The Elements of Typographic Style',
    author: 'Robert Bringhurst',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=60',
    price: 29.99,
    category: 'Art & Design',
    status: 'Available',
    summary: 'The classic guidebook on fine printing, font pairing, and modern typography layout.'
  },
  {
    title: 'Grid Systems in Graphic Design',
    author: 'Josef Müller-Brockmann',
    coverImage: 'https://images.unsplash.com/photo-1561070791-26c113006238?w=500&auto=format&fit=crop&q=60',
    price: 45.00,
    category: 'Art & Design',
    status: 'Available',
    summary: 'The absolute standard manual mapping out grid logic, layout, and visual communication architecture.'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing books
    await Book.deleteMany({});
    console.log('Cleared old books...');

    // Insert new books
    await Book.insertMany(books);
    console.log('Successfully seeded 30 books across 6 custom frontend categories!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1);
  }
};

seedDB();
