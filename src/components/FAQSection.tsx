import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "Wie schnell können Sie liefern?",
    answer: "In der Regel liefern wir innerhalb von 3-5 Werktagen. Bei Bedarf bieten wir auch Express-Lieferungen innerhalb von 48 Stunden an. Einen Wunschtermin können Sie kostenlos bei der Bestellung angeben."
  },
  {
    question: "Wie setzen sich Ihre Preise zusammen?",
    answer: "Unsere Preise orientieren sich am aktuellen Marktpreis für Heizöl. Der Preis zum Zeitpunkt Ihrer Bestellung ist verbindlich und bleibt bis zur Lieferung garantiert – unabhängig von Marktschwankungen."
  },
  {
    question: "Bieten Sie CO₂-kompensiertes Heizöl an?",
    answer: "Ja, auf Wunsch liefern wir Ihr Heizöl CO₂-kompensiert. Wir gleichen den CO₂-Ausstoß durch zertifizierte Klimaschutzprojekte aus, sodass Sie klimaneutral heizen können."
  },
  {
    question: "Was muss ich bei der Lieferung beachten?",
    answer: "Unser Fahrer benötigt freien Zugang zum Tankraum und Füllstutzen. Schalten Sie bitte die Heizung vor der Lieferung aus und erst 1-2 Stunden nach der Befüllung wieder an."
  },
  {
    question: "Kann ich verschiedene Heizölsorten mischen?",
    answer: "Ja, alle unsere Heizölsorten sind untereinander mischbar, da sie der DIN-Norm 51603-1 entsprechen. Sie können problemlos nachbestellen, auch wenn noch Rest-Heizöl im Tank ist."
  },
  {
    question: "Wie erfahre ich den genauen Liefertermin?",
    answer: "Wir rufen Sie einige Tage vor der Lieferung an und vereinbaren gemeinsam einen passenden Termin. Dabei planen wir ein Zeitfenster von wenigen Stunden ein."
  },
  {
    question: "Welche Zahlungsmöglichkeiten gibt es?",
    answer: "Sie können bequem per Rechnung, Lastschrift oder Kreditkarte bezahlen. Bei Privatkunden ist auch eine Barzahlung bei Lieferung möglich."
  },
  {
    question: "Sind Sie RAL-zertifiziert?",
    answer: "Ja, wir tragen das RAL-Gütezeichen und unterliegen regelmäßigen Qualitätskontrollen. Das garantiert Ihnen höchste Standards bei Produktqualität, Liefermengen und Service."
  }
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              FAQs zu Heizöl
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Häufig gestellte Fragen rund um Heizöl, Preise und Lieferung – 
              hier finden Sie alle wichtigen Antworten auf einen Blick.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-6">
            {faqData.map((faq, index) => (
              <AccordionItem 
                key={index}
                value={`item-${index}`}
                className="border-none transition-all duration-300 hover:bg-background hover:border hover:border-border hover:rounded-3xl hover:px-8 hover:py-4 data-[state=open]:bg-background data-[state=open]:border data-[state=open]:border-border data-[state=open]:rounded-3xl data-[state=open]:px-8 data-[state=open]:py-4"
              >
                <AccordionTrigger className="text-left font-bold text-2xl py-8 hover:no-underline text-foreground [&>svg]:h-6 [&>svg]:w-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-8 text-xl">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export { FAQSection };