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
              Zertifizierte Qualität – mit dem RAL-Gütezeichen
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-foreground">
                Das RAL-Gütezeichen gilt als das Qualitätsprädikat für den sicheren Energie-Einkauf. 
                Es weist auf eine hochwertige Produktgüte, zuverlässige Liefermengen, qualifiziertes 
                Fachpersonal und regelmäßige Sicherheitschecks hin. Knauber trägt das RAL-Gütezeichen 
                schon seit vielen Jahren und ist als zuverlässiger Heizöl-Lieferant in der Region bekannt. 
                Auf unseren Kundenservice sind wir besonders stolz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { QualitySection };