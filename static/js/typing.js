class TypingTutor {
    constructor() {
      this.textDisplay = document.getElementById("text-display");
      this.typingInput = document.getElementById("typing-input");
      this.languageSelect = document.getElementById("languageSelect");
      this.wpmDisplay = document.getElementById("wpm");
      this.accuracyDisplay = document.getElementById("accuracy");
      this.keystrokesDisplay = document.getElementById("keystrokes");
      this.correctDisplay = document.getElementById("correct");
      this.incorrectDisplay = document.getElementById("incorrect");
  
      this.currentText = "";
      this.startTime = null;
      this.errors = 0;
      this.currentIndex = 0;
      this.keystrokes = 0;
      this.correctChars = 0;
      this.incorrectChars = 0;
      this.keyboard = new KeyboardDisplay();
  
      this.lessons = {
        english: [
          {
            level: 1,
            texts: [
              "I like cats.",
              "She eats apples.",
              "Birds can fly.",
              "The sun is bright.",
              "Dogs love to play.",
              "It is raining today.",
              "We go to school.",
              "The baby is sleeping.",
              "She has a red ball.",
              "They run very fast.",
              "The cat is under the table.",
              "John and Mary are best friends.",
              "I have a book about animals.",
              "The sky is blue and full of clouds.",
              "He is watching a movie with his family.",
              "She bought a beautiful dress for the party.",
              "The boy is playing football in the park.",
              "My mother makes delicious pancakes on Sundays.",
              "We visited the zoo and saw many wild animals.",
              "The library is a quiet place to read and study.",
              "She is learning to ride a bicycle without help.",
              "A rainbow appears after the rain on sunny days.",
              "They went to the beach and collected seashells.",
              "We enjoy listening to music while doing homework.",
              "The train arrived late because of heavy snowfall.",
              "My grandmother tells wonderful stories every night.",
              "He practices the piano daily to improve his skills.",
              "The children are excited about their school picnic.",
              "In winter, people wear warm clothes to stay cozy.",
              "A farmer works hard to grow crops for everyone.",
              "She wrote a letter to her friend in another city.",
              "The teacher explained the lesson using simple examples.",
              "Social media has changed the way people communicate.",
              "Airplanes help people travel long distances quickly.",
              "The quick brown fox jumps over the lazy dog while the sun sets in the west.",
              "Mount Everest is the highest mountain in the world.",
              "Electric cars are becoming popular due to less pollution.",
              "Reading books improves knowledge and enhances vocabulary.",
              "Healthy eating and exercise are essential for a good life.",
              "Practice makes perfect, and effort leads to success.",
              "Technology has made our lives more comfortable and efficient.",
              "Scientists work tirelessly to discover new medicines and treatments.",
              "A positive attitude and determination help overcome challenges.",
              "The government is implementing policies to control air pollution.",
              "Human civilization has advanced significantly over the centuries.",
              "The universe is vast and full of mysteries yet to be explored.",
              "Climate change is a major concern requiring global cooperation.",
              "Quantum mechanics is a complex field of physics that explains atomic behavior.",
              "Artificial intelligence is revolutionizing industries and shaping the future.",
              "Philosophical debates often explore the meaning of existence and consciousness.",
              "Space is vast and full of unknown wonders waiting to be explored.",
              "The invention of the printing press revolutionized the way knowledge was shared.",
              "Studying different cultures helps us appreciate diversity and foster mutual understanding.",
              "Overcoming challenges requires resilience, determination, and a positive mindset.",
              "The Earth's ecosystem is delicate, and human activities can significantly impact biodiversity.",
              "Astronomers study celestial bodies to understand the origins and nature of the universe.",
              "Writing regularly enhances creativity, sharpens critical thinking, and improves communication skills.",
              "Medical advancements have drastically increased human life expectancy over the last century.",
              "Economic policies influence the financial stability of a nation and its citizens' quality of life.",
              "Renewable energy sources such as solar and wind power are crucial for sustainable development.",
              "Scientific discoveries often challenge traditional beliefs and lead to paradigm shifts in knowledge.",
              "Globalization has interconnected economies, making trade and cultural exchange more accessible than ever.",
              "Space exploration missions provide valuable insights into planetary formation and the potential for extraterrestrial life.",
              "Understanding human psychology helps in addressing mental health issues and improving emotional well-being.",
              "Artificial intelligence is transforming industries by automating tasks, analyzing data, and enhancing efficiency.",
              "Ethical dilemmas in technology arise when innovation surpasses the ability to regulate its implications.",
              "The development of language and communication has played a pivotal role in human evolution.",
              "Cognitive science explores how the human brain processes information, forms memories, and makes decisions.",
              "The rise of digital currencies like Bitcoin challenges traditional financial institutions and banking systems.",
              "Environmental conservation efforts are essential to protect endangered species and preserve natural habitats.",
              "Historical events shape the present world, influencing political structures and societal norms.",
              "Genetic engineering has the potential to eradicate hereditary diseases but also raises ethical concerns.",
              "The theory of relativity revolutionized physics by redefining our understanding of space and time.",
              "The impact of artificial intelligence on employment raises debates about automation and workforce adaptation.",
              "Political ideologies shape governments, influence policies, and determine international relations.",
              "The study of linguistics helps unravel the complexities of human language development and usage.",
              "The search for extraterrestrial intelligence involves scanning the universe for possible alien communication signals.",
              "Urbanization leads to economic growth but also presents challenges such as pollution and overcrowding.",
              "The principles of democracy emphasize freedom, equality, and the active participation of citizens.",
              "Cryptographic techniques secure digital transactions and protect sensitive information from cyber threats.",
              "Advancements in neuroscience help us understand brain disorders and develop innovative treatments.",
              "Philosophical discussions about consciousness question the nature of reality and human perception.",
              "Complex mathematical theories, such as chaos theory, have practical applications in various scientific fields.",
              "Sustainable agriculture practices aim to balance food production with environmental preservation.",
              "The impact of automation on job markets has sparked discussions about universal basic income.",
              "Dark matter and dark energy remain some of the greatest unsolved mysteries in modern astrophysics.",
              "The evolution of democracy has been influenced by historical revolutions and philosophical thought.",
              "Understanding quantum entanglement challenges classical notions of cause and effect in physics.",
              "Ethical concerns regarding genetic modification extend to bioengineering and designer babies.",
              "Advancements in biotechnology could lead to significant breakthroughs in personalized medicine.",
              "Economic globalization has created interdependent markets, leading to complex financial relationships.",
              "The effects of climate change on global ecosystems require urgent international cooperation.",
              "Philosophers have debated the nature of free will and determinism for centuries.",
              "Space colonization presents both opportunities for humanity and ethical dilemmas regarding planetary resources.",
              "Artificial neural networks mimic human cognition and drive innovations in deep learning.",
              "Multiverse theories challenge conventional understanding by suggesting infinite parallel realities.",
              "The philosophical implications of artificial intelligence raise questions about machine consciousness.",
              "The interplay between science and ethics determines the responsible development of emerging technologies.",
              "The limits of human knowledge continue to be tested by advances in theoretical physics.",
              "The future of civilization may depend on humanity’s ability to balance progress with sustainability.",
              "Philosophers have long debated whether morality is an inherent human trait or a social construct shaped by cultural norms.",
              "The advancement of artificial intelligence raises ethical concerns regarding data privacy, algorithmic bias, and the potential displacement of human labor.",
              "The concept of time dilation, as predicted by Einstein’s theory of relativity, suggests that time passes differently depending on the strength of gravitational fields and the speed of an observer.",
              "As the global population continues to grow, urban planning and infrastructure development must prioritize sustainability to prevent environmental degradation and resource depletion.",
              "The psychological phenomenon known as cognitive dissonance explains how individuals experience mental discomfort when holding conflicting beliefs or engaging in behaviors that contradict their values.",
              "The study of epigenetics has revealed that environmental factors can influence gene expression, potentially affecting an individual’s health and traits without altering their DNA sequence.",
              "The emergence of decentralized finance (DeFi) platforms challenges traditional banking systems by offering peer-to-peer financial services without intermediaries.",
              "Neurological research on the brain’s plasticity demonstrates how learning new skills and forming habits can physically reshape neural pathways over time.",
              "The philosophical school of existentialism explores themes of free will, personal responsibility, and the search for meaning in an indifferent universe.",
              "The rise of cyber warfare has introduced new challenges in national security, as governments must now defend against digital threats alongside traditional military conflicts.",
              "The paradox of hedonism suggests that the direct pursuit of pleasure often leads to dissatisfaction, whereas engaging in meaningful activities results in deeper fulfillment.",
              "Recent advancements in quantum computing have the potential to revolutionize encryption, drug discovery, and problem-solving capabilities far beyond classical computing methods.",
              "The Fermi Paradox questions why, despite the vast number of potentially habitable planets, humanity has yet to discover definitive evidence of extraterrestrial life.",
              "The intersection of biotechnology and artificial intelligence has opened new possibilities in personalized medicine, enabling tailored treatments based on genetic profiles.",
              "The principles of game theory have been applied in economics, politics, and artificial intelligence to analyze strategic decision-making among competing individuals or entities.",
              "The rapid proliferation of misinformation on social media has necessitated the development of advanced fact-checking mechanisms and digital literacy education.",
              "Philosophical discussions on the nature of consciousness continue to challenge our understanding of self-awareness, artificial intelligence, and the mind-body problem.",
              "The ethics of space exploration involve considerations about planetary protection, resource exploitation, and the potential consequences of humanity expanding beyond Earth.",
              "The butterfly effect, a concept in chaos theory, describes how small initial changes in a complex system can lead to significant and unpredictable outcomes over time.",
              "As virtual and augmented reality technologies advance, they pose profound implications for education, entertainment, and human interaction in digital spaces.",
              "The debate over universal basic income has gained traction as automation threatens to replace a significant portion of traditional jobs in various industries.",
              "The role of dark energy in the expansion of the universe remains one of the greatest mysteries in cosmology, with scientists theorizing its potential impact on the fate of the cosmos.",
              "As climate change accelerates, nations must collaborate to develop policies that balance economic growth with environmental sustainability and long-term ecological stability.",
              "The advent of gene-editing technologies such as CRISPR has sparked ethical debates regarding human genetic modification, designer babies, and the potential unintended consequences of altering DNA.",
              "The study of artificial general intelligence (AGI) explores the possibility of creating machines capable of independent reasoning, adaptability, and problem-solving across diverse domains.",
              "The Kardashev Scale categorizes civilizations based on their energy consumption and technological advancement, from planetary-scale societies to potential galaxy-spanning supercivilizations.",
              "The philosophical implications of simulation theory suggest that reality itself could be a construct, raising existential questions about perception, free will, and the nature of consciousness.",
              "The phenomenon of quantum entanglement defies classical physics by allowing two particles to remain interconnected regardless of distance, challenging traditional notions of locality and causality.",
              "The ethical considerations of autonomous weapons systems raise concerns about accountability, decision-making in warfare, and the potential risks of removing human oversight from lethal force applications.",
              "Advances in nanotechnology have the potential to revolutionize medicine, material science, and energy production by manipulating matter at the atomic and molecular scale.",
              "Interstellar travel remains a formidable challenge due to the vast distances between stars, requiring breakthroughs in propulsion technology, space habitats, and life support systems.",
              "The philosophical concept of determinism argues that all events, including human actions, are predetermined by prior causes, challenging the notion of free will and personal agency.",
              "The development of brain-computer interfaces could enable direct communication between human minds and machines, revolutionizing fields such as healthcare, accessibility, and artificial intelligence.",
              "The discovery of exoplanets in the habitable zone of distant star systems has fueled speculation about the potential for life beyond Earth and the conditions necessary for biological evolution.",
              "The future of robotics is increasingly intertwined with ethical concerns about human-like machines, emotional intelligence in AI, and the potential societal impact of humanoid automation.",
              "The dual nature of light as both a particle and a wave, described by quantum mechanics, has profound implications for our understanding of physics and the fundamental nature of reality.",
              "The concept of singularity in artificial intelligence suggests a point where AI surpasses human intelligence, leading to unpredictable advancements and potential existential risks.",
              "The study of bioinformatics combines biology, data science, and machine learning to analyze complex genetic information, contributing to advancements in personalized medicine and disease research.",
              "The ethical debate over digital surveillance balances national security concerns with the fundamental right to privacy in an era of mass data collection and artificial intelligence monitoring.",
              "The development of interplanetary colonization requires addressing challenges such as radiation exposure, sustainable resource management, and the psychological effects of long-term space travel.",
              "The rapid advancement of brain mapping technologies has allowed neuroscientists to explore the intricate connections between cognition, emotions, and neurological disorders.",
              "The concept of emergence in complex systems describes how simple interactions between individual components can lead to unexpected and sophisticated patterns of organization and behavior.",
              "The role of quantum computing in cryptography has raised concerns about the future security of encrypted communications, necessitating the development of quantum-resistant algorithms.",
              "The psychological phenomenon of the observer effect suggests that the act of observation itself can influence the outcome of an experiment, particularly in the realm of quantum mechanics.",
              "The paradox of thrift in economics illustrates how individual saving behaviors, while beneficial on a personal level, can lead to reduced aggregate demand and slow economic growth.",
              "The potential for artificial superintelligence to reshape human civilization raises existential questions about control, ethics, and the alignment of machine intelligence with human values.",
              "The complexity of protein folding and its impact on biological functions remains one of the most intricate challenges in molecular biology and medical research.",
              "The philosophical implications of time travel, as proposed by various theoretical physics models, challenge our understanding of causality, paradoxes, and the very fabric of time itself.",
            ],
          },
        ],
        "hindi-inscript": [
          {
            level: 1,
            texts: [
              "मैं एक छात्र हूँ।",
              "सूरज चमक रहा है।",
              "बिल्ली दूध पी रही है।",
              "बच्चे पार्क में खेल रहे हैं।",
              "पंछी आसमान में उड़ते हैं।",
              "यह एक सुंदर फूल है।",
              "मुझे आम खाना पसंद है।",
              "वह एक किताब पढ़ रही है।",
              "नदी का पानी ठंडा होता है।",
              "हम हर दिन स्कूल जाते हैं।",
              "बारिश के बाद इंद्रधनुष दिखता है।",
              "शेर जंगल का राजा होता है।",
              "रात को आकाश में तारे चमकते हैं।",
              "मेरे पिताजी सुबह जल्दी उठते हैं।",
              "गर्मियों में लोग आम और तरबूज खाते हैं।",
              "हम रविवार को अपने दादा-दादी से मिलने गए।",
              "सर्दियों में लोग गर्म कपड़े पहनते हैं।",
              "पेड़ हमें ऑक्सीजन देते हैं और छाया भी प्रदान करते हैं।",
              "मैंने अपने दोस्त को जन्मदिन की शुभकामनाएँ दीं।",
              "हमने स्कूल की वार्षिक प्रतियोगिता में भाग लिया।",
              "अखबार पढ़ने से हमें दुनिया की खबरें मिलती हैं।",
              "कड़ी मेहनत करने से सफलता जरूर मिलती है।",
              "बिजली के बिना आजकल जीवन कठिन हो सकता है।",
              "स्वस्थ जीवन के लिए संतुलित आहार और व्यायाम जरूरी है।",
              "मेरा सपना एक अच्छा डॉक्टर बनना है।",
              "ज्ञान प्राप्त करने के लिए हमें हमेशा पढ़ाई करनी चाहिए।",
              "तकनीक ने हमारे जीवन को बहुत आसान बना दिया है।",
              "एकता में शक्ति होती है और मिलकर काम करने से सफलता मिलती है।",
              "बचपन की यादें हमेशा हमारे दिल के करीब रहती हैं।",
              "समय सबसे मूल्यवान चीज़ है, इसे व्यर्थ नहीं गँवाना चाहिए।",
              "शिक्षा हमारे जीवन का एक महत्वपूर्ण हिस्सा है।",
              "संगीत हमारी आत्मा को शांति और आनंद देता है।",
              "पर्यावरण की रक्षा करना हमारा कर्तव्य है।",
              "समाज में अच्छे संस्कार और नैतिकता बहुत आवश्यक हैं।",
              "ईमानदारी सबसे अच्छी नीति मानी जाती है।",
              "समुद्र बहुत विशाल और रहस्यमय होता है।",
              "नदियाँ जीवनदायिनी होती हैं और हमें जल उपलब्ध कराती हैं।",
              "हमारी संस्कृति हमें प्रेम, सहिष्णुता और सद्भाव सिखाती है।",
              "भारतीय त्योहार रंग, उत्साह और परंपराओं से भरे होते हैं।",
              "सच्ची दोस्ती हमेशा मुश्किल समय में साथ देती है।",
              "अंतरिक्ष अनगिनत रहस्यों से भरा हुआ है।",
              "परिश्रम और धैर्य सफलता की कुंजी हैं।",
              "बचपन की कहानियाँ हमें नैतिक शिक्षा प्रदान करती हैं।",
              "पृथ्वी को प्रदूषण से बचाने के लिए हमें प्रयास करने चाहिए।",
              "भारतीय स्वतंत्रता संग्राम कई वीरों के बलिदान से भरा था।",
              "जीवन में उतार-चढ़ाव आते रहते हैं, पर हमें धैर्य रखना चाहिए।",
              "समय का सही उपयोग करने वाला व्यक्ति जीवन में सफल होता है।",
              "हमें अपने माता-पिता और बड़ों का सम्मान करना चाहिए।",
              "संस्कार और मूल्यों की शिक्षा बचपन से ही दी जानी चाहिए।",
              "जल ही जीवन है, हमें इसे व्यर्थ नहीं करना चाहिए।",
              "हर व्यक्ति को अपने स्वास्थ्य का ध्यान रखना चाहिए।",
              "भारत विविधताओं से भरा एक महान देश है।",
              "हमारे जीवन में शिक्षा का महत्व बहुत अधिक है।",
              "प्राचीन भारतीय ग्रंथों में गहन ज्ञान छुपा हुआ है।",
              "विज्ञान और तकनीक ने दुनिया को बहुत बदल दिया है।",
              "हमारी संस्कृति हमें पर्यावरण की रक्षा करना सिखाती है।",
              "जलवायु परिवर्तन एक गंभीर वैश्विक समस्या बन चुकी है।",
              "सही दिशा में किया गया प्रयास हमेशा फल देता है।",
              "महान वैज्ञानिकों के आविष्कारों ने दुनिया को बदल दिया।",
              "भारतीय संविधान हमें अधिकार और कर्तव्य दोनों सिखाता है।",
              "हमारा इतिहास हमें अपनी जड़ों को जानने में मदद करता है।",
              "चंद्रयान और मंगलयान भारतीय अंतरिक्ष कार्यक्रम की बड़ी उपलब्धियाँ हैं।",
              "आज का युग डिजिटल युग बन चुका है, जहाँ सबकुछ ऑनलाइन हो रहा है।",
              "योग और ध्यान मानसिक और शारीरिक स्वास्थ्य के लिए बहुत फायदेमंद हैं।",
              "प्राकृतिक संसाधनों का संरक्षण करना हमारी प्राथमिकता होनी चाहिए।",
              "सच्चा प्रेम निःस्वार्थ होता है और व्यक्ति के जीवन को सुंदर बनाता है।",
              "सपनों को पूरा करने के लिए मेहनत और संघर्ष जरूरी होता है।",
              "प्रेरणादायक व्यक्तित्व हमें आगे बढ़ने की शक्ति प्रदान करते हैं।",
              "पढ़ाई का असली उद्देश्य केवल नौकरी पाना नहीं, बल्कि ज्ञान अर्जित करना है।",
              "विज्ञान और आध्यात्मिकता को एक साथ लेकर चलना चाहिए।",
              "हमारे कार्य ही हमारी पहचान बनाते हैं, न कि हमारी बातें।",
              "नैतिकता और ईमानदारी एक अच्छे समाज की नींव होती है।",
              "भारत एक लोकतांत्रिक देश है, जहाँ सभी को समान अधिकार प्राप्त हैं।",
              "सहनशीलता और करुणा मानवता के सर्वोत्तम गुण हैं।",
              "साहित्य और कला समाज को एक नई दिशा देते हैं।",
              "एक अच्छा नेता वही होता है जो अपने लोगों के कल्याण के लिए कार्य करे।",
              "खेल न केवल शारीरिक स्वास्थ्य के लिए बल्कि मानसिक विकास के लिए भी आवश्यक हैं।",
              "आधुनिक तकनीक के साथ-साथ हमें अपनी परंपराओं को भी संजोकर रखना चाहिए।",
              "सफलता केवल भाग्य से नहीं, बल्कि निरंतर प्रयास से मिलती है।",
              "विश्वास, मेहनत और धैर्य से हर असंभव कार्य संभव हो सकता है।",
              "बुद्धिमानी केवल किताबों में नहीं, बल्कि अनुभवों में भी होती है।",
              "सत्य और अहिंसा के सिद्धांतों ने भारतीय स्वतंत्रता संग्राम को मजबूत किया।",
              "गांधीजी का जीवन हमें सादगी, सच्चाई और कर्तव्यनिष्ठा सिखाता है।",
              "शिक्षा केवल डिग्री पाने के लिए नहीं, बल्कि सही सोच विकसित करने के लिए होनी चाहिए।",
              "सच्चा ज्ञान वही होता है जो व्यक्ति को समाज और मानवता की सेवा करने के लिए प्रेरित करे।",
              "नए विचार और नवाचार समाज की प्रगति में महत्वपूर्ण भूमिका निभाते हैं।",
              "जीवन में सफलता का असली अर्थ केवल पैसा कमाना नहीं, बल्कि संतुष्टि और खुशी पाना है।",
              "भविष्य उन्हीं का होता है जो अपने वर्तमान को मेहनत और समर्पण से संवारते हैं।",
              "समाज में बदलाव लाने के लिए हमें खुद को पहले बदलना होगा।",
              "मनुष्य की सच्ची पहचान उसके विचारों और कर्मों से होती है।",
              "समय के साथ चलना आवश्यक है, परंतु अपनी जड़ों को भूलना नहीं चाहिए।",
            ],
          },
        ],
      };
  
      this.currentLevel = 1;
      this.bindEvents();
      this.initializeLesson();
    }
  
    bindEvents() {
      this.typingInput.addEventListener("input", () => this.checkInput());
      this.languageSelect.addEventListener("change", () =>
        this.initializeLesson()
      );
    }
  
    initializeLesson() {
      this.currentIndex = 0;
      this.errors = 0;
      this.keystrokes = 0;
      this.correctChars = 0;
      this.incorrectChars = 0;
      this.startTime = null;
  
      const layout = this.languageSelect.value;
      const lessonSet = this.lessons[layout] || this.lessons.english;
      const currentLessonSet =
        lessonSet.find((l) => l.level === this.currentLevel) || lessonSet[0];
      this.currentText =
        currentLessonSet.texts[
          Math.floor(Math.random() * currentLessonSet.texts.length)
        ];
  
      this.displayText();
      this.typingInput.value = "";
      this.typingInput.focus();
      this.updateStats();
  
      this.textDisplay.className = layout.startsWith("hindi")
        ? "text-display hindi-text"
        : "text-display";
    }
  
    displayText() {
      this.textDisplay.innerHTML = this.currentText
        .split("")
        .map((char, index) => {
          let className = "";
          if (index < this.currentIndex) {
            className =
              this.currentText[index] === char ? "correct" : "incorrect";
          } else if (index === this.currentIndex) {
            className = "current";
          }
          return `<span class="${className}">${char}</span>`;
        })
        .join("");
    }
  
    checkInput() {
      if (!this.startTime) {
        this.startTime = new Date();
      }
  
      const currentChar = this.currentText[this.currentIndex];
      const typedChar = this.typingInput.value;
  
      if (typedChar === currentChar) {
        this.keyboard.highlightKey(typedChar);
        this.currentIndex++;
        this.correctChars++;
        this.keystrokes++;
        this.typingInput.value = "";
        this.displayText();
        this.updateStats();
  
        if (this.currentIndex === this.currentText.length) {
          this.completeLesson();
        }
      } else if (typedChar) {
        this.errors++;
        this.incorrectChars++;
        this.keystrokes++;
        this.keyboard.showError(typedChar);
        this.updateStats();
        this.typingInput.value = "";
      }
    }
  
    updateStats() {
      const timeElapsed = this.startTime
        ? (new Date() - this.startTime) / 1000 / 60
        : 0;
      const wordsTyped = this.currentIndex / 5;
      const wpm = Math.round(wordsTyped / (timeElapsed || 1));
  
      const accuracy = Math.round(
        (this.correctChars / (this.keystrokes || 1)) * 100
      );
  
      this.wpmDisplay.textContent = wpm;
      this.accuracyDisplay.textContent = `${accuracy}%`;
      this.keystrokesDisplay.textContent = this.keystrokes;
      this.correctDisplay.textContent = this.correctChars;
      this.incorrectDisplay.textContent = this.incorrectChars;
    }
  
    async completeLesson() {
      const wpm = parseInt(this.wpmDisplay.textContent);
      const accuracy = parseInt(this.accuracyDisplay.textContent);
  
      try {
        const response = await fetch("/submit_score", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            wpm,
            accuracy,
            language: this.languageSelect.value,
          }),
        });
  
        if (response.ok) {
          if (
            accuracy >= 90 &&
            this.currentLevel <
              Object.keys(this.lessons[this.languageSelect.value]).length
          ) {
            this.currentLevel++;
          }
          alert(
            `Test completed!\nSpeed: ${wpm} WPM\nAccuracy: ${accuracy}%\nKeystrokes: ${this.keystrokes}\nCorrect: ${this.correctChars}\nIncorrect: ${this.incorrectChars}`
          );
          this.initializeLesson();
        }
      } catch (error) {
        console.error("Error saving score:", error);
      }
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    new TypingTutor();
  });
  