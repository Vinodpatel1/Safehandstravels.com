import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Certificate from '../models/Certificate.js';
import Destination from '../models/Destination.js';
import Review from '../models/Review.js';
import WrittenReview from '../models/WrittenReview.js';
import Trip from '../models/Trip.js';
import { initializeDatabase } from '../config/database.js';

// Load .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '..', '.env') });

// Image URLs mapping
const imageUpdates = {
  certificates: {
    'ISO 9001:2015 Quality Management': {
      images: ['https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80']
    },
    'Travel Agent License - IATA': {
      images: ['https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80']
    },
    'Ministry of Tourism Recognition': {
      images: ['https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80']
    },
    'TripAdvisor Certificate of Excellence': {
      images: ['https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80']
    },
    'GST Registration Certificate': {
      images: ['https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80']
    }
  },
  destinations: {
    'Varanasi': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=80',
    'Sarnath': 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=1200&q=80',
    'Allahabad': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    'Ayodhya': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=80',
    'Chitrakoot': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80'
  },
  reviews: {
    'Rajesh Kumar': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    'Priya Sharma': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    'Amit Patel': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    'Sneha Verma': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
    'Vikram Singh': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
  },
  writtenReviews: {
    'Meera Joshi': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    'Anil Desai': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    'Kavita Reddy': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    'Rohit Malhotra': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    'Divya Nair': 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80'
  },
  trips: {
    'Varanasi Spiritual Journey': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=80',
    'Golden Triangle with Varanasi': 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80',
    'Varanasi and Sarnath Day Trip': 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=1200&q=80',
    'Varanasi Heritage Walk': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    'Varanasi Photography Tour': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80'
  }
};

async function updateTestDataImages() {
  try {
    console.log('🔄 Initializing database...');
    await initializeDatabase();
    console.log('✅ Database initialized\n');

    // Update Certificates
    console.log('📜 Updating certificates with images...');
    const certificates = await Certificate.findAll({ includeDraft: true });
    for (const cert of certificates) {
      if (imageUpdates.certificates[cert.title]) {
        try {
          await Certificate.update(cert.id, imageUpdates.certificates[cert.title]);
          console.log(`✅ Updated certificate: ${cert.title}`);
        } catch (error) {
          console.error(`❌ Error updating certificate ${cert.title}:`, error.message);
        }
      }
    }

    // Update Destinations
    console.log('\n🌍 Updating destinations with images...');
    const destinations = await Destination.findAll({ includeDraft: true });
    for (const dest of destinations) {
      if (imageUpdates.destinations[dest.name]) {
        try {
          await Destination.update(dest.id, { image: imageUpdates.destinations[dest.name] });
          console.log(`✅ Updated destination: ${dest.name}`);
        } catch (error) {
          console.error(`❌ Error updating destination ${dest.name}:`, error.message);
        }
      }
    }

    // Update Reviews
    console.log('\n⭐ Updating reviews with avatars...');
    const reviews = await Review.findAll({ includeDraft: true });
    for (const review of reviews) {
      if (imageUpdates.reviews[review.name]) {
        try {
          await Review.update(review.id, { avatar: imageUpdates.reviews[review.name] });
          console.log(`✅ Updated review: ${review.name}`);
        } catch (error) {
          console.error(`❌ Error updating review ${review.name}:`, error.message);
        }
      }
    }

    // Update Written Reviews
    console.log('\n✍️  Updating written reviews with avatars...');
    const writtenReviews = await WrittenReview.findAll({ includeDraft: true });
    for (const wr of writtenReviews) {
      if (imageUpdates.writtenReviews[wr.name]) {
        try {
          await WrittenReview.update(wr.id, { avatar: imageUpdates.writtenReviews[wr.name] });
          console.log(`✅ Updated written review: ${wr.name}`);
        } catch (error) {
          console.error(`❌ Error updating written review ${wr.name}:`, error.message);
        }
      }
    }

    // Update Trips
    console.log('\n🎒 Updating trips with images...');
    const trips = await Trip.findAll({ includeDraft: true });
    for (const trip of trips) {
      if (imageUpdates.trips[trip.title]) {
        try {
          await Trip.update(trip.id, { imageUrl: imageUpdates.trips[trip.title] });
          console.log(`✅ Updated trip: ${trip.title}`);
        } catch (error) {
          console.error(`❌ Error updating trip ${trip.title}:`, error.message);
        }
      }
    }

    console.log('\n✨ Image update completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

updateTestDataImages();

