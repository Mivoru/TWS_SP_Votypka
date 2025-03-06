from gtts import gTTS

# Texty pro generování audio souborů
texts = {
    "osm_explanation.mp3": "Metoda štěpení operátoru je numerická technika, která rozděluje složitou úlohu na dvě jednodušší části: transportní a reakční. Transportní část popisuje pohyb látky v prostředí, zatímco reakční část řeší chemické přeměny. Tato metoda umožňuje efektivnější výpočty, protože na každou část lze použít specializovanou numerickou metodu. Například pro transport se často používá metoda konečných diferencí a pro reakce metoda Runge-Kutta.",
    
    "fdm_explanation.mp3": "Metoda konečných diferencí nahrazuje derivace v diferenciálních rovnicích diskrétními rozdíly mezi body sítě. Pro výpočet hodnoty v dalším časovém kroku se používají sousední body mřížky. Tato metoda je běžně využívána v transportních modelech, kde umožňuje aproximovat časový a prostorový vývoj koncentrací rozpuštěných látek.",
    
    "fvm_explanation.mp3": "Metoda konečných objemů je založena na zákonu zachování hmoty. Celková změna veličiny uvnitř každé výpočetní buňky je dána tokem přes její hranice. Tato metoda je obzvláště užitečná v transportních modelech, protože zajišťuje numerickou stabilitu a zachování celkové hmotnosti látky v systému.",
    
    "transport_calculation.mp3": "Vezměme si jednoduchý transportní model popisující advekci látky v homogenním prostředí. Použijeme metodu konečných diferencí, kde rozdělením oblasti na síť o délce jednoho metru a časovým krokem 0,1 sekundy simulujeme postupné šíření látky. Výsledek ukazuje, jak se koncentrace vyvíjí v čase, přičemž vyšší rychlost proudění způsobuje rychlejší transport.",
    
    "reaction_calculation.mp3": "Uvažujme chemickou reakci rozpouštění kalcitu v přítomnosti oxidu uhličitého. Modelujeme ji soustavou diferenciálních rovnic, kde koncentrace vápníku, hydrogenuhličitanu a oxidu uhličitého v roztoku interagují podle kinetických a rovnovážných podmínek. Výpočet probíhá iterativně metodou Runge-Kutta, která umožňuje přesně simulovat změny koncentrací v čase."
}

# Generování a ukládání MP3 souborů
for filename, text in texts.items():
    tts = gTTS(text, lang="cs")
    tts.save(filename)
    print(f"Uloženo: {filename}")
