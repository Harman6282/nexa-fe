import HeroSection from "@/components/landing-page/HeroSection";
import NewArrivals from "@/components/landing-page/NewArrivals";
import ShopCategories from "@/components/landing-page/ShopCategories";
import ClearanceBanner from "@/components/landing-page/ClearanceBanner";
import NewsletterSection from "@/components/landing-page/NewsletterSection";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1 bg-background-light">
        {/* Hero Section */}
        <HeroSection />

        {/* New Arrivals Section */}
        <NewArrivals />

        {/* Shop Categories Section */}
        <ShopCategories />

        {/* End of Season Clearance Banner */}
        <ClearanceBanner />

        {/* Newsletter Section */}
        <NewsletterSection />
      </main>
    </div>
  );
}
