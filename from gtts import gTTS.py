from gtts import gTTS

# Texty pro generování audio souborů
texts = { 
    "fdm_explanation.mp3": "Metoda konečných diferencí nahrazuje derivace v diferenciálních rovnicích diskrétními rozdíly mezi body sítě. Pro výpočet hodnoty v dalším časovém kroku se používají sousední body mřížky. Tato metoda je běžně využívána v transportních modelech, kde umožňuje aproximovat časový a prostorový vývoj koncentrací rozpuštěných látek.",   
}

# Generování a ukládání MP3 souborů
for filename, text in texts.items():
    tts = gTTS(text, lang="cs")
    tts.save(filename)
    print(f"Uloženo: {filename}")
