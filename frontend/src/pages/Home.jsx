import HeroVideo from '../components/HeroVideo'
import UpcomingTrips from '../components/UpcomingTrips'
import ExploreDestinations from '../components/ExploreDestinations'
import BannerSlider from '../components/BannerSlider'
import CertificateLegal from '../components/CertificateLegal'
import VibeWithUs from '../components/VibeWithUs'
import Reviews from '../components/Reviews'
import WrittenReviews from '../components/WrittenReviews'
import FAQ from '../components/FAQ'
import ContactUs from '../components/ContactUs'
import SEO from '../components/SEO'
import { getOrganizationSchema, getWebsiteSchema } from '../utils/structuredData'

function Home() {
  const structuredData = [
    getOrganizationSchema(),
    getWebsiteSchema()
  ];

  return (
    <>
      <SEO
        title="Safe Hands Travels - Your Trusted Travel Partner | VaranasiHub"
        description="Discover amazing travel experiences with Safe Hands Travels. Explore destinations across India, book adventure trips, spiritual journeys, Himalayan escapes, beach breaks, and wellness retreats. Your trusted travel partner for group tours, custom itineraries, and 24/7 support."
        keywords="travel, trips, destinations, adventure, tourism, India travel, travel agency, Varanasi travel, spiritual trips, Himalayan escapes, beach trips, wellness retreats, group travel, custom itineraries, safe hands travels"
        url="/"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">
        <HeroVideo />
        <UpcomingTrips />
        <ExploreDestinations />
        <BannerSlider />
        <CertificateLegal />
        <VibeWithUs />
        <Reviews />
        <WrittenReviews />
        <FAQ />
        <ContactUs />
      </div>
    </>
  )
}

export default Home

