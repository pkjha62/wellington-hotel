import PageHero from "@/components/PageHero";
import Header from "@/components/Header";

export default function BanquetLoading() {
  return (
    <>
      <Header settings={{ hotelName: "The Deoghar Grand", subtitle: "Hotel & Spa", phone: "", email: "", address: "", city: "", pincode: "", heroImage: "", heroVideo: "", heroHeadline: "", heroSubheadline: "", introTitle: "", introSubtitle: "", introBody: "", instagramHandle: "", facebookUrl: "", instagramUrl: "", twitterUrl: "", whatsappNumber: "", metaTitle: "", metaDescription: "", ogImage: "", roomsHeroImage: "", diningHeroImage: "", spaHeroImage: "", eventsHeroImage: "", contactHeroImage: "", galleryTitle: "", testimonialsTitle: "", experiencesTitle: "", offersTitle: "", newsletterTitle: "", newsletterDescription: "", mapLatitude: "", mapLongitude: "", locationDescription: "" }} />
      <div className="animate-pulse">
        <div className="h-[60vh] bg-stone-200" />
        <div className="mx-auto max-w-6xl px-4 py-20 space-y-8">
          <div className="h-6 w-48 rounded bg-stone-200 mx-auto" />
          <div className="h-10 w-80 rounded bg-stone-200 mx-auto" />
          <div className="h-4 w-full max-w-2xl rounded bg-stone-200 mx-auto" />
          <div className="h-4 w-3/4 max-w-2xl rounded bg-stone-200 mx-auto" />
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-20 space-y-16">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-8 lg:flex-row">
              <div className="h-80 w-full rounded-[28px] bg-stone-200 lg:w-1/2" />
              <div className="flex flex-col gap-4 lg:w-1/2">
                <div className="h-4 w-24 rounded bg-stone-200" />
                <div className="h-8 w-56 rounded bg-stone-200" />
                <div className="h-4 w-full rounded bg-stone-200" />
                <div className="h-4 w-4/5 rounded bg-stone-200" />
                <div className="h-4 w-3/4 rounded bg-stone-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
