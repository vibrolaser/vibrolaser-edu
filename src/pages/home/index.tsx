import {
  Header,
  Hero,
  ServiceCards,
  Advantages,
  ContactForm,
  Reviews,
  Footer,
} from "@/widgets";

export const HomePage = () => {
  return (
    <>
      <Header />
      <main id="main-content" role="main">
        <section 
          id="hero" 
          aria-labelledby="hero-heading"
          className="hero-section"
        >
          <Hero />
        </section>
        
        <section 
          id="service-cards" 
          aria-labelledby="service-cards-heading"
          className="service-cards-section"
        >
          <ServiceCards />
        </section>
        
        <section 
          id="advantages" 
          aria-labelledby="advantages-heading"
          className="advantages-section"
        >
          <Advantages />
        </section>
        
        <section 
          id="contact" 
          aria-labelledby="contact-heading"
          className="contact-section"
        >
          <ContactForm />
        </section>
        
        <section 
          id="reviews" 
          aria-labelledby="reviews-heading"
          className="reviews-section"
        >
          <Reviews />
        </section>
      </main>
      <Footer />
    </>
  );
};
