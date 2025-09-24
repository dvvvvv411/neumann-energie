import ralLogo from "@/assets/ral-logo.webp";

const QualitySection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - RAL Logo */}
          <div className="flex justify-center lg:justify-start">
            <img 
              src={ralLogo} 
              alt="RAL Gütezeichen für Energiehandel - Heizöl, Dieselkraftstoff, Biodiesel" 
              className="max-w-xl w-full h-auto"
            />
          </div>
          
          {/* Right side - Text content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-foreground">
              Qualität, der Sie vertrauen können
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-foreground">
                Als RAL-zertifizierter Betrieb stehen wir für höchste Standards in Qualität, Service und Zuverlässigkeit. 
                Seit über 25 Jahren vertrauen unsere Kunden auf unsere Expertise und unseren persönlichen Service. 
                Von der Bestellung bis zur Lieferung – bei uns sind Sie in besten Händen. Das RAL-Gütezeichen 
                bestätigt unsere konsequente Qualitätskontrolle und faire Geschäftspraktiken.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { QualitySection };