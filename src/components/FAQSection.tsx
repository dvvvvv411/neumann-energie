import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

const faqData = [
  {
    question: "Ist die Heizöl-Anlieferung bei Knauber klimaneutral?",
    answer: "Unsere Anlieferung ist nicht direkt klimaneutral, allerdings kompensieren wir den anfallenden CO₂-Ausstoß unserer mit Diesel angetriebenen Transporter, sodass Ihr Heizöl von Knauber dennoch CO₂-kompensiert bei Ihnen ankommt."
  },
  {
    question: "Wie setzt sich der Heizölpreis zusammen?",
    answer: "Rohöl ist ein börsennotiertes Produkt und wird global gehandelt. Es gibt verschiedene Einflussfaktoren: Globale Faktoren (Börsenkurs, Euro-Dollar-Kurs, Nachrichtenlage, Raffineriekapazitäten und Bestandsdaten) und Lokale Faktoren (Verfügbarkeit, Rheinfrachten, Logistikkosten, Rheinpegel, Steuern und Abgaben)."
  },
  {
    question: "Wie häufig ändert sich der Heizölpreis?",
    answer: "Der Heizölpreis ändert sich durch die Börsenentwicklung sehr regelmäßig und schnell. Wir aktualisieren werktags die Preise mehrfach täglich – abhängig von den tatsächlichen Marktgegebenheiten – u.a. der Börseneröffnung in den USA um 15 Uhr deutscher Zeit. Erste Preise werktags ab ca. 9 Uhr, um 12 Uhr ermitteln wir den Preis für unseren Heizölchart. In der Regel haben wir den aktuellen Onlinepreis rund um die Uhr abgebildet zu dem bestellt werden kann."
  },
  {
    question: "Welcher Heizölpreis gilt bei meiner Lieferung?",
    answer: "Der Preis zum Bestellzeitpunkt ist verbindlich. Der vereinbarte Preis gilt bis zur Lieferung – egal wie sich der Preis in der Zwischenzeit entwickelt. Wir berechnen weder mehr bei steigenden, noch weniger bei sinkenden Heizölpreisen. Bitte beachten: Beim Heizölkauf besteht das gesetzliche Widerrufsrecht für Verbraucherkunden nicht, weil auf Verträge über die Lieferung von Heizöl der Ausschlussgrund des § 312g Abs.2 Nr.8 BGB anwendbar ist."
  },
  {
    question: "Wann wird mein bestelltes Heizöl geliefert?",
    answer: "Die Lieferzeiten variieren je nach Auftragslage und Logistiksituation. Wir geben beim Bestellprozess immer eine Standardlieferzeit an und stellen transparent dar, in welchem Zeitrahmen wir liefern werden. Zudem gibt es die Möglichkeit der Expresslieferung innerhalb von 5 Werktagen und der 48-Std-Express Lieferung gegen Aufpreis. Übrigens: Ein Wunschliefertermin ist ohne Zusatzkosten möglich! Geben Sie bei Ihrer Bestellung einfach neben dem Datum auch das gewünschte Zeitfenster an."
  },
  {
    question: "Wie erfahre ich wann nun genau mein Heizöl geliefert wird?",
    answer: "Für den genauen Liefertermin rufen wir Sie einige Tage vorher an und stimmen Tag und Uhrzeit nochmal ab. Bitte beachten Sie, dass wir stets ein Zeitfenster von mehreren Stunden vereinbaren müssen, da genauere Vereinbarungen aufgrund der komplexen Logistik und Verkehrssituation nicht möglich sind. Gut zu wissen: Bei der Bestellung können Sie bereits einen Wunschliefertermin inklusive Zeitfenster vereinbaren – natürlich kostenfrei."
  },
  {
    question: "Was muss ich am Tag der Heizöllieferung beachten?",
    answer: "Unser Fahrer muss ungehindert Zugang zum Tankraum und Tank haben. Das Gesetz verlangt, dass unser Fahrer zudem eine Sichtkontrolle vornimmt. Dafür benötigt er Zugang zum Füllstutzen. Wichtig: Bitte schalten Sie die Heizung vor Lieferung aus und erst 1-2 Stunden nach Lieferung wieder an!"
  },
  {
    question: "Kann ich Standardheizöl mit Knauber Sparheizöl in einem Tank vermischen?",
    answer: "Das Mischen unserer Heizöle ist problemlos möglich, alle Sorten sind untereinander mischbar. Basis beider Heizölsorten ist die DIN 51603-1."
  }
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-muted/30">
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

          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <div key={index}>
                <AccordionItem 
                  value={`item-${index}`}
                  className="border-none py-2"
                >
                  <AccordionTrigger className="text-left font-semibold text-xl py-8 hover:no-underline text-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-8 text-lg">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
                {index < faqData.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export { FAQSection };